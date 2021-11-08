import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import {
  UserDto,
  UserRegisterDto,
  UserResponseDto,
} from "~/server/User/dto/user.dto"
// TODO проверить типизацию
const schema = new Schema<UserDto>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
  characterId: { type: String, default: null },
  activeUser: { type: Boolean, default: false },
})
const UserModel: mongoose.Model<UserResponseDto> =
  mongoose.models.User || model<UserResponseDto>("User", schema)
export default UserModel
