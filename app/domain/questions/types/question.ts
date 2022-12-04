import { z } from 'zod';

export const questionSchema = z.object({
    id: z.number(),
    question: z.string(),
    answers: z.object({
        yes: z.number().array(),
    }),
    excludes: z.number().array().optional(),
});

export type Question = z.infer<typeof questionSchema>;
