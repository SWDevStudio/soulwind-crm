import { Router } from "express"
import { check } from "express-validator"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import UserService from "./user.service"

const UserController = Router()

/**
 * @swagger
 *  /api/user:
 *  get:
 *    description: Возвращает всех пользователей
 *    responses:
 *      '200':
 *        description: sdfad
 *        example: 1232313
 *
 */
UserController.get("", AuthorizeMiddleware, UserService.getUsers)
/**
 * @swagger
 * /apis/user/{id}:
 *  get:
 *   tags: [user]
 *   parameters:
 *    - $ref: '#/parameters/username'
 */
UserController.get(
  "/:id",
  AuthorizeMiddleware,

  UserService.getUser
)
UserController.post(
  "",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  UserService.createUser
)
UserController.post(
  "/login",
  [check("email", "email is required field").notEmpty()],
  UserService.login
)

export default UserController
