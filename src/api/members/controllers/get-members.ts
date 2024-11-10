import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { Request, Response } from "express";

const getMembers = async (_req: Request, res: Response) => {
	const members = await db.member.findMany();

	res
		.status(201)
		.json(
			new APIResponse(true, 200, "Members retrieved successfully", members),
		);
};

export default getMembers;
