import { z } from 'zod';

export const questionSchema = z.object({
    id: z.number(),
    question: z.string(),
    answers: z.object({
        yes: z.number().array(),
        no: z.number().array(),
        depends: z.number().array(),
    }),
});

export type Question = z.infer<typeof questionSchema>;
