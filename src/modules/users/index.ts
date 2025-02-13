import UserModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const USER_MODULE = "users"

export default Module(USER_MODULE, {
    service: UserModuleService,
})