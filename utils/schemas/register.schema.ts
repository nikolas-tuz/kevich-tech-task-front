import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(`Invalid email entered.`),
  password: z.string({ message: `Please enter a valid password.` }).min(1, `Please enter a valid password.`),
  confirmPassword: z.string({ message: `Please enter a valid password.` }).min(1, `Please enter a valid password.`)
}).refine(({ password, confirmPassword }) => {
  return password === confirmPassword;
}, { message: `Passwords do not match.` });