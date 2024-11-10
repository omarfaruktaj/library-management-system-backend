import validateRequest from "@/middlewares/validate-request";
import { Router } from "express";
import { createMember, getMembers, getSingleMember } from "./controllers";
import { createMemberSchema } from "./schemas";

const router = Router();

router.route("/:memberId").get(getSingleMember);

router
	.route("/")
	.post(validateRequest(createMemberSchema), createMember)
	.get(getMembers);

export default router;
