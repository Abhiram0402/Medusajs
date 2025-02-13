import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { LEAVE_MODULE } from "src/modules/leaves"
import LeaveModuleService from "src/modules/leaves/service"

type ApproveLeaveWorkflowInput = {
    leave_id: string
}

const approveLeaveStep = createStep(
    "approve-leave",
    async ({ leave_id }: ApproveLeaveWorkflowInput, { container }) => {
        const leaveModuleService: LeaveModuleService = container.resolve(LEAVE_MODULE)

        const updatedLeave = await leaveModuleService.updateLeaves({
            id: leave_id,
            request_status: "APPROVED",
        })

        return new StepResponse(updatedLeave, updatedLeave.id)
    }
)

export const approveLeaveWorkflow = createWorkflow(
    "approve-leave",
    (leaveInput: ApproveLeaveWorkflowInput) => {
        const leave = approveLeaveStep(leaveInput)

        return new WorkflowResponse(leave)
    }
)
