import { Request, Response } from "express"
import { ServiceHelper } from "../service/ServiceHelper"
import PermissionUtils from "./permission.utils"
import PermissionModel from "./dto/permission.model"
class PermissionService {
  async create(req: Request, res: Response) {
    try {
      res.json(await PermissionUtils.createPermission(req.body))
    } catch (e) {
      ServiceHelper.defaultErrorResponse(res, e)
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      res.json(await PermissionModel.find())
    } catch (e) {
      ServiceHelper.defaultErrorResponse(res, e)
    }
  }
}

export default new PermissionService()
