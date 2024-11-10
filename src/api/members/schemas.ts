import { z } from "zod";

export const createMemberSchema = z.object({
	name: z.string().min(1, "Name cannot be empty"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone number cannot be empty"),
	membershipDate: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
});
