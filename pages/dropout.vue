<script lang="ts">
import Component from "nuxt-class-component"
import MixinMembership from "~/mixins/MixinMembership.vue"

@Component({
  name: "dropout",
})
export default class dropout extends MixinMembership {
  constructor() {
    super()
    this.needCharacters = "getDismissedCharacters"
    this.modeDismissModal = "recovery"
  }
}
</script>
