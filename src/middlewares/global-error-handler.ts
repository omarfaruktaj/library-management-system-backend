import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { ErrorRequestHandler, Request, Response } from "express";
import { ZodError, type ZodIssue } from "zod";
import { envConfig } from "../config/env";
import { AppError } from "../utils";

//* handle zod errors
const handleZodError = (err: ZodError) => {
	const errorMessages = err.issues.map((issue: ZodIssue) => {
		return {
			path: String(issue?.path[issue.path.length - 1]),
			message: issue.message,
		};
	});
	const message = errorMessages
		.map((msg) => `${msg.path}: ${msg.message}`)
		.join(", ");

	return new AppError(message || "Validation Error", 400, errorMessages);
};

//* handle prisma error
const handlePrismaError = (err: PrismaClientKnownRequestError) => {
	let message = "Database Error";
	let code = 500;

	if (err.code === "P2002") {
		const target = err.meta?.target;
		if (Array.isArray(target)) {
			message = `Duplicate entry for ${target.join(", ")}`;
		} else {
			message = "Duplicate entry for a field.";
		}
		code = 409;
	} else if (err.code === "P2025") {
		message = "Record not found.";
		code = 404;
	}

	return new AppError(message, code);
};

const handleDevelopmentError = (
	err: AppError,
	_req: Request,
	res: Response,
) => {
	const statusCode =
		err.code && !Number.isNaN(Number(err.code)) ? Number(err.code) : 500;
	return res.status(statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
	});
};

const handleProductionError = (err: AppError, _req: Request, res: Response) => {
	//* Trusted Error send message
	if (err.isOperational) {
		return res.status(err.code).json({
			success: false,
			status: err.code,
			message: err.message,
		});
	}
	//! Untrusted error! Don't leap information

	return res.status(500).json({
		success: false,
		status: 500,
		message: err.message,
	});
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
	if (envConfig.NODE_ENV === "development") {
		handleDevelopmentError(error, req, res);
	} else if (envConfig.NODE_ENV === "production") {
		let err = { ...error };

		err.message = error.message;
		err.status = error.status || "error";
		err.statusCode = error.code || 500;

		if (error instanceof ZodError) {
			err = handleZodError(error);
		}

		if (error instanceof PrismaClientKnownRequestError) {
			err = handlePrismaError(error);
		}

		handleProductionError(err, req, res);
	}
};

export default globalErrorHandler;
