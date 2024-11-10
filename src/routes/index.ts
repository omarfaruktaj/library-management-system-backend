import { bookRoues } from "@/api/books";
import { borrowRoutes } from "@/api/borrow";
import { memberRoutes } from "@/api/members";
import { Router } from "express";

const router = Router();

router.use("/books", bookRoues);
router.use("/members", memberRoutes);
router.use("/", borrowRoutes);

export default router;
