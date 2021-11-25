import { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import ErrorCatch from "../middleware/ErrorCatch"
import { HasValidPermissionFields } from "../middleware/HasValidPermissionFields"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import PermissionMiddleware from "./permission.middleware"

const permissionController = Router()

// получить право
// получить группу прав
permissionController.post(
  "",
  RolesMiddleware("permission.create"),
  expressAsyncHandler(PermissionMiddleware.create),
  ErrorCatch
)
permissionController.get(
  "",
  RolesMiddleware("permission.view"),
  expressAsyncHandler(PermissionMiddleware.findAll),
  ErrorCatch
)
permissionController.get(
  "/my-permission",
  AuthorizeMiddleware,
  expressAsyncHandler(PermissionMiddleware.findMyPermission),
  ErrorCatch
)
// permissionController.get("/err", (req, res) => {
//   res.status(400)
//   res.json({ message: "special feil" })
// })
permissionController.get(
  "/:name",
  RolesMiddleware("permission.view"),
  expressAsyncHandler(PermissionMiddleware.find),
  ErrorCatch
)
permissionController.patch(
  "/:name",
  RolesMiddleware("permission.update"),
  expressAsyncHandler(HasValidPermissionFields),
  expressAsyncHandler(PermissionMiddleware.update),
  ErrorCatch
)

permissionController.delete(
  "/:name",
  RolesMiddleware("permission.delete"),
  expressAsyncHandler(PermissionMiddleware.delete),
  ErrorCatch
)

export default permissionController
