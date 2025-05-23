import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(`Invalid email entered.`),
  password: z.string({ message: `Please enter a valid password.` }).min(1, `Please enter a valid password.`)
});