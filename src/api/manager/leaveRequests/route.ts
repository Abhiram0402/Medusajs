import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { approveLeave } from "./validator";
import { approveLeaveWorkflow } from "src/workflows/approve-leave";

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
    try {
        console.log("Received Request Body:", req.body);

        const parsedBody = approveLeave.parse(req.body);

        console.log("Validated Body:", parsedBody);

        const { leave_id } = parsedBody;

        if (!leave_id) {
            return res.status(400).json({
                status: 400,
                status_message: "Missing Mandatory field - leave_id",
            });
        }

        const { result: leave } = await approveLeaveWorkflow(req.scope).run({
            input: { leave_id },
        });

        res.json({
            status: 200,
            status_message: "Leave Approved Successfully!",
            leave,
        });
    } catch (error) {
        console.error("Error:", error);

        res.status(400).json({
            status: 400,
            status_message: "Invalid request body",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
