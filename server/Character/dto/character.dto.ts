import { Document } from "mongoose"
import { Alchemy } from "~/types/Alchemy"
import { CharacterClass } from "~/types/Character/CharacterClass"
import { Ranks } from "~/types/Ranks"
import { CharacterStatus } from "~/types/Character/CharacterStatus"
import { CharacterRangParty } from "~/types/Character/CharacterRangParty"

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
  status: CharacterStatus
  rangParty: CharacterRangParty
}

export interface CharacterDTOResponse extends CharacterDto, Document {}
