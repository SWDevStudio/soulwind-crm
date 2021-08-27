import { Router } from "express"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import CharacterService from "./character.service"
const CharacterController = Router()

CharacterController.get(
  "",
  AuthorizeMiddleware,
  RolesMiddleware(["USER", "ADMIN"]),
  CharacterService.getCharacters
)
CharacterController.post(
  "/create",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  CharacterService.createCharacter
)
CharacterController.patch(
  "/patch/:id",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  CharacterService.patchCharacter
)

export default CharacterController
