import {
  PermissionBase,
  PermissionDto,
} from "~/server/Permission/dto/permission.dto"

export const PERMISSION_BASE: PermissionBase = {
  create: false,
  update: false,
  delete: false,
  view: false,
}

export const PERMISSION_FIELDS: PermissionDto["fields"] = {
  character: Object.assign(PERMISSION_BASE),
  group: Object.assign(PERMISSION_BASE),
  guildEvent: Object.assign(PERMISSION_BASE),
  permission: Object.assign(PERMISSION_BASE),
  user: Object.assign(PERMISSION_BASE),
}

export type PermissionArea = keyof typeof PERMISSION_FIELDS
export type PermissionField = keyof typeof PERMISSION_BASE
