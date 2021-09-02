import Cookies from "js-cookie"
import { PAGES } from "~/data/PAGES"
// TODO нужно продумать и сделать так что бы SSR не выдавал ошибок
export function setToken(token: string): void {
  Cookies.set("token", token)
}
export function getToken(): string | undefined {
  const token = Cookies.get("token")
  if (token) {
    return token
  } else if (process.client && window) {
    window.location.replace(PAGES.authentication)
  }
}
