import axios, { AxiosInstance, AxiosResponse } from "axios"
import { getToken } from "~/utils/Token"
import { PAGES } from "~/data/PAGES"
export class NetworkManager {
  readonly $axios!: AxiosInstance
  constructor() {
    if (process.client) {
      this.$axios = axios.create({
        baseURL: "/",
        headers: {
          // TODO Получает токен 1 раз при загрузке страницы, нужно сделать так что бы получал его постоянно если он изменится
          token: getToken() || "",
        },
      })
    }
  }

  defaultCatch(error: any) {
    const info = error.response as AxiosResponse
    if (info?.status === 403) {
      window.$nuxt.error({ statusCode: 403 })
    }
    return error.response
  }
}
