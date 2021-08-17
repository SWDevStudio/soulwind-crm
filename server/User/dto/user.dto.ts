import { Document } from "mongoose"

export interface UserDto extends Document {
  email: string
  role?: string | null
}

export interface UserRegisterDto extends UserDto {
  password: string
}
