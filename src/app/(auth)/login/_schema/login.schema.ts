import { z } from "zod";

export const phoneSchema = z.object({
  phone: z.string().regex(/^(09\d{9}|\+989\d{9}|00989\d{9})$/, {
    message: "Invalid Iranian mobile number format",
  }),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;
