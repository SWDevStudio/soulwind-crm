<template>
  <div></div>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { Ref } from "nuxt-property-decorator"
import { AxiosResponse } from "axios"
import { VForm } from "~/structs/vuetify/VForm"
import { ErrorResponse } from "~/structs/ErrorResponse"

@Component({
  name: "MixinModal",
})
export default class MixinModal extends Vue {
  UI = UI
  serverErrorResponse: string = ""

  @Ref("form") Form!: VForm

  closeModal() {
    this.$emit("input", false)
  }

  showError(info: AxiosResponse<ErrorResponse>) {
    this.serverErrorResponse = info.data.message
  }
}
</script>
