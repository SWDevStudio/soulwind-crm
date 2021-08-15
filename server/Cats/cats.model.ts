import { Schema, model } from "mongoose"
import * as mongoose from "mongoose"
import { Cat } from "~/server/structs/Cats"

const schema = new Schema<Cat>({
  name: { type: String, required: true },
})

export default mongoose.models.Cats || model<Cat>("Cats", schema)
