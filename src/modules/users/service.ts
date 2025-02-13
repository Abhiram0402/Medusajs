import { MedusaService } from "@medusajs/framework/utils"
import User from "./models/user"

class UserModuleService extends MedusaService({
    User,
}) {
}

export default UserModuleService