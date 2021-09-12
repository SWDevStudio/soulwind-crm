import Cookies from "js-cookie"

export function getToken(): string {
  return localStorage.getItem("token") || ""
}
