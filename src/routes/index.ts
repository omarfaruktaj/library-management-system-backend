import { type Request, type Response, Router } from "express";

const router = Router();
router.get("/test", (_req: Request, res: Response) => {
	res.status(200).json({ message: "success" });
});

export default router;
