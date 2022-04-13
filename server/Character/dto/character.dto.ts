import { Document } from "mongoose"
import { Alchemy } from "~/types/Alchemy"
import { CharacterClass } from "~/types/Character/CharacterClass"
import { Ranks } from "~/types/Ranks"
import { CharacterStatus } from "~/types/Character/CharacterStatus"
import { CharacterRankParty } from "~/types/Character/CharacterRankParty"

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
  rankParty?: CharacterRankParty
  userId: string | null
  createdAt: number | null
  updatedAt: number | null
}

export interface CharacterDTOResponse extends CharacterDto, Document {}
