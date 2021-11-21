import createError from "http-errors"
import { HasValidPermissionFields } from "../middleware/HasValidPermissionFields"
import { PERMISSION_FIELDS } from "../Data/PERMISSION_FIELDS"
import PermissionModel from "./dto/permission.model"

import {
  PermissionBase,
  PermissionDto,
  PermissionResponse,
} from "~/server/Permission/dto/permission.dto"
const fillEmptyFields = (permissionsGroups: any[]) => {
  const needAllKeys = Object.keys(PERMISSION_FIELDS)
  permissionsGroups.forEach((group: any) => {
    const existingKeys = Object.keys(group.fields)
    needAllKeys.forEach((key) => {
      const permissionField: PermissionBase = {
        create: false,
        update: false,
        delete: false,
        view: false,
      }
      if (!existingKeys.includes(key)) {
        group.fields[key] = Object.assign({}, permissionField)
      }
    })
  })
}

export default class PermissionService {
  static async create(payload: PermissionDto): Promise<PermissionResponse> {
    return await PermissionModel.create(payload).catch((e) => {
      throw createError(400, e)
    })
  }

  static delete(name: string) {
    return PermissionModel.findOneAndDelete({ name })
  }

  static async loadAll() {
    const permissionsGroups: PermissionResponse[] =
      await PermissionModel.find().catch((e) => {
        throw createError(400, e)
      })
    fillEmptyFields(permissionsGroups)
    return permissionsGroups
  }

  static async load(name: string) {
    const permissionGroup = await PermissionModel.findOne({ name }).catch(
      (e) => {
        throw createError(400, e)
      }
    )
    fillEmptyFields([permissionGroup])
    return permissionGroup
  }

  static async update(name: string, update: PermissionDto) {
    try {
      await PermissionModel.findOneAndUpdate(
        { name },
        {
          fields: update.fields,
        }
      )

      return PermissionModel.findOne({ name })
    } catch (e) {
      throw createError(400, e)
    }
  }
}
