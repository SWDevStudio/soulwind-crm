<template>
  <div></div>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { Action, State } from "nuxt-property-decorator"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"
import { PermissionResponse } from "~/server/Permission/dto/permission.dto"

@Component({
  name: "GlobalStoreMixin",
})
export default class GlobalStoreMixin extends Vue {
  @State((state) => state.global.groups) storeGroups!: GroupDtoModel[]
  @State((state) => state.global.userPermission) USER_PERMISSION!:
    | PermissionResponse
    | boolean

  @Action("global/updateGroups") actionUpdateGroup!: () => Promise<void>
  @Action("global/loadPermission") loadPermission!: () => Promise<
    PermissionResponse | boolean
  >
}
</script>
