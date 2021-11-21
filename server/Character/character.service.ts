import createError from "http-errors"
import CharacterModel from "./dto/character.model"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"

class CharacterService {
  static async load(filter: any) {
    const character: CharacterDTOResponse | null = await CharacterModel.findOne(
      filter
    )
    if (!character)
      throw createError(400, `Персонажа c id ${filter._id} не существует`)
    return character
  }

  static async isTiedForUser(characterId: string) {
    const character: CharacterDTOResponse = await CharacterService.load({
      _id: characterId,
    })

    if (character.userId) {
      throw createError(
        400,
        `Персонаж уже привязан к пользователю ${character.userId}`
      )
    }

    return true
  }

  static addUserId(characterId: string, userId: string) {
    return CharacterModel.findOneAndUpdate(
      { _id: characterId },
      {
        userId,
      }
    )
  }

  static removeUserId(characterId: string) {
    return CharacterModel.findOneAndUpdate(
      { _id: characterId },
      {
        userId: null,
      }
    )
  }
}

export default CharacterService
