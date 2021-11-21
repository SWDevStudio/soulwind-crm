<template>
  <form-creation-character ref="characterForm" :static-mode="true" />
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import { Ref } from "nuxt-property-decorator"
import FormCreationCharacter from "~/components/forms/FormCreationCharacter.vue"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { CharacterApi } from "~/api/character.api"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"

@Component({
  name: "Profile",
  components: { FormCreationCharacter },
})
export default class Profile extends CharacterStoreMixin {
  @Ref("characterForm") characterForm!: FormCreationCharacter
  character: CharacterDTOResponse | null = null

  async loadCharacterInfo() {
    this.character = await this.$requestServer<CharacterDTOResponse | null>(
      CharacterApi.myInfo
    ).catch(() => null)
  }

  async created() {
    await this.loadCharacterInfo()
    if (this.character) {
      this.characterForm.startEdit(this.character)
    }
  }
}
</script>
