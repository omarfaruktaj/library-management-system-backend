import { db } from "@/config";
import APIResponse from "@/utils/api-response";
import type { Request, Response } from "express";

const getOverdueBorrows = async (_req: Request, res: Response) => {
	const currentDate = new Date();

	const overdueBooks = await db.borrowRecord.findMany({
		where: {
			returnDate: null,
			borrowDate: {
				lt: new Date(currentDate.setDate(currentDate.getDate() - 14)),
			},
		},
		include: {
			book: true,
			member: true,
		},
	});

	if (overdueBooks.length > 0) {
		const overDueBookList = overdueBooks.map((borrow) => ({
			borrowId: borrow.borrowId,
			bookTitle: borrow.book.title,
			borrowerName: borrow.member.name,
			overdueDays: Math.floor(
				(currentDate.getTime() - new Date(borrow.borrowDate).getTime()) /
					(1000 * 60 * 60 * 24),
			),
		}));
		res
			.status(200)
			.json(
				new APIResponse(
					true,
					200,
					"Overdue borrow list fetched",
					overDueBookList,
				),
			);
		return;
	}

	res.status(200).json({
		success: true,
		status: 200,
		message: "No overdue books",
		data: [],
	});
};

export default getOverdueBorrows;
