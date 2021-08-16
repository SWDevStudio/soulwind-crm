import { Request, Response } from "express"
import WebManager from "../WebManager"
import UserService from "./user.service"
import { UserRegisterDto } from "~/server/User/dto/user.dto"

function UserController(path: string) {
  WebManager.AppExpress.post(
    path + "/create",
    async (req: Request<any, UserRegisterDto>, res: Response) => {
      try {
        await UserService.create(req.body)
        res.send({
          response: true,
        })
      } catch (e) {
        console.log(e.response)
        res.send({ e })
      }
    }
  )

  WebManager.AppExpress.get(path + "/:id", async (req, res) => {
    try {
      res.send({
        response: await UserService.get(req.params?.id),
      })
    } catch (e) {
      console.log(e.response)
      res.send({ e })
    }
  })
}

export default UserController
