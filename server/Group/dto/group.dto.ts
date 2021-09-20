import { Document } from "mongoose"

export interface GroupDto {
  name: string;
}

export interface GroupDtoModel extends Document, GroupDto {}
