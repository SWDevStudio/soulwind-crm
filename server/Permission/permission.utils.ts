import PermissionModel from "./dto/permission.model"
import {
  PermissionDto,
  PermissionResponse,
} from "~/server/Permission/dto/permission.dto"

export default class PermissionUtils {
  static async createPermission(
    payload: PermissionDto
  ): Promise<PermissionResponse> {
    return await PermissionModel.create(payload)
  }
}
