import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { CharacterDto } from "~/server/Character/dto/character.dto"

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
  rankParty: { type: String, default: "Рядовой" },
  userId: { type: String, default: null },
  createdAt: { type: Number, default: 1649710800 },
  updatedAt: { type: Number, default: 1649710800 }
})
const CharacterModel: mongoose.Model<CharacterDto> =
  mongoose.models.Character || model<CharacterDto>("Character", schema)
export default CharacterModel
