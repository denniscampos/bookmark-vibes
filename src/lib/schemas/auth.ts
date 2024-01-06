import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Invalid Email',
    })
    .email({ message: 'Invalid Email' }),
  password: z
    .string({
      invalid_type_error: 'Invalid Password',
    })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type LoginType = z.infer<typeof loginSchema>;
