<template>
  <v-card
    overlay-color="teal accent-4"
    overlay-opacity="0.1"
    @keydown.esc="closeModal"
  >
    <v-card-title :class="UI.actionColor.textClass">
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
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.name"
              :rules="[(value) => !!value || 'Name is required']"
              label="Имя группы"
              required
              :color="UI.actionColor.color"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :color="UI.actionColor.color"
              block
              outlined
              large
              @click="createGroup"
            >
              Добавить группу
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { Ref } from "nuxt-property-decorator"
import { UI } from "~/data/UI"
import { GroupDto, GroupDtoModel } from "~/server/Group/dto/group.dto"
import GroupApi from "~/api/GroupApi"

@Component({
  name: "FormGroup",
})
export default class FormGroup extends Vue {
  UI = UI
  form: GroupDto = {
    name: "",
  }

  serverErrorResponse: string = ""

  @Ref("form") Form!: any

  closeModal() {
    this.$emit("input", false)
  }

  async createGroup(event: Event): Promise<void> {
    event.preventDefault()
    if (this.Form.validate()) {
      const res = await GroupApi.create(this.form, (res) => {
        this.serverErrorResponse = res.data.message
      })
      if (res) {
        this.closeModal()
      }
    }
  }
}
</script>
