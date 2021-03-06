import { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import ErrorCatch from "../middleware/ErrorCatch"
import CharacterMiddleware from "./character.middleware"

const CharacterController = Router()

/**
 * @swagger
 *  /character:
 *  get:
 *    tags: [Character]
 *    description: Возвращает список созданных персонажей
 *    parameters:
 *      - $ref: "#/parameters/token"
 *    responses:
 *      '200':
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/CharacterDTOResponse"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 */
CharacterController.get(
  "",
  AuthorizeMiddleware,
  RolesMiddleware("character.view"),
  CharacterMiddleware.getCharacters
)

CharacterController.get(
  "/my-info",
  AuthorizeMiddleware,
  expressAsyncHandler(CharacterMiddleware.getMyCharacterInfo),
  ErrorCatch
)

CharacterController.get("/general", CharacterMiddleware.getCharactersGenerals)
/**
 * @swagger
 *  /character:
 *  post:
 *    tags: [Character]
 *    description: Создает нового персонажа
 *    parameters:
 *       - $ref: "#/parameters/token"
 *       - $ref: "#/parameters/createCharacter"
 *    responses:
 *      '200':
 *        schema:
 *          $ref: "#/definitions/CharacterDTOResponse"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 */
CharacterController.post(
  "",
  AuthorizeMiddleware,
  RolesMiddleware("character.create"),
  CharacterMiddleware.createCharacter
)

// TODO возможно методы для обновления профиля стоит вынести отдельно в будущем.
CharacterController.patch(
  "/profile",
  AuthorizeMiddleware,
  CharacterMiddleware.patchCharacter
)

/**
 * @swagger
 *  /character/{id}:
 *  patch:
 *    tags: [Character]
 *    description: Обновить данные о персонаже
 *    parameters:
 *       - $ref: "#/parameters/token"
 *       - $ref: "#/parameters/createCharacter"
 *    responses:
 *      '200':
 *        schema:
 *          $ref: "#/definitions/CharacterDTOResponse"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 */
CharacterController.patch(
  "/:id",
  AuthorizeMiddleware,
  RolesMiddleware("character.update"),
  CharacterMiddleware.patchCharacter
)
/**
 * @swagger
 *  /character/{id}:
 *  delete:
 *    tags: [Character]
 *    description: Удаляет персонажа (Метод еще не реализован)
 *    parameters:
 *       - $ref: "#/parameters/token"
 *       - name: "id"
 *         in: "path"
 *         description: "id пользователя"
 *         required: "true"
 *         type: "string"
 *    responses:
 *      '200':
 *        description: Возвращает boolean
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 */
CharacterController.delete(
  "/:id",
  AuthorizeMiddleware,
  RolesMiddleware("character.delete"),
  (req, res) => res.json("Метод еще не реализован")
)

export default CharacterController
