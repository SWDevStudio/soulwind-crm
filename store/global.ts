import { GroupDtoModel } from "~/server/Group/dto/group.dto"
import GroupApi from "~/api/GroupApi"
import { GlobalStructState } from "~/structs/store/global.struct"

export const state = (): GlobalStructState => ({
  groups: [],
})
export const getters = {}
export const mutations = {
  setGroups(state: any, value: GroupDtoModel[]) {
    state.groups = value || []
  },
}
export const actions = {
  async loadGlobalData(ctx: any) {
    const res = await GroupApi.loadGroups((res) => {
      console.error(res.data.message, "vuex global/loadGlobalData")
    })
    if (res) {
      ctx.commit("setGroups", res)
    }
  },
  async updateGroups(ctx: any) {
    const res = await GroupApi.loadGroups((res) => {
      console.error(res.data.message, "vuex global/updateGroups")
    })
    if (res) ctx.commit("setGroups", res)
  },
}
