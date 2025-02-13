import { z } from "zod";

export const createUsers = z.object({
    user_name: z.string(),
    user_email_id: z.string().optional(),
    managers_id: z.string().optional(),
    user_type: z.string(),
});

export type createUsersRequestType = z.infer<typeof createUsers>;