import { Router } from "express"
import RolesMiddleware from "../middleware/RolesMiddleware"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import CharacterService from "../Character/character.service"
import GroupService from "./group.service"
const GroupController = Router()

GroupController.get("", AuthorizeMiddleware, GroupService.get)
GroupController.post(
  "/create",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  GroupService.create
  // Думаю сделать отдельный метод
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
  CharacterService.removeGroupForCharacter,
  GroupService.delete
)

export default GroupController
