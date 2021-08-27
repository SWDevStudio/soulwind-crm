import { Document } from "mongoose"

export interface GroupDto {
  name: string
}
export interface GroupModel extends Document, GroupDto {}
