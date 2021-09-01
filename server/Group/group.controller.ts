import { Router } from "express"
import RolesMiddleware from "../middleware/RolesMiddleware"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import GroupService from "./group.service"
const GroupController = Router()

GroupController.get("", AuthorizeMiddleware, GroupService.get)
GroupController.post(
  "/create",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  GroupService.create
)
GroupController.patch(
  "/patch/:id",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  GroupService.update
)
GroupController.delete(
  "/delete/:id",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  GroupService.delete
)

export default GroupController
