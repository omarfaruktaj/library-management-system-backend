import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { Request, Response } from "express";

const getBooks = async (_req: Request, res: Response) => {
	const books = await db.book.findMany();

	res
		.status(201)
		.json(new APIResponse(true, 200, "Books retrieved successfully", books));
};

export default getBooks;
