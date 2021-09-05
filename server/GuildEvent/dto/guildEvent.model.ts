import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { GuildEventDto } from "~/server/GuildEvent/dto/guildEvent.dto"

const schema = new Schema<GuildEventDto>({
  date: { type: Number, required: true, immutable: true },
  eventType: { type: String, required: true },
  participants: { type: Array, default: [] },
})

const guildEvent =
  mongoose.models.guildEvent || model<GuildEventDto>("guildEvent", schema)

export default guildEvent
