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

      if (characterId) {
        await CharacterService.isTiedForUser(characterId)
      }
      // TODO думаю можно придумать более оптимальный способ проверки 1го аккаунта который будет с супер правами
      const users = await UserService.loadAll()
      if (!users.length) {
        req.body.role = UserService.superUserName
        req.body.activeUser = true
      }
      const createdUser = await UserService.create(req.body)
      if (characterId) {
        await CharacterService.addUserId(characterId, createdUser._id)
      }
      res.json(!!createdUser)
    } catch (e) {
      throw createError(400, e)
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { _id } = req.body
      const user: UserResponseDto = await UserService.load({ _id })

      if (user.characterId) {
        await CharacterService.removeUserId(user.characterId)
      }
      res.json(!!(await UserService.delete(_id)))
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
        token: GenerateToken(
          user._id,
          user.role,
          user?.characterId,
          user.activeUser
        ),
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

  async toggleActiveUser(req: Request, res: Response): Promise<void> {
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.body.id },
        {
          activeUser: req.body.value,
        }
      )

      res.json(await UserModel.findOne({ _id: req.body.id }))
    } catch (e) {
      throw createError(400, e)
    }
  }

  async setRole(req: Request, res: Response): Promise<void> {
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.body.id },
        {
          role: req.body.role,
        }
      )
      res.json(await UserModel.findOne({ _id: req.body.id }))
    } catch (e) {
      throw createError(400, e)
    }
  }

  async setCharacter(req: Request, res: Response) {
    try {
      const { characterId, id } = req.body
      const user: any = await UserService.load({ _id: id })
      await CharacterService.isTiedForUser(characterId)
      if (user.characterId) {
        await CharacterService.removeUserId(user.characterId)
      }
      await CharacterService.addUserId(characterId, id)
      await UserService.update(id, { characterId })
      res.json(await UserModel.findOne({ _id: req.body.id }))
    } catch (e) {
      throw createError(400, e)
    }
  }
}

export default new UserMiddleware()
