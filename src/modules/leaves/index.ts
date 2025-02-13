import LeaveModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const LEAVE_MODULE = "leave"

export default Module(LEAVE_MODULE, {
    service: LeaveModuleService,
})