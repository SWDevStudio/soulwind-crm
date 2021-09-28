import { Document } from "mongoose"
export interface PermissionBase {
  [key: string]: boolean
  create: boolean
  update: boolean
  delete: boolean
  view: boolean
}
export interface PermissionDto {
  name: string
  // Прописать список прав, которые нам нужны
  fields: {
    [key: string]: PermissionBase
    character: {
      create: boolean
      update: boolean
      delete: boolean
      view: boolean
    }
    group: {
      create: boolean
      update: boolean
      delete: boolean
      view: boolean
    }
    guildEvent: {
      create: boolean
      update: boolean
      delete: boolean
      view: boolean
    }
  }
}

export interface PermissionResponse extends Document, PermissionDto {}
