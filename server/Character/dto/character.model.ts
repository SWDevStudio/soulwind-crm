import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { CharacterDto } from "~/server/Character/dto/character.dto"
import { UserStatus } from "~/types/UserStatus"

const schema = new Schema<CharacterDto>({
  firstName: { type: String },
  lastName: { type: String, required: true },
  class: { type: String },
  ap: { type: Number },
  awakeningAp: { type: Number },
  dp: { type: Number },
  partyId: { type: String },
  alchemy: { type: Array },
  note: { type: String },
  pvpRank: { type: String },
  level: { type: Number },
  status: { type: String, default: "ACTIVE" },
})

export default mongoose.models.Character ||
  model<CharacterDto>("Character", schema)
