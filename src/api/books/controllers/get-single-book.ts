import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { Request, Response } from "express";

const getSingleBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;

	const book = await db.book.findUniqueOrThrow({
		where: {
			bookId,
		},
	});

	res
		.status(201)
		.json(new APIResponse(true, 200, "Book retrieved successfully", book));
};

export default getSingleBook;
