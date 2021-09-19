import { Request, Response } from "express"
import CharacterModel from "./dto/character.model"
import {
  CharacterDto,
  CharacterDTOResponse,
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
      const character: CharacterDTOResponse = await CharacterModel.findOne({
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

      const resp = await CharacterModel.findOneAndUpdate(
        { _id: req.params.id },
        data
      )
      res.json(resp)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  }

  async addGroupForCharacter(req: Request, res: Response) {
    const ids: string[] = req.body.characterIds
    const partyId: string = req.body.partyId
    if (!Array.isArray(ids)) res.status(400).json({message: 'ids error'})
    for (const i of ids) {
      await CharacterModel.findOneAndUpdate({_id: i}, {
        partyId
      }).catch(e => res.status(400).json({message: e}))
    }
    res.json({status: true})
  }
}

export default new CharacterService()
