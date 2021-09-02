import { Document } from "mongoose"
import { Alchemy } from "~/types/Alchemy"
import { CharacterClass } from "~/types/CharacterClass"
import { Ranks } from "~/types/Ranks"
import { UserStatus } from "~/types/UserStatus"

export interface CharacterDto {
  firstName?: string
  lastName: string
  class?: CharacterClass
  ap?: number
  awakeningAp?: number
  dp?: number
  partyId?: string
  alchemy?: Alchemy[]
  note?: string
  pvpRank?: Ranks
  level?: number
  status: UserStatus
}

export interface CharacterDTOResponse extends CharacterDto, Document {}
