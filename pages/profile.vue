<template>
  <form-creation-character ref="characterForm" :static-mode="true" />
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import { Ref } from "nuxt-property-decorator"
import FormCreationCharacter from "~/components/forms/FormCreationCharacter.vue"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"

@Component({
  name: "Profile",
  components: { FormCreationCharacter },
})
export default class Profile extends CharacterStoreMixin {
  @Ref("characterForm") characterForm!: FormCreationCharacter
  id: string = "613d45515d56340fe0859e1f"



  async created() {
    await this.storeUpdateCharacters()
    const needCharacter = this.getActiveCharacters.find(i => i._id === this.id)
    if (needCharacter)
      this.characterForm.startEdit(needCharacter)
  }
}
</script>
