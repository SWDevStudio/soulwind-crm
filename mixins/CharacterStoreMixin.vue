<template>
  <div></div>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { Action, Getter } from "nuxt-property-decorator"

@Component({
  name: "CharacterStoreMixin",
})
export default class CharacterStoreMixin extends Vue {
  @Action("characters/updateCharacter")
  storeUpdateCharacters: Function<Promise<void>>

  @Getter("characters/activeCharacters") getActiveCharacters
  @Getter("characters/dismissedCharacters") getDismissedCharacters
  @Getter("characters/blackListCharacters") getBlackListCharacters
}
</script>
