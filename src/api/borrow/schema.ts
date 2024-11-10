import { z } from "zod";

export const createBorrowRecordSchema = z.object({
	bookId: z.string().uuid(),
	memberId: z.string().uuid(),
});
export const returnSchema = z.object({
	borrowId: z.string().uuid(),
});
