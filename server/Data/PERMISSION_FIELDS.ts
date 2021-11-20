import {
  PermissionDto,
  PermissionResponse,
} from "~/server/Permission/dto/permission.dto"

export const PERMISSION_FIELDS: PermissionDto["fields"] = {
  character: {
    create: false,
    update: false,
    delete: false,
    view: false,
  },
  group: {
    create: false,
    update: false,
    delete: false,
    view: false,
  },
  guildEvent: {
    create: false,
    update: false,
    delete: false,
    view: false,
  },
  permission: {
    create: false,
    update: false,
    delete: false,
    view: false,
  },
}
