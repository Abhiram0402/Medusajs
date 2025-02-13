import { z } from "zod";

export const approveLeave = z.object({
    leave_id: z.string(),
});

export type approveLeaveRequestType = z.infer<typeof approveLeave>;