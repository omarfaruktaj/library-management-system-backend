import validateRequest from "@/middlewares/validate-request";
import { Router } from "express";
import {
	createMember,
	getMembers,
	getSingleMember,
	updateMember,
} from "./controllers";
import { createMemberSchema, updateMemberSchema } from "./schemas";

const router = Router();

router
	.route("/:memberId")
	.get(getSingleMember)
	.put(validateRequest(updateMemberSchema), updateMember);

router
	.route("/")
	.post(validateRequest(createMemberSchema), createMember)
	.get(getMembers);

export default router;
