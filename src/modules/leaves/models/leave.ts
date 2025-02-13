import { model } from "@medusajs/framework/utils"

const Leave = model.define("leave", {
    id: model.id().primaryKey(),
    leave_date: model.text(),
    leave_reason: model.text(),
    managers_id: model.text().index(),
    request_status: model.text()
})

export default Leave;