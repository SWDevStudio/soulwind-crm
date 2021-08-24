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
      const status = await CharacterModel.create(data)
      // TODO сделать проверку на созданного персонажа по фамилии если таковой есть вернуть его
      res.json(status._id)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  patchCharacter(req: Request, res: Response) {
    try {
      // TODO сделать проверку полей
      const data = req.body as CharacterDtoMongoose

      res.json("11")
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }
}

export default new CharacterService()
