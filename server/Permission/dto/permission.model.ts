import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { PERMISSION_FIELDS } from "../../Data/PERMISSION_FIELDS"
import {
  PermissionDto,
  PermissionResponse,
} from "~/server/Permission/dto/permission.dto"

const schema = new Schema<PermissionDto>({
  name: { type: String, required: true, readonly: true },
  fields: {
    type: Object,
    default: PERMISSION_FIELDS,
    required: true,
  },
})

const PermissionModel: mongoose.Model<PermissionResponse> =
  mongoose.models.permission || model<PermissionResponse>("permission", schema)

export default PermissionModel
