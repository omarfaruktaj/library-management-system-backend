import validateRequest from "@/middlewares/validate-request";
import { Router } from "express";
import { createBook, getBooks } from "./controllers";
import { createBookSchema } from "./schemas";

const router = Router();

router.post("/", validateRequest(createBookSchema), createBook);
router.get("/", getBooks);

export default router;
