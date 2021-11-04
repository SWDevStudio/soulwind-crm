import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator"
import createError from "http-errors"
import CharacterService from "../Character/character.service"
import UserModel from "./dto/user.model"
import UserService from "./user.service"
import { UserRegisterDto } from "~/server/User/dto/user.dto"
import "../utils/GenerateToken"

class UserMiddleware {
  async createUser(req: Request, res: Response) {
    try {
      const { characterId } = req.body
      await CharacterService.isTiedForUser(characterId)
      const createdUser = await UserService.create(req.body)
      await CharacterService.addUserId(characterId, createdUser._id)
      res.json(!!createdUser)
    } catch (e) {
      throw createError(400, e)
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
      // @ts-ignore
      const token = GenerateToken(user._id, user.role, user.characterId)
      res.send({
        token,
      })
    } catch (message) {
      return res.status(400).json({ message })
    }
  }

  async getUser(req: any, res: any): Promise<void> {
    const users: UserRegisterDto[] = await UserModel.find({
      _id: req.params.id,
    }).select("-password")
    res.send(users[0])
  }

  async getUsers(req: any, res: any): Promise<void> {
    const users: UserRegisterDto[] = await UserModel.find().select("-password")
    res.send(users)
  }
}

export default new UserMiddleware()
