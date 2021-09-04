<script lang="ts">
import Component from "nuxt-class-component"
import { Ref, State, Watch } from "nuxt-property-decorator"
import { UI } from "~/data/UI"
import { HEADER_CHARACTER } from "~/data/headers/HEADER_CHARACTER"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import CharacterCreationForm from "~/components/forms/CharacterCreationForm.vue"
import FormDismissCharacter from "~/components/forms/FormDismissCharacter.vue"
import MixinMembership from "~/mixins/MixinMembership.vue"

@Component({
  name: "membership",
  components: { FormDismissCharacter, CharacterCreationForm },
})
export default class Membership extends MixinMembership {
  constructor() {
    super()
    this.needCharacters = "getActiveCharacters"
  }
}
</script>

<style scoped></style>
