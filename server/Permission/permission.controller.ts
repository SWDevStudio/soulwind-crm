import { Router } from "express"
import ErrorCatch from "../middleware/ErrorCatch"
import PermissionMiddleware from "./permission.middleware"
import expressAsyncHandler from "express-async-handler"

const permissionController = Router()

// получить право
// получить группу прав
permissionController.post(
  "",
  expressAsyncHandler(PermissionMiddleware.create),
  ErrorCatch
)
permissionController.get(
  "",
  expressAsyncHandler(PermissionMiddleware.findAll),
  ErrorCatch
)
permissionController.get(
  "/:name",
  expressAsyncHandler(PermissionMiddleware.find),
  ErrorCatch
)
permissionController.patch(
  "/:name",
  expressAsyncHandler(PermissionMiddleware.update),
  ErrorCatch
)
permissionController.delete(
  "/:name",
  expressAsyncHandler(PermissionMiddleware.delete),
  ErrorCatch
)
export default permissionController
