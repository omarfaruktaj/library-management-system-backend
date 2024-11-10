import { z } from "zod";

export const createBookSchema = z
	.object({
		title: z.string().min(1),
		genre: z.string().min(1),
		publishedYear: z.number().int(),
		totalCopies: z.number().int().min(1),
		availableCopies: z.number().int().min(0),
	})
	.refine((data) => data.availableCopies <= data.totalCopies, {
		message: "Available copies cannot exceed total copies",
		path: ["availableCopies"],
	});

export type TCreateBookSchema = z.infer<typeof createBookSchema>;
