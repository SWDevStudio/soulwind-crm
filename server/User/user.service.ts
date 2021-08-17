import { Request, Response } from "express"
import UserModel from "./dto/user.model"
import { UserDto, UserRegisterDto } from "~/server/User/dto/user.dto"

// import { Response } from "express"

class UserService {
  async createUser(req: Request, res: Response): Promise<void> {
    // Проверить есть ли пользователь с такой почтой в чате
    const status = await UserModel.create(req.body)
    if (status) {
      res.send({
        response: status,
      })
    }
  }

  async getUser(req: any, res: any): Promise<void> {
    res.send({
      response: await UserModel.find(),
    })
  }
}

export default new UserService()
