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
        <v-select
          class="mt-2"
          :color="UI.actionColor.color"
          :items="getActiveCharacters.filter((i) => !i.partyId).filter(i => !form.deputyIds.includes(i._id))"
          item-text="lastName"
          item-value="_id"
          label="Пати лидер"
          v-model="form.groupLeaderId"
        />
        <v-select
          class="mt-2"
          :items="getActiveCharacters.filter((i) => !i.partyId).filter(i => i._id !== form.groupLeaderId)"
          item-text="lastName"
          label="Заместители"
          item-value="_id"
          v-model="form.deputyIds"
          multiple
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
import GroupApi from "~/api/GroupApi"
import MixinModal from "~/mixins/MixinModal.vue"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"

@Component({
  name: "FormGroup",
})
export default class FormGroup extends mixins(MixinModal, CharacterStoreMixin) {
  form: GroupDto = {
    name: "",
    groupLeaderId: null,
    deputyIds: []
  }

  async createGroup(event: Event): Promise<void> {
    event.preventDefault()
    if (this.VForm.validate()) {
      const res = await GroupApi.create(this.form, this.showError)
      if (res) {
        this.VForm.reset()
        this.closeModal()
      }
    }
  }
}
</script>
