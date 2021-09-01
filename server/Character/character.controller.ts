import { Router } from "express"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import CharacterService from "./character.service"
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
  RolesMiddleware(["USER", "ADMIN"]),
  CharacterService.getCharacters
)
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
  RolesMiddleware(["ADMIN"]),
  CharacterService.createCharacter
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
  RolesMiddleware(["ADMIN"]),
  CharacterService.patchCharacter
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
  RolesMiddleware(["ADMIN"]),
  (req, res) => res.json("Метод еще не реализован")
)

export default CharacterController
