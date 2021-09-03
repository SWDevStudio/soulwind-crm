<template>
  <div></div>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { Action, State } from "nuxt-property-decorator"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"

@Component({
  name: "GlobalStoreMixin",
})
export default class GlobalStoreMixin extends Vue {
  @State((state) => state.global.groups) storeGroups!: GroupDtoModel[]
  @Action("global/updateGroups") actionUpdateGroup!: () => Promise<void>
}
</script>
