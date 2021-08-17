import * as core from "express-serve-static-core"
import { Router } from "express"
const GroupController = Router()
GroupController.get("", (req, res) => {
  res.send({ res: "hello world" })
})
GroupController.post("", (req, res) => {
  res.send({ res: "hello world post" })
})
export default GroupController
