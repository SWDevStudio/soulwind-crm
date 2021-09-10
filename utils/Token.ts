import Cookies from "js-cookie"
import { PAGES } from "~/data/PAGES"
// TODO нужно продумать и сделать так что бы SSR не выдавал ошибок
export function setToken(token: string): void {
  Cookies.set("token", token)
}
export function getToken(): string | void {
  const token = Cookies.get("token")
  if (token) {
    return token
  } else {
    // TODO может выдать ошибку window in undefined
    window && window?.$nuxt?.$router?.push(PAGES.authentication)
  }
}
export function removeToken(): void {
  Cookies.remove("token")
  window.$nuxt.$router.push(PAGES.authentication)
  // window.location.replace(PAGES.authentication)
}
