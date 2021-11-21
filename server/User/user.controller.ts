import { Router } from "express"
import { check } from "express-validator"
import expressAsyncHandler from "express-async-handler"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import ValidationFields from "../middleware/ValidationFields"
import ErrorCatch from "../middleware/ErrorCatch"
import UserMiddleware from "./user.middleware"
const UserController = Router()

/**
 * @swagger
 *  /user:
 *  get:
 *    description: Возвращает всех существующих пользователей
 *    tags: [User]
 *    parameters:
 *      - $ref: "#/parameters/token"
 *    responses:
 *      '200':
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/UserDTO"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 *
 */
UserController.get("", AuthorizeMiddleware, UserMiddleware.getUsers)
/**
 * @swagger
 * /user/{id}:
 *  get:
 *   tags: [User]
 *   parameters:
 *    - name: "id"
 *      in: "path"
 *      required: true
 *      type: string
 *    - $ref: "#/parameters/token"
 *   responses:
 *      '200':
 *        schema:
 *            $ref: "#/definitions/UserDTO"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 *
 */
UserController.get(
  "/:id",
  AuthorizeMiddleware,
  RolesMiddleware("user.view"),
  expressAsyncHandler(UserMiddleware.getUser),
  ErrorCatch
)
/**
 * @swagger
 *  /user/register:
 *  post:
 *    description: Создает в базе нового пользователя и возвращает статус выполнения
 *    tags: [User]
 *    parameters:
 *      - name: "body"
 *        in: "body"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/UserRegisterDTO"
 *    responses:
 *      '200':
 *        description: boolean value true/false
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 *
 */
UserController.post(
  "/register",
  [
    check("email", "email is required field").notEmpty(),
    check("password", "password is required").notEmpty(),
  ],
  ValidationFields,
  expressAsyncHandler(UserMiddleware.createUser),
  ErrorCatch
)
/**
 * @swagger
 *  /user/login:
 *  post:
 *    description: Метод авторизации пользователя, возвращает токен доступный в течении 24х часов
 *    tags: [User]
 *    parameters:
 *      - name: "body"
 *        in: "body"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/UserRegisterDTO"
 *    responses:
 *      '200':
 *         schema:
 *          $ref: "#/parameters/loginResponse"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 *
 */
UserController.post(
  "/login",
  [
    check("email", "email is required field").notEmpty(),
    check("password", "password is required").notEmpty(),
  ],
  ValidationFields,
  expressAsyncHandler(UserMiddleware.login),
  ErrorCatch
)

UserController.patch(
  "/active",
  [
    check("id", "id is required field").notEmpty().isString(),
    check("value", "value is required").notEmpty().isBoolean(),
  ],
  ValidationFields,
  RolesMiddleware("user.update"),
  expressAsyncHandler(UserMiddleware.toggleActiveUser),
  ErrorCatch
)
UserController.patch(
  "/role",
  [
    check("id", "id is required field").notEmpty().isString(),
    check("role", "role is required").notEmpty().isString(),
  ],
  ValidationFields,
  RolesMiddleware("user.update"),
  expressAsyncHandler(UserMiddleware.setRole),
  ErrorCatch
)

UserController.patch(
  "/character",
  [
    check("id", "id is required field").notEmpty().isString(),
    check("characterId", "characterId is required").notEmpty().isString(),
  ],
  ValidationFields,
  RolesMiddleware("user.update"),
  expressAsyncHandler(UserMiddleware.setCharacter),
  ErrorCatch
)

UserController.delete(
  "/delete",
  [check("_id", "_id is required field").notEmpty().isString()],
  ValidationFields,
  RolesMiddleware("user.delete"),
  expressAsyncHandler(UserMiddleware.deleteUser),
  ErrorCatch
)

export default UserController
