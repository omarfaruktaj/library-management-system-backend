import { db } from "@/config";
import { AppError } from "@/utils";
import APIResponse from "@/utils/api-response";
import type { NextFunction, Request, Response } from "express";

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
	const bookId = req.params.bookId;
	const data = req.body;

	const book = await db.book.findUniqueOrThrow({
		where: {
			bookId,
		},
	});

	if (data.availableCopies !== undefined && !data.totalCopies) {
		if (data.availableCopies > book.totalCopies) {
			return next(
				new AppError("Available copies cannot be more than total copies", 400),
			);
		}
	}

	const updatedBook = await db.book.update({
		where: {
			bookId,
		},
		data,
	});

	res
		.status(200)
		.json(new APIResponse(true, 200, "Book updated successfully", updatedBook));
};

export default updateBook;
