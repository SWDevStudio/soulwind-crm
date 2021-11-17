import {
  Action,
  Module,
  Mutation,
  MutationAction,
  VuexModule,
} from "vuex-module-decorators"
import { CharacterApi } from "~/api/character.api"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import { $requestServer } from "~/server/utils/api"
import { ErrorResponse } from "~/structs/ErrorResponse"

@Module({
  name: "characters",
  namespaced: true,
  stateFactory: true,
})
export default class Characters extends VuexModule {
  characters: CharacterDTOResponse[] = []

  @Mutation
  setCharacter(val: CharacterDTOResponse[]) {
    this.characters = val || []
  }

  @Action({ rawError: true, commit: "setCharacter" })
  async updateCharacter() {
    return await $requestServer<CharacterDTOResponse[]>(
      CharacterApi.loadCharacters
    ).catch(() => [])
  }

  get activeCharacters(): CharacterDTOResponse[] {
    return this.characters.filter((i) => i.status === "ACTIVE")
  }

  get dismissedCharacters(): CharacterDTOResponse[] {
    return this.characters.filter((i) => i.status === "DISMISSED")
  }

  get blackListCharacters(): CharacterDTOResponse[] {
    return this.characters.filter((i) => i.status === "BLACK_LIST")
  }
}
