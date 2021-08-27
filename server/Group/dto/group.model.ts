import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { GroupModel } from "~/server/Group/dto/group.dto"

const schema = new Schema<GroupModel>({
  name: { type: String, required: true },
})

export default mongoose.models.Group || model<GroupModel>("Group", schema)
