import { Document } from "mongoose"
import { JwtPayload } from "jsonwebtoken"
import { Roles } from "~/types/Roles"

export interface UserDto {
  email: string
  role: Roles
  characterId: string | null
  activeUser: boolean
  password: string
}
export interface UserResponseDto extends Document, UserDto {}
export interface UserTokenInfo extends JwtPayload {
  id: string
  role: Roles
  characterId: string | null
  activeUser: boolean
}

export interface UserRegisterDto {
  password: string
  email: string
  characterId: string
}
