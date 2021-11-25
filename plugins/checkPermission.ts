import { Context, Inject } from "@nuxt/types/app"
import {
  PermissionArea,
  PermissionField,
} from "~/server/Data/PERMISSION_FIELDS"

type CheckPermissionFunction = (
  area: PermissionArea,
  field: PermissionField,
  isBtn?: boolean
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
  inject(
    "checkPermission",
    (area: PermissionArea, field: PermissionField, isBtn = false) => {
      const USER_PERMISSION = ctx.store.state.global.userPermission
      if (USER_PERMISSION === null) return isBtn
      if (typeof USER_PERMISSION === "boolean") {
        return isBtn ? !USER_PERMISSION : USER_PERMISSION
      }
      if (typeof USER_PERMISSION === "object") {
        return isBtn
          ? !USER_PERMISSION.fields[area][field]
          : USER_PERMISSION.fields[area][field]
      }
      return isBtn
    }
  )
}
