import validateRequest from "@/middlewares/validate-request";
import { Router } from "express";
import { borrowABook, getOverdueBorrows, returnABook } from "./controllers";
import { createBorrowRecordSchema, returnSchema } from "./schema";

const router = Router();

router.get("/borrow/overdue", getOverdueBorrows);

router
	.route("/borrow")
	.post(validateRequest(createBorrowRecordSchema), borrowABook);

router.post("/return", validateRequest(returnSchema), returnABook);

export default router;
