import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { NextFunction, Request, Response } from "express";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
	const data = req.body;

	const book = await db.book.create({
		data,
	});

	console.log(data);

	res
		.status(201)
		.json(new APIResponse(true, 201, "Book created successfully", book));
};

export default createBook;
