import { Router } from "express"
import { check } from "express-validator"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import UserService from "./user.service"
const UserController = Router()

UserController.get("", AuthorizeMiddleware, UserService.getUsers)
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
