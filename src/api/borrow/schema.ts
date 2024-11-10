import { z } from "zod";

export const createBorrowRecordSchema = z.object({
	bookId: z.string().uuid(),
	memberId: z.string().uuid(),
});
