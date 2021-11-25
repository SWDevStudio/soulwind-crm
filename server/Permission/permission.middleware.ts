import { Request, Response } from "express"
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
    res.json(await PermissionService.delete(req.params.name))
  }

  async findMyPermission(req: Request, res: Response) {
    const role = res.locals._user.role
    if (role === "SUPER_ADMIN") {
      res.json(true)
      return
    }
    res.json(await PermissionService.load(res.locals.role.toUpperCase()))
  }
}

export default new PermissionMiddleware()
