import { Request, Response } from "express"
import WebManager from "../express/WebManager"
import UserModel from "./user.model"
import { DefaultServerResponse } from "~/server/structs/DefaultServerResponse"
import { UserDto } from "~/server/User/dto/user.dto"

class UserController {
  create(data: string): DefaultServerResponse<number | string> | any {
    console.log(data)
    WebManager.AppExpress.post(
      "/user/create",
      async (req: Request<any, UserDto>, res: Response) => {
        try {
          console.log(req.body, 123)
          const resp = await UserModel.create(Object.assign({}, req.body))
          res.send({ cats: resp })
        } catch (e) {
          res.send({ e })
        }
      }
    )
  }

  init() {
    this.create("123")
  }
}

export default new UserController()
