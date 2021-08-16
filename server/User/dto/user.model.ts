import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { UserRegisterDto } from "~/server/User/dto/user.dto"

const schema = new Schema<UserRegisterDto>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  accessGroupId: { type: Number, default: null },
})

export default mongoose.models.User || model<UserRegisterDto>("User", schema)
