import { Context, Inject } from "@nuxt/types/app"
import {
  PermissionArea,
  PermissionField,
} from "~/server/Data/PERMISSION_FIELDS"

type CheckPermissionFunction = (
  area: PermissionArea,
  field: PermissionField
) => boolean
declare module "vue/types/vue" {
  interface Vue {
    $checkPermission: CheckPermissionFunction
  }
}

declare module "@nuxt/types" {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $checkPermission: CheckPermissionFunction
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $checkPermission: CheckPermissionFunction
  }
}

declare module "vuex/types/index" {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $checkPermission: CheckPermissionFunction
  }
}

export default (ctx: Context, inject: Inject) => {
  inject("checkPermission", (area: PermissionArea, field: PermissionField) => {
    const USER_PERMISSION = ctx.store.state.global.userPermission
    if (USER_PERMISSION === null) return false
    if (typeof USER_PERMISSION === "boolean") {
      return USER_PERMISSION
    }
    if (typeof USER_PERMISSION === "object") {
      return USER_PERMISSION.fields[area][field]
    }
    return false
  })
}
