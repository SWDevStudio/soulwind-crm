import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { UserRegisterDto } from "~/server/User/dto/user.dto"

const schema = new Schema<UserRegisterDto>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
  characterId: { type: String, required: true, default: null },
  activeUser: { type: Boolean, default: false },
})
const UserModel: mongoose.Model<UserRegisterDto> =
  mongoose.models.User || model<UserRegisterDto>("User", schema)
export default UserModel
