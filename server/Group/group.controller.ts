import { Router } from "express"
import RolesMiddleware from "../middleware/RolesMiddleware"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import CharacterService from "../Character/character.middleware"
import GroupService from "./group.service"

const GroupController = Router()

GroupController.get(
  "",
  AuthorizeMiddleware,
  RolesMiddleware("group.view"),
  GroupService.get
)
GroupController.post(
  "/create",
  AuthorizeMiddleware,
  RolesMiddleware("group.create"),
  GroupService.create
  // Думаю сделать отдельный метод
)
GroupController.patch(
  "/patch/:id",
  AuthorizeMiddleware,
  RolesMiddleware("group.update"),
  GroupService.update
)
GroupController.delete(
  "/delete/:id",
  AuthorizeMiddleware,
  RolesMiddleware("group.delete"),
  CharacterService.removeGroupForCharacter,
  GroupService.delete
)

export default GroupController
