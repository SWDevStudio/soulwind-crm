import Vue from "vue"
import Component from "nuxt-class-component"
import Cookies from "js-cookie"
import { PAGES } from "~/data/PAGES"
import { getToken } from "~/utils/Token"
@Component({
  name: "MixinToken",
})
export default class MixinToken extends Vue {
  // TODO нужно продумать и сделать так что бы SSR не выдавал ошибок
  setToken(token: string): void {
    localStorage.setItem("token", token)
  }

  getToken(): string | void {
    const token = getToken()
    if (token) {
      return token
    } else {
      this.$router.push(PAGES.authentication)
    }
  }

  removeToken(): void {
    localStorage.removeItem("token")
    this.$router.push(PAGES.authentication)
  }
}
