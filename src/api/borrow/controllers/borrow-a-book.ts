import { db } from "@/config";
import { AppError } from "@/utils";
import APIResponse from "@/utils/api-response";
import type { NextFunction, Request, Response } from "express";

const borrowABook = async (req: Request, res: Response, next: NextFunction) => {
	const data = req.body;

	const book = await db.book.findUnique({
		where: {
			bookId: data.bookId,
		},
	});

	if (!book) {
		return next(new AppError("No book found", 404));
	}

	if (book.availableCopies === 0) {
		return next(new AppError("No copies available to borrow", 401));
	}

	const member = await db.member.findUnique({
		where: {
			memberId: data.memberId,
		},
	});

	if (!member) {
		return next(new AppError("No member found", 404));
	}

	const borrowRecord = await db.$transaction(async (prisma) => {
		const borrowRecord = await prisma.borrowRecord.create({
			data,
			select: {
				borrowId: true,
				bookId: true,
				memberId: true,
				borrowDate: true,
			},
		});

		await prisma.book.update({
			where: {
				bookId: data.bookId,
			},
			data: {
				availableCopies: book.availableCopies - 1,
			},
		});

		return borrowRecord;
	});

	res
		.status(201)
		.json(
			new APIResponse(true, 201, "Book borrowed successfully", borrowRecord),
		);
};

export default borrowABook;
