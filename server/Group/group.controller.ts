import { Router } from "express"
import GroupService from "./group.service"
const GroupController = Router()

GroupController.get("", GroupService.get)
GroupController.post("/create", GroupService.create)
GroupController.patch("/patch/:id", GroupService.update)
GroupController.delete("/delete/:id", GroupService.delete)

export default GroupController
