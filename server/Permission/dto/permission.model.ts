import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { PermissionDto } from "~/server/Permission/dto/permission.dto"

const schema = new Schema<PermissionDto>({
  name: { type: String, required: true },
  fields: {
    type: Object,
    default: {
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
    },
  },
})

const PermissionModel =
  mongoose.models.permission || model<PermissionDto>("permission", schema)

export default PermissionModel
