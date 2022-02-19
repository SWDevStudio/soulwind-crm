import { Request, Response } from "express"
import CharacterModel from "./dto/character.model"
import CharacterService from "./character.service"
import {
  CharacterDto,
  CharacterDTOResponse,
} from "~/server/Character/dto/character.dto"

class CharacterMiddleware {
  async getCharacters(req: Request, res: Response) {
    try {
      res.json(await CharacterModel.find())
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async getCharactersGenerals(req: Request, res: Response) {
    try {
      res.json(await CharacterModel.find())
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async getMyCharacterInfo(req: Request, res: Response) {
    const characterId = res.locals._user.characterId
    if (characterId) {
      res.json(await CharacterService.load({ _id: characterId }))
      return
    }
    res.json(null)
  }

  async createCharacter(req: Request, res: Response) {
    try {
      // TODO сделать проверку полей
      const data = req.body as CharacterDto
      const character: CharacterDTOResponse | null =
        await CharacterModel.findOne({
          lastName: data.lastName,
        })
      if (character) {
        return res.json(character)
      }
      const newCharacter = await CharacterModel.create(data)
      res.json(newCharacter)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async patchCharacter(req: Request, res: Response) {
    try {
      // TODO сделать проверку полей
      const data = req.body as CharacterDTOResponse
      const user = await CharacterModel.findOne({
        lastName: data.lastName,
      })
      if (user && String(user._id) !== String(req.body._id)) {
        res.status(400).json({
          message: "Пользователь с такой фамилией существует",
        })
        return
      }
      const resp = await CharacterModel.findOneAndUpdate(
        { _id: req.params.id },
        data
      )
      res.json(resp)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async removeGroupForCharacter(req: Request, res: Response, next: Function) {
    const id: string = req.params.id as string
    await CharacterModel.updateMany(
      { partyId: id },
      {
        partyId: "",
      }
    )
    next()
  }
}

export default new CharacterMiddleware()
