import { bookRoues } from "@/api/books";
import { memberRoutes } from "@/api/members";
import { Router } from "express";

const router = Router();

router.use("/books", bookRoues);
router.use("/members", memberRoutes);

export default router;
