import { db } from "@/config";
import { AppError } from "@/utils";
import APIResponse from "@/utils/api-response";
import type { NextFunction, Request, Response } from "express";

const createMember = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const data = req.body;

	const existedMember = await db.member.findUnique({
		where: {
			email: data.email,
		},
	});

	if (existedMember) {
		return next(new AppError("Member already exist", 400));
	}

	const newMember = await db.member.create({
		data,
	});

	res
		.status(201)
		.json(new APIResponse(true, 201, "Member created successfully", newMember));
};

export default createMember;
