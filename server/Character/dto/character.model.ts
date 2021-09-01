import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { CharacterDto } from "~/server/Character/dto/character.dto"

const schema = new Schema<CharacterDto>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  class: { type: String },
  ap: { type: Number },
  awakeningAp: { type: Number },
  dp: { type: Number },
  partyId: { type: Number },
  alchemy: { type: Array },
  note: { type: String },
  pvpRank: { type: String },
  level: { type: Number },
})

export default mongoose.models.Character ||
  model<CharacterDto>("Character", schema)
