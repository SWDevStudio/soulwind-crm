import Vue from "vue"
import Component from "nuxt-class-component"
// @ts-ignore
import { PhHeart, PhCookie, PhPaintBrush, PhUser, PhUserList, PhProhibit, PhUsers, PhSmileyXEyes, PhX } from "phosphor-vue";

@Component({
  name: "MixinIcon",
  components: {
    PhHeart,
    PhCookie,
    PhUser,
    PhUserList,
    PhProhibit,
    PhUsers,
    PhSmileyXEyes,
    PhX
  },
  provide: {
    color: "white",
    size: 24,
    weight:  "regular",
    mirrored: false
  }
})
export default class MixinIcon extends Vue {

}
