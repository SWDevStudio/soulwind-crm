<template>
  <v-card @keydown.esc="closeModal">
    <v-card-title>
      Создать группу прав
      <v-icon
        :color="UI.actionColor.color"
        class="ml-auto"
        style="cursor: pointer"
        @click="closeModal"
      >
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-text>
      <v-form @submit="sendForm">
        <v-text-field
          v-model="form.name"
          label="Имя группы"
          :color="UI.actionColor.color"
        />
        <v-btn
          :color="UI.actionColor.color"
          block
          outlined
          large
          @click="sendForm"
        >
          создать
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component"
import MixinModal from "~/mixins/MixinModal.vue"
import { PermissionApi } from "~/api/permission.api"

@Component({
  name: "FormPermissionGroup",
})
export default class FormPermissionGroup extends mixins<MixinModal>(
  MixinModal
) {
  form: { name: string } = { name: "" }
  async sendForm(e: Event) {
    e.preventDefault()
    const res = await this.$requestServer(PermissionApi.createGroup, {
      method: "post",
      data: this.form,
    })
    this.closeModal()
  }
}
</script>
