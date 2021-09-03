import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import CharacterApi from "~/api/CharacterApi"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"

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

  @Action
  async updateCharacter() {
    const res = await CharacterApi.loadCharacters(() => {})
    if (res) this.setCharacter(res)
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
