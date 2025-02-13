import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { LEAVE_MODULE } from "src/modules/leaves"
import LeaveModuleService from "src/modules/leaves/service"

type CreateLeaveWorkflowInput = {
    leave_date: string
    leave_reason: string
    managers_id: string
    request_status: string
}

const createLeaveStep = createStep(
    "create-leave",
    async (
        { leave_date, leave_reason, managers_id, request_status }: CreateLeaveWorkflowInput,
        { container }
    ) => {
        const leaveModuleService: LeaveModuleService = container.resolve(LEAVE_MODULE)

        const leave = await leaveModuleService.createLeaves({
            leave_date,
            leave_reason,
            managers_id,
            request_status,
        })

        return new StepResponse(leave, leave.id)
    }
)

export const createLeaveWorkflow = createWorkflow(
    "create-leave",
    (leaveInput: CreateLeaveWorkflowInput) => {
        const leave = createLeaveStep(leaveInput)

        return new WorkflowResponse(leave)
    }
)
