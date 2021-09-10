import Cookies from "js-cookie"

export function getToken(): string | void {
  return Cookies.get("token")
}
