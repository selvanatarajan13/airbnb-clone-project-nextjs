import { z } from 'zod';

const StudentRegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Minimum age is 18'),
});