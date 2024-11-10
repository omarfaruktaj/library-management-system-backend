import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { Request, Response } from "express";

const getSingleMember = async (req: Request, res: Response) => {
	const memberId = req.params.memberId;

	const member = await db.member.findUniqueOrThrow({
		where: {
			memberId,
		},
	});

	res
		.status(201)
		.json(new APIResponse(true, 200, "Member retrieved successfully", member));
};

export default getSingleMember;
