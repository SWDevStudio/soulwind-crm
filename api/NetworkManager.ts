import axios, { AxiosInstance } from "axios"
import { getToken } from "~/utils/Token"
export class NetworkManager {
  readonly $axios!: AxiosInstance
  constructor() {
    if (process.client) {
      this.$axios = axios.create({
        headers: {
          token: getToken() || "",
        },
      })
    }
  }

  defaultCatch(error: any) {
    console.error(error)
    return error.response
  }
}
