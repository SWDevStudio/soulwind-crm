import { Router } from "express"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import UserService from "./user.service"
const UserController = Router()

UserController.get("", AuthorizeMiddleware, UserService.getUser)
UserController.post("", UserService.createUser)
UserController.post("/login", UserService.login)

export default UserController
