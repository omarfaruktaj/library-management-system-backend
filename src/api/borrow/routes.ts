import validateRequest from "@/middlewares/validate-request";
import { Router } from "express";
import { borrowABook } from "./controllers";
import { createBorrowRecordSchema } from "./schema";

const router = Router();

router.route("/").post(validateRequest(createBorrowRecordSchema), borrowABook);

export default router;
