<template>
  <v-dialog
    :value="value"
    max-width="1200"
    overlay-color="teal accent-4"
    overlay-opacity="0.1"
    persistent
    @keydown.esc="closeModal"
  >
    <v-card @keydown.enter="sendForm">
      <v-card-title
        class="font-weight-regular d-flex justify-space-between"
        :class="UI.actionColor.textClass"
      >
        {{ editMode ? "Редактирование" : "Создание" }} персонажа
        <v-icon :color="UI.actionColor.color" @click="closeModal"
          >mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @submit="sendForm">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="form.lastName"
                label="Фамилия персонажа"
                :rules="rules"
                :color="UI.actionColor.color"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.firstName"
                label="Имя персонажа"
                :color="UI.actionColor.color"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.level"
                label="Уровень"
                :color="UI.actionColor.color"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.ap"
                label="Атака"
                :color="UI.actionColor.color"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.awakeningAp"
                label="Атака проб. оружием"
                :color="UI.actionColor.color"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.dp"
                label="Защита"
                :color="UI.actionColor.color"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                v-model="form.class"
                label="Класс"
                :color="UI.actionColor.color"
                :items="CHARACTER_CLASS"
              />
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="form.partyId"
                label="Группа"
                :color="UI.actionColor.color"
                :items="groups"
                item-text="name"
                item-value="_id"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="form.note"
                label="Заметка"
                :color="UI.actionColor.color"
                rows="1"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                :color="UI.actionColor.color"
                block
                outlined
                large
                class="mt-3 mb-4"
                :disabled="!valid"
                @click="sendForm"
                >{{ editMode ? "Редактировать" : "Добавить персонажа" }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import { Prop, Ref, State } from "nuxt-property-decorator"
import Vue from "vue"
import { CHARACTER_CLASS } from "~/server/Data/CHARACTER_CLASS"
import { UI } from "~/data/UI"
import { getToken } from "~/utils/Token"
import {
  CharacterDto,
  CharacterDTOResponse,
} from "~/server/Character/dto/character.dto"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"

@Component({
  name: "CharacterCreationForm",
})
export default class CharacterCreationForm extends Vue {
  @Ref("form") VForm!: any

  @Prop() value!: boolean

  @State((state) => state.global.groups) groups!: GroupDtoModel[]

  UI = UI
  valid: boolean = true
  editMode: boolean = false
  CHARACTER_CLASS = CHARACTER_CLASS
  rules = [(value: string) => !!value || "Заполни меня"]
  editId: null | string = null
  form: CharacterDto = {
    firstName: undefined,
    lastName: "",
    class: undefined,
    ap: undefined,
    awakeningAp: undefined,
    dp: undefined,
    partyId: undefined,
    alchemy: undefined,
    note: undefined,
    pvpRank: undefined,
    level: undefined,
    status: "ACTIVE",
    rangParty: undefined,
  }

  closeModal(): void {
    this.clearForm()
    this.editMode = false
    this.$emit("input", false)
  }

  sendForm(event: Event): void {
    event.preventDefault()
    console.log(event)
    this.editMode ? this.editCharacter() : this.createdCharacter()
  }

  async createdCharacter(): Promise<void> {
    const res = await this.$axios
      .post("/api/character", this.form, {
        headers: {
          token: getToken(),
        },
      })
      .catch((error) => error.response)

    this.closeModal()
  }

  async editCharacter(): Promise<void> {
    const res = await this.$axios
      .patch("/api/character/" + this.editId, this.form, {
        headers: {
          token: getToken(),
        },
      })
      .catch((error) => error.response)
    this.closeModal()
  }

  clearForm(): void {
    this.VForm.reset()
  }

  startEdit(character: CharacterDTOResponse) {
    if (character) {
      this.editId = character._id
      this.editMode = true
      this.form = {
        ...this.form,
        ...character,
      }
    }
  }
}
</script>

<style scoped></style>
