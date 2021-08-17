import { Router } from "express"
import UserService from "./user.service"

const UserController = Router()
UserController.get("", UserService.getUser)
UserController.post("", UserService.createUser)

export default UserController
