import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { USER_MODULE } from "src/modules/users"
import UserModuleService from "src/modules/users/service"

type CreateUsersWorkflowInput = {
    user_name: string
    user_email_id: string
    managers_id: string
    user_type: string
}

const createUsersStep = createStep(
    "create-users",
    async (
        { user_name, user_email_id, managers_id, user_type }: CreateUsersWorkflowInput,
        { container }
    ) => {
        const userModuleService: UserModuleService = container.resolve(USER_MODULE)

        const user = await userModuleService.createUsers({
            user_name,
            user_email_id,
            managers_id,
            user_type,
        })

        return new StepResponse(user, user.user_id)
    }
)

export const createUsersWorkflow = createWorkflow(
    "create-users",
    (userInput: CreateUsersWorkflowInput) => {
        const user = createUsersStep(userInput)

        return new WorkflowResponse(user)
    }
)
