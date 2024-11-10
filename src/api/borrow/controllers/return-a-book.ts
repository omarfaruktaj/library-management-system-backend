import { db } from "@/config";
import { AppError } from "@/utils";
import APIResponse from "@/utils/api-response";
import type { NextFunction, Request, Response } from "express";

const returnABook = async (req: Request, res: Response, next: NextFunction) => {
	const data = req.body;
	const borrowRecord = await db.borrowRecord.findUnique({
		where: {
			borrowId: data.borrowId,
		},
	});

	if (!borrowRecord) {
		return next(new AppError("No borrowRecord found", 404));
	}

	if (!borrowRecord.returnDate !== null) {
		return next(new AppError("You already returned the book", 401));
	}

	const book = await db.book.findUnique({
		where: {
			bookId: borrowRecord.bookId,
		},
	});

	if (!book) {
		return next(new AppError("No book found", 404));
	}

	await db.$transaction(async (prisma) => {
		await prisma.borrowRecord.update({
			where: {
				borrowId: data.borrowId,
			},
			data: {
				returnDate: new Date(),
			},
		});

		await prisma.book.update({
			where: {
				bookId: book.bookId,
			},
			data: {
				availableCopies: book.availableCopies + 1,
			},
		});
	});

	res
		.status(201)
		.json(new APIResponse(true, 200, "Book returned successfully"));
};

export default returnABook;
