import createError from "http-errors"
import { HasValidPermissionFields } from "../middleware/HasValidPermissionFields"
import PermissionModel from "./dto/permission.model"
import {
  PermissionDto,
  PermissionResponse,
} from "~/server/Permission/dto/permission.dto"

export default class PermissionService {
  static async create(payload: PermissionDto): Promise<PermissionResponse> {
    return await PermissionModel.create(payload).catch((e) => {
      throw createError(400, e)
    })
  }

  static delete(name: string) {
    return PermissionModel.findOneAndDelete({ name })
  }

  static loadAll() {
    return PermissionModel.find().catch((e) => {
      throw createError(400, e)
    })
  }

  static load(name: string) {
    return PermissionModel.findOne({ name }).catch((e) => {
      throw createError(400, e)
    })
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
