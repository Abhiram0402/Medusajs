import { z } from "zod";

export const leaveValidator = z.object({
    leave_date: z.string(),
    leave_reason: z.string().optional(),
    managers_id: z.string(),
    request_status: z.string(),
});

export type LeaveRequestType = z.infer<typeof leaveValidator>;
