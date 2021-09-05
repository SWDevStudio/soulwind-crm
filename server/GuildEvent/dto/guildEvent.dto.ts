import { Document } from "mongoose"
import { GuildEvents } from "~/types/GuildEvents/GuildEvents"
import { EventStatus } from "~/types/GuildEvents/EventStatus"

export interface Participants {
  characterId: string
  status: EventStatus
}

export interface GuildEventDto {
  date: number
  eventType: GuildEvents
  participants: Participants[]
}

export interface GuildEventDtoResponse extends GuildEventDto, Document {}
