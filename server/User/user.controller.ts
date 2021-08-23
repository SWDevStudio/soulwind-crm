import { Router } from "express"
import { check } from "express-validator"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import UserService from "./user.service"
const UserController = Router()

UserController.get(
  "",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN", "USER"]),
  UserService.getUsers
)
UserController.get(
  "/:id",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN", "USER"]),
  UserService.getUser
)
UserController.post("", UserService.createUser)
UserController.post(
  "/login",
  [check("email", "email is required field").notEmpty()],
  UserService.login
)

export default UserController
