import { Alchemy } from "~/types/Alchemy"

export interface CharacterDto {
  firstName?: string
  lastName: string
  class?: string
  ap?: number
  awakeningAp?: number
  dp?: number
  partyId?: number
  alchemy: Alchemy[]
}
