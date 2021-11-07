import Vue from "vue"
import { Context, Inject, NuxtApp } from "@nuxt/types/app"
import { AxiosRequestConfig, AxiosResponse } from "axios"
type RequestServerFunc = (
  url: string,
  options: AxiosRequestConfig
) => Promise<any>
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
  ctx.$axios.onError((error) => {
    const info = error.response as AxiosResponse
    if (info?.status === 403) {
      ctx.error({ statusCode: 403 })
    }
    return error.response
  })

  inject("requestServer", (url: string, options: AxiosRequestConfig) => {
    return ctx.$axios(url, options)
  })
}
