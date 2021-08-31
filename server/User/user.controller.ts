import { Router } from "express"
import { check } from "express-validator"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import UserService from "./user.service"

const UserController = Router()

/**
 * @swagger
 *  /user:
 *  get:
 *    description: Возвращает всех существующих пользователей
 *    tags: [User]
 *    parameters:
 *      - name: "token"
 *        in: "header"
 *        required: true
 *        type: string
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
UserController.get("", AuthorizeMiddleware, UserService.getUsers)
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
 *   responses:
 *      '200':
 *        schema:
 *            $ref: "#/definitions/UserDTO"
 *      '400':
 *        schema:
 *         $ref: "#/definitions/ErrorResponse"
 *
 */
UserController.get("/:id", AuthorizeMiddleware, UserService.getUser)
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
UserController.post("/register", UserService.createUser)
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
  [check("email", "email is required field").notEmpty()],
  UserService.login
)

export default UserController
