<script lang="ts">
import Component from "nuxt-class-component"
import MixinMembership from "~/mixins/MixinMembership.vue"
@Component({
  name: "BlackList",
})
export default class BlackList extends MixinMembership {
  constructor() {
    super()
    this.modeDismissModal = "recovery"
    this.needCharacters = "getBlackListCharacters"
  }
}
</script>
