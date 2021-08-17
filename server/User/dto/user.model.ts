import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { UserRegisterDto } from "~/server/User/dto/user.dto"

const schema = new Schema<UserRegisterDto>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
})

export default mongoose.models.User || model<UserRegisterDto>("User", schema)
