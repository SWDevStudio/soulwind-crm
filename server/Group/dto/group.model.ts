import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"

const schema = new Schema<GroupDtoModel>({
  name: { type: String, required: true },
  groupLeaderId: { type: String },
  deputyIds: { type: Array },
})

export default mongoose.models.Group || model<GroupDtoModel>("Group", schema)
