import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http";

import { createLeaveWorkflow } from "src/workflows/create-leave";
import { leaveValidator } from "./validator";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
        const parsedBody = leaveValidator.parse(req.body);

        const { leave_date, leave_reason, managers_id, request_status } = parsedBody;

        if (!leave_date || !leave_reason || !managers_id || !request_status) {
            return res.status(400).json({
                status: 400,
                status_message: "All fields are required: user_email_id, user_name, managers_id, user_type",
            });
        }

        const { result: leave } = await createLeaveWorkflow(req.scope).run({
            input: { leave_date, managers_id, leave_reason, request_status },
        });

        return res.json({
            status: 200,
            status_message: "Leave Request Created Successfully!",
            leave,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            status_message: "Internal Server Error",
            error: error.message,
        });
    }
}