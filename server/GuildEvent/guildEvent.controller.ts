import { Router } from "express"
import GuildEventService from "./guildEvent.service"
const GuildEventController = Router()

GuildEventController.get("", GuildEventService.getEvents)
GuildEventController.get("/:id", GuildEventService.getEvent)
GuildEventController.post("", GuildEventService.createEvent)
GuildEventController.patch("/:id", GuildEventService.updateEvent)
export default GuildEventController
