import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"

const schema = new Schema<GroupDtoModel>({
  name: { type: String, required: true },
})

export default mongoose.models.Group || model<GroupDtoModel>("Group", schema)
