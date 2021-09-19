import { Document } from "mongoose"

export interface GroupDto {
  name: string
  groupLeaderId: string | null;
  deputyIds?: string[]
}
export interface GroupDtoModel extends Document, GroupDto {}
