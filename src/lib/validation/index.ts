import { z } from "zod";

export const SignupValidation = z.object({
    name : z.string().min(2,{message: "Name must be at least 2 characters long."}),
    username: z.string().min(2,{message: "Username must be at least 2 characters long."}),
    email: z.string().email({message: "Please provide a valid email address."}),
    password: z.string().min(8,{message: "Password must be at least 8 characters long."}),
});