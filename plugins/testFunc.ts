import Vue from "vue"
import { Context, Inject, NuxtApp } from "@nuxt/types/app"

declare module "vue/types/vue" {
  interface Vue {
    $testFunc(): void
  }
}

declare module "@nuxt/types" {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $testFunc(): void
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $testFunc(): void
  }
}

declare module "vuex/types/index" {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $testFunc(): void
  }
}

export default (ctx: Context, inject: Inject) => {
  ctx.$axios.onError((error) => {
    console.log(error)
    ctx.redirect("http://google.com")
  })
  inject("testFunc", () => {
    console.log("hello world")
  })
}
