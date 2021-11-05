import { Request, Response } from "express"
import { HasValidPermissionFields } from "../middleware/HasValidPermissionFields"
import PermissionService from "./permission.service"

class PermissionMiddleware {
  async create(req: Request, res: Response) {
    res.json(await PermissionService.create(req.body))
  }

  async findAll(req: Request, res: Response) {
    res.json(await PermissionService.loadAll())
  }

  async find(req: Request, res: Response) {
    res.json(await PermissionService.load(req.params.name.toUpperCase()))
  }

  async update(req: Request, res: Response) {
    res.json(
      await PermissionService.update(req.params.name.toUpperCase(), req.body)
    )
  }

  async delete(req: Request, res: Response) {
    res.json(await PermissionService.delete(req.params.name.toUpperCase()))
  }
}

export default new PermissionMiddleware()
