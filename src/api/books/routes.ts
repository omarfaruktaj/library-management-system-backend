import validateRequest from "@/middlewares/validate-request";
import { Router } from "express";
import { createBook } from "./controllers";
import { createBookSchema } from "./schemas";

const router = Router();

router.post("/", validateRequest(createBookSchema), createBook);

export default router;
