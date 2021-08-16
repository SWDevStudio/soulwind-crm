import { Document } from "mongoose"

export interface UserDto extends Document {
  email: string
  accessGroupId?: number | null
}

export interface UserRegisterDto extends UserDto {
  password: string
}
