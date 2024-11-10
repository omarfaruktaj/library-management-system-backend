import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { Request, Response } from "express";

const deleteMember = async (req: Request, res: Response) => {
	const memberId = req.params.memberId;

	await db.member.delete({
		where: {
			memberId,
		},
	});

	res
		.status(200)
		.json(new APIResponse(true, 200, "Member successfully deleted"));
};

export default deleteMember;
