import { Module, Mutation, VuexModule, Action } from "vuex-module-decorators"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"
import GroupApi from "~/api/GroupApi"

@Module({
  name: "global",
  namespaced: true,
  stateFactory: true,
})
export default class Global extends VuexModule {
  groups: GroupDtoModel[] = []

  @Mutation
  setGroups(value: GroupDtoModel[]) {
    this.groups = value || []
  }

  @Action
  async loadGlobalData() {
    const res = await GroupApi.loadGroups((res) => {
      console.error(res.data.message, "vuex global/loadGlobalData")
    })
    if (res) {
      this.setGroups(res)
    }
  }

  @Action
  async updateGroups() {
    const res = await GroupApi.loadGroups((res) => {
      console.error(res.data.message, "vuex global/updateGroups")
    })
    if (res) this.setGroups(res)
  }
}
