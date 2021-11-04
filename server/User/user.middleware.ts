import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator"
import createError from "http-errors"
import CharacterService from "../Character/character.service"
import GenerateToken from "../utils/GenerateToken"
import UserModel from "./dto/user.model"
import UserService from "./user.service"
import { UserDto, UserResponseDto } from "~/server/User/dto/user.dto"

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
      const { email, password } = req.body
      const user = await UserService.load({ email }, true)
      UserService.validPassword(password, user?.password)
      res.json({
        token: GenerateToken(user._id, user.role, user?.characterId),
      })
    } catch (e) {
      throw createError(400, e)
    }
  }

  async getUser(req: any, res: any): Promise<void> {
    const _id = req.params.id
    const user = await UserService.load({ _id }).catch((e) => {
      throw createError(400, e)
    })
    res.send(user)
  }

  async getUsers(req: any, res: any): Promise<void> {
    const users = await UserService.loadAll().catch((e) => {
      throw createError(400, e)
    })
    res.send(users)
  }
}

export default new UserMiddleware()
