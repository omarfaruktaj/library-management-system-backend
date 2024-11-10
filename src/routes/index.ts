import { bookRoues } from "@/api/books";
import { Router } from "express";

const router = Router();

router.use("/books", bookRoues);

export default router;
