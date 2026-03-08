import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject required"),
  description: z.string().min(10, "Description too short")
});