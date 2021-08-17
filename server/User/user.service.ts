import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ServerData } from "../Data/SECRET_KEY"
import UserModel from "./dto/user.model"
import { UserDto, UserRegisterDto } from "~/server/User/dto/user.dto"

const generateToken = (id: string, role: string) => {
  const payload = {
    id,
    role,
  }
  return jwt.sign(payload, ServerData.SECRET_KEY, { expiresIn: "24h" })
}
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

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" })
    }
    const validPassword = password === user.password
    if (!validPassword) {
      return res.status(400).json({ message: "Пароли не совпадают" })
    }
    const token = generateToken(user._id, user.role)
    res.send({
      token,
    })
  }

  async getUser(req: any, res: any): Promise<void> {
    console.log(req.user, "user")
    res.send({
      response: await UserModel.find(),
    })
  }
}

export default new UserService()
