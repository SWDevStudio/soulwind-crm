import { Router } from "express"
import PermissionService from "./permission.service"
const permissionController = Router()

// получить право
// получить группу прав
permissionController.post("", PermissionService.create)
permissionController.get("", PermissionService.findAll)
export default permissionController
