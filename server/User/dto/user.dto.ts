import { Document } from "mongoose"
import { Roles } from "~/types/Roles"
import { JwtPayload } from "jsonwebtoken"

export interface UserDto extends Document {
  email: string
  role?: Roles
}

export interface UserTokenInfo extends JwtPayload {
  id: string
  role: Roles
}

export interface UserRegisterDto extends UserDto {
  password: string
}
