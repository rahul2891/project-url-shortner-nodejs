import { z } from 'zod';

export const signupPostRequestBodySchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(55, 'First name must be at most 55 characters'),
    lastName: z.string().max(55, 'Last name must be at most 55 characters').optional(),
    email: z.string().email('Invalid email address').max(255, 'Email must be at most 255 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
