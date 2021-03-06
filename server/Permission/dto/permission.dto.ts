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
    // TODO не совсем корректный подход указывать, что тут могут быть любые ключи
    [key: string]: PermissionBase
    character: PermissionBase
    group: PermissionBase
    guildEvent: PermissionBase
    permission: PermissionBase
    user: PermissionBase
  }
}

export interface PermissionResponse extends Document, PermissionDto {}
