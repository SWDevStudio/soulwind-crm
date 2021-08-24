import { Router } from "express"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import CharacterService from "./character.service"
const CharacterController = Router()

CharacterController.get("", AuthorizeMiddleware, CharacterService.getCharacter)

export default CharacterController
