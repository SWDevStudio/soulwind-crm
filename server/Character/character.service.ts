import { Request, Response } from "express"
import CharacterModel from "./dto/character.model"
import {
  CharacterDto,
  CharacterDtoMongoose,
} from "~/server/Character/dto/character.dto"

class CharacterService {
  async getCharacters(req: Request, res: Response) {
    try {
      res.json(await CharacterModel.find())
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async createCharacter(req: Request, res: Response) {
    try {
      // TODO сделать проверку полей
      const data = req.body as CharacterDto
      const character: CharacterDtoMongoose = await CharacterModel.findOne({
        lastName: data.lastName,
      })
      if (character) {
        return res.json(character._id)
      }
      const status = await CharacterModel.create(data)
      res.json(status._id)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async patchCharacter(req: Request, res: Response) {
    try {
      // TODO сделать проверку полей
      const data = req.body as CharacterDtoMongoose

      const resp = await CharacterModel.findByIdAndUpdate(req.params.id, data)
      res.json(resp)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }
}

export default new CharacterService()
