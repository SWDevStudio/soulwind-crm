import { Request, Response } from "express"
import GroupModel from "./dto/group.model"
import { GroupDto } from "~/server/Group/dto/group.dto"
class GroupService {
  async get(req: Request, res: Response) {
    try {
      res.json(await GroupModel.find())
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body as GroupDto
      const group = await GroupModel.findOne({ name: data.name.toLowerCase() })
      console.log(group)
      if (group) {
        return res.status(400).json({ message: "Данная группа уже существует" })
      }
      data.name = data.name.toLowerCase()
      res.json(await GroupModel.create(data))
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }
}

export default new GroupService()
