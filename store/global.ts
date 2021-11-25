import { Module, Mutation, VuexModule, Action } from "vuex-module-decorators"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"
import { $requestServer } from "~/server/utils/api"
import { GroupApi } from "~/api/group.api"
import { PermissionResponse } from "~/server/Permission/dto/permission.dto"
import { PermissionApi } from "~/api/permission.api"

@Module({
  name: "global",
  namespaced: true,
  stateFactory: true,
})
export default class Global extends VuexModule {
  groups: GroupDtoModel[] = []
  userPermission: PermissionResponse | null | boolean = null

  @Mutation
  setGroups(value: GroupDtoModel[]) {
    this.groups = value || []
  }

  @Mutation
  setPermission(value: PermissionResponse | boolean) {
    if (value) {
      this.userPermission = value
    }
  }

  @Action
  async loadGlobalData() {
    const res = await $requestServer(GroupApi.load).catch((e) => {
      console.log(e.message, "vuex global/loadGlobalData")
    })

    if (res) {
      this.setGroups(res)
    }
  }

  @Action
  async updateGroups() {
    const res = await $requestServer(GroupApi.load).catch((e) => {
      console.log(e.message, "vuex global/updateGroups")
    })
    if (res) this.setGroups(res)
  }

  @Action({ commit: "setPermission" })
  async loadPermission(): Promise<PermissionResponse | boolean> {
    return await $requestServer(PermissionApi.myPermission).catch(() => false)
  }
}
