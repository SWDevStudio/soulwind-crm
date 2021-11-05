import { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import ErrorCatch from "../middleware/ErrorCatch"
import { HasValidPermissionFields } from "../middleware/HasValidPermissionFields"
import PermissionMiddleware from "./permission.middleware"
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
permissionController.get("/err", (req, res) => {
  res.status(400)
  res.json({ message: "special feil" })
})
permissionController.get(
  "/:name",
  expressAsyncHandler(PermissionMiddleware.find),
  ErrorCatch
)
permissionController.patch(
  "/:name",
  expressAsyncHandler(HasValidPermissionFields),
  expressAsyncHandler(PermissionMiddleware.update),
  ErrorCatch
)

permissionController.delete(
  "/:name",
  expressAsyncHandler(PermissionMiddleware.delete),
  ErrorCatch
)

export default permissionController
