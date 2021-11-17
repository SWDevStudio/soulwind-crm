import { Context, Inject, NuxtApp } from "@nuxt/types/app"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { getToken } from "~/utils/Token"
export type RequestServerFunc = (
  url: string,
  options?: AxiosRequestConfig
) => Promise<AxiosResponse>
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
  ctx.$axios.setHeader("token", getToken())
  ctx.$axios.onError((error) => {
    const info = error.response as AxiosResponse
    console.log(info.status)
    if (info?.status === 403) {
      return ctx.error({ statusCode: 403, message: info.data.message })
    }
    return error.response
  })

  inject("requestServer", (url: string, options?: AxiosRequestConfig) => {
    return ctx.$axios(url, options)
  })
}
