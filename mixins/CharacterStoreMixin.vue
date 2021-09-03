<template>
  <div></div>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { Action, Getter } from "nuxt-property-decorator"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"

@Component({
  name: "CharacterStoreMixin",
})
export default class CharacterStoreMixin extends Vue {
  @Action("characters/updateCharacter")
  storeUpdateCharacters!: () => Promise<void>

  @Getter("characters/activeCharacters")
  getActiveCharacters!: CharacterDTOResponse[]

  @Getter("characters/dismissedCharacters")
  getDismissedCharacters!: CharacterDTOResponse[]

  @Getter("characters/blackListCharacters")
  getBlackListCharacters!: CharacterDTOResponse[]
}
</script>
