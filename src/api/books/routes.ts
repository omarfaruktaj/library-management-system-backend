import validateRequest from "@/middlewares/validate-request";
import { Router } from "express";
import {
	createBook,
	deleteBook,
	getBooks,
	getSingleBook,
	updateBook,
} from "./controllers";
import { createBookSchema, updateBookSchema } from "./schemas";

const router = Router();

router
	.route("/:bookId")
	.get(getSingleBook)
	.put(validateRequest(updateBookSchema), updateBook)
	.delete(deleteBook);

router
	.route("/")
	.post(validateRequest(createBookSchema), createBook)
	.get(getBooks);

export default router;
