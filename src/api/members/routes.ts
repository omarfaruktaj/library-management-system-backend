import validateRequest from "@/middlewares/validate-request";
import { Router } from "express";
import { createMember } from "./controllers";
import { createMemberSchema } from "./schemas";

const router = Router();

router.route("/").post(validateRequest(createMemberSchema), createMember);

export default router;
