import { Router } from "express"
import AuthorizeMiddleware from "../middleware/AuthorizeMiddleware"
import RolesMiddleware from "../middleware/RolesMiddleware"
import GuildEventService from "./guildEvent.service"
const GuildEventController = Router()

GuildEventController.get(
  "",
  AuthorizeMiddleware,
  RolesMiddleware(["USER", "ADMIN"]),
  GuildEventService.getEvents
)
GuildEventController.get(
  "/:id",
  AuthorizeMiddleware,
  RolesMiddleware(["USER", "ADMIN"]),
  GuildEventService.getEvent
)
GuildEventController.post(
  "",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  GuildEventService.createEvent
)
GuildEventController.patch(
  "/:id",
  AuthorizeMiddleware,
  RolesMiddleware(["ADMIN"]),
  GuildEventService.updateEvent
)

export default GuildEventController
