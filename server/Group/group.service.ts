import { Request, Response } from "express"
import { ServiceHelper } from "../service/ServiceHelper"
import GroupModel from "./dto/group.model"
import { GroupDto, GroupDtoModel } from "~/server/Group/dto/group.dto"

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

  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const data = req.body as GroupDto
      data.name = data.name.toLowerCase()
      await GroupModel.findByIdAndUpdate(req.params.id, data)
      res.json(await GroupModel.findOne({ _id: req.params.id }))
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id as string
      const status = await GroupModel.findByIdAndDelete(id)

      if (!status) {
        return ServiceHelper.defaultErrorResponse(
          res,
          "Данного пользователя нет в базе"
        )
      }

      return res.json(status)
    } catch (e) {
      ServiceHelper.defaultErrorResponse(res, e)
    }
  }
}

export default new GroupService()
