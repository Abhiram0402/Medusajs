import { MedusaService } from "@medusajs/framework/utils"
import Leave from "./models/leave"

class LeaveModuleService extends MedusaService({
    Leave,
}) {
}

export default LeaveModuleService