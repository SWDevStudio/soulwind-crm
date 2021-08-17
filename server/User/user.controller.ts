import { Request, Response } from "express"
import WebManager from "../WebManager"
import { ServerController } from "../utils/ServerController"
import UserService from "./user.service"

class UserController extends ServerController {
  post() {
    this.postDecorator("/create", async (req: Request, res: Response) => {
      await UserService.create(req.body)
      res.send({
        response: true,
      })
    })
  }

  get() {
    this.getDecorator("/:id", async (req: Request, res: Response) => {
      res.send({
        response: await UserService.get(req.params?.id || ""),
      })
    })
  }

  getAll() {
    this.getDecorator("", async (req: Request, res: Response) => {
      res.send({
        response: await UserService.get(),
      })
    })
  }

  public Init(path: string) {
    this.path = path
    this.get()
    this.getAll()
    this.post()
  }
}

export default UserController
