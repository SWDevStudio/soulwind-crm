import { Router } from "express"
import { check } from "express-validator"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import UserService from "./user.service"
const UserController = Router()

UserController.get("", AuthorizeMiddleware, UserService.getUser)
UserController.post("", UserService.createUser)
UserController.post(
  "/login",
  [check("email", "email is required field").notEmpty()],
  UserService.login
)

export default UserController
