import { Document } from "mongoose"
import { JwtPayload } from "jsonwebtoken"
import { Roles } from "~/types/Roles"

export interface UserDto extends Document {
  email: string
  role: Roles
  characterId: string | null
  activeUser: boolean
}

export interface UserTokenInfo extends JwtPayload {
  id: string
  role: Roles
  characterId: string | null
}

export interface UserRegisterDto extends UserDto {
  password: string
}
