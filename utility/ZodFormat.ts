import { z } from "zod";
export const emailSchema = z.string().email({ message: "Invalid Email address" });
export const passwordSchema = z.string().min(6);