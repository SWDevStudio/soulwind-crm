import { Context, Inject, NuxtApp } from "@nuxt/types/app"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { getToken } from "~/utils/Token"
import { ErrorResponse } from "~/structs/ErrorResponse"
export type RequestServerFunc = <T = any>(
  url: string,
  options?: AxiosRequestConfig
) => Promise<T>
declare module "vue/types/vue" {
  interface Vue {
    $requestServer: RequestServerFunc
  }
}

declare module "@nuxt/types" {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $requestServer: RequestServerFunc
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $requestServer: RequestServerFunc
  }
}

declare module "vuex/types/index" {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $requestServer: RequestServerFunc
  }
}

export default (ctx: Context, inject: Inject) => {
  ctx?.$axios?.setHeader("token", getToken())
  ctx.$axios.onError((error) => {
    const info = error.response as AxiosResponse

    if (info?.status === 403) {
      return ctx.error({ statusCode: 403, message: info.data.message })
    }
    return error.response
  })

  inject("requestServer", async (url: string, options?: AxiosRequestConfig) => {
    const res = await ctx.$axios(url, options)
    if (res.status !== 200) {
      await Promise.reject(res)
    }
    return res.data
  })
}
