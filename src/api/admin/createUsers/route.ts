import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http";

import { createUsersWorkflow } from "src/workflows/create-users";
import { createUsers } from "./validator";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
        const parsedBody = createUsers.parse(req.body);

        const { user_email_id, user_name, managers_id, user_type } = parsedBody;

        if (!user_email_id || !user_name || !managers_id || !user_type) {
            return res.status(400).json({
                status: 400,
                status_message: "All fields are required: user_email_id, user_name, managers_id, user_type",
            });
        }

        const { result: user } = await createUsersWorkflow(req.scope).run({
            input: { user_name, managers_id, user_email_id, user_type },
        });

        return res.json({
            status: 200,
            status_message: "User Created Successfully!",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            status_message: "Internal Server Error",
            error: error.message,
        });
    }
}