import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { Request, Response } from "express";

const updateMember = async (req: Request, res: Response) => {
	const memberId = req.params.memberId;
	const data = req.body;

	await db.member.findUniqueOrThrow({
		where: {
			memberId,
		},
	});

	const updatedMember = await db.member.update({
		where: {
			memberId,
		},
		data,
	});

	res
		.status(200)
		.json(
			new APIResponse(true, 200, "Member updated successfully", updatedMember),
		);
};

export default updateMember;
