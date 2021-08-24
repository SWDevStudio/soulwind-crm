import { Document } from "mongoose"
import { Alchemy } from "~/types/Alchemy"
import { CharacterClass } from "~/types/CharacterClass"
import { Ranks } from "~/types/Ranks"

export interface CharacterDto {
  firstName?: string
  lastName: string
  class?: CharacterClass
  ap?: number
  awakeningAp?: number
  dp?: number
  partyId?: number
  alchemy?: Alchemy[]
  note?: string
  pvpRank?: Ranks
}

export interface CharacterDtoMongoose extends CharacterDto, Document {}
