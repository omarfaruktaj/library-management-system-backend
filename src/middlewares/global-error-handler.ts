import type { ErrorRequestHandler, Request, Response } from "express";
import { envConfig } from "../config/env";
import type { AppError } from "../utils";

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
		const err = { ...error };
		err.status = error.status || "error";
		err.statusCode = error.code || 500;

		handleProductionError(err, req, res);
	}
};

export default globalErrorHandler;
