import { Document } from "mongoose"

export interface GroupDto {
  name: string
  groupLeaderId?: string
  deputyIds?: string[]
}
export interface GroupDtoModel extends Document, GroupDto {}
