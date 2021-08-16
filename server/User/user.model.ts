import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { UserDto } from "~/server/User/dto/user.dto"

const schema = new Schema<UserDto>({
  name: { type: String, required: true },
  lvl: { type: Number },
  class: { type: String },
  partyId: { type: Number },
})

export default mongoose.models.User || model<UserDto>("User", schema)
