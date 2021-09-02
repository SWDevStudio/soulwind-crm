import { PAGES } from "~/data/PAGES"

export function setToken(token: string): void {
  localStorage.token = token
}
export function getToken(): string | undefined {
  if (localStorage.token) {
    return localStorage.token
  } else if (window) {
    window.location.replace(PAGES.authentication)
  }
}
