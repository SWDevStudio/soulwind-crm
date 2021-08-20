import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator"
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
    const { email, password } = req.body
    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Не хватает обязательных полей email или password" })
    }
    // Проверить есть ли пользователь с такой почтой в чате
    const user = await UserModel.findOne({
      email: req.body.email,
    })
    if (user) {
      res
        .status(400)
        .json({ message: "Пользователь с такой почтой уже существует" })
    }
    const status = await UserModel.create({
      email,
      password: bcrypt.hashSync(password, 7),
    })
    if (status) {
      res.send({
        response: status,
      })
    }
  }

  async login(req: Request, res: Response) {
    try {
      // TODO сделать чеки и добавить утилиты для проверки.
      if (!validationResult(req).isEmpty()) {
        return res.status(400).json(validationResult(req))
      }
      const { email, password } = req.body
      const user = await UserModel.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: "Пароли не совпадают" })
      }
      const token = generateToken(user._id, user.role)
      res.send({
        token,
      })
    } catch (message) {
      return res.status(400).json({ message })
    }
  }

  async getUser(req: any, res: any): Promise<void> {
    console.log(req.user, "user")
    res.send({
      response: await UserModel.find(),
    })
  }
}

export default new UserService()
