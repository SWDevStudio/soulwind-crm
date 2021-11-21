<script lang="ts">
import Component from "nuxt-class-component"
import MixinMembership from "~/mixins/MixinMembership.vue"

@Component({
  name: "membership",
})
export default class Membership extends MixinMembership {
  constructor() {
    super()
    this.needCharacters = "getActiveCharacters"
  }
}
</script>

<style scoped></style>
