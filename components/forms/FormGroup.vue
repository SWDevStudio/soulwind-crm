<template>
  <v-card
    overlay-color="teal accent-4"
    overlay-opacity="0.1"
    @keydown.esc="closeModal"
  >
    <v-card-title :class="UI.actionColor.textClass">
      Создание группы
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
      <p v-if="serverErrorResponse" class="error--text text-sm-caption">
        {{ serverErrorResponse }}
      </p>
      <v-form ref="form" lazy-validation @submit="createGroup">
        <v-text-field
          v-model="form.name"
          :rules="[(value) => !!value || 'Name is required']"
          label="Имя группы"
          required
          :color="UI.actionColor.color"
        />

        <v-btn
          :color="UI.actionColor.color"
          block
          outlined
          large
          @click="createGroup"
        >
          Добавить группу
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component"
import { GroupDto } from "~/server/Group/dto/group.dto"
import MixinModal from "~/mixins/MixinModal.vue"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { GroupApi } from "~/api/group.api"

@Component({
  name: "FormGroup",
})
export default class FormGroup extends mixins(MixinModal, CharacterStoreMixin) {
  form: GroupDto = {
    name: "",
  }

  async createGroup(event: Event): Promise<void> {
    event.preventDefault()
    if (this.VForm.validate()) {
      const res = await this.$requestServer(GroupApi.create, {
        method: "post",
        data: this.form,
      }).catch(this.showError)
      if (res) {
        this.VForm.reset()
        this.closeModal()
      }
    }
  }
}
</script>
