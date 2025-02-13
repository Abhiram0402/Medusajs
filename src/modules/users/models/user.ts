import { model } from "@medusajs/framework/utils"

const User = model.define("users_table", {
    user_id: model.id().primaryKey(),
    user_name: model.text(),
    user_email_id: model.text(),
    user_type: model.text().index(),
    managers_id: model.text().index()
})

export default User;