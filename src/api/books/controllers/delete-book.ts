import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { Request, Response } from "express";

const deleteBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;

	await db.book.delete({
		where: {
			bookId,
		},
	});

	res.status(200).json(new APIResponse(true, 200, "Book successfully deleted"));
};

export default deleteBook;
