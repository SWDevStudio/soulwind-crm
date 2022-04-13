<template>
  <v-card @keydown.enter="sendForm" @keydown.esc="closeModal">
    <v-card-title
      v-if="!staticMode"
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
              :item-color="UI.actionColor.color"
              :disabled="!itEdit"
              required
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.firstName"
              label="Имя персонажа"
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :disabled="!itEdit"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model.number="form.level"
              label="Уровень"
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :disabled="!itEdit"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model.number="form.ap"
              label="Атака"
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :disabled="!itEdit"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model.number="form.awakeningAp"
              label="Атака проб. оружием"
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :disabled="!itEdit"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model.number="form.dp"
              label="Защита"
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :disabled="!itEdit"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-autocomplete
              v-model="form.class"
              label="Класс"
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :items="CHARACTER_CLASS"
              :disabled="!itEdit"
            />
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="form.partyId"
              label="Группа"
              clearable
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :items="groups"
              item-text="name"
              item-value="_id"
              :disabled="staticMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-autocomplete
              v-model="form.rankParty"
              label="Ранг в пати"
              clearable
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :items="RANK_PARTY"
              :disabled="staticMode"
            />
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="form.pvpRank"
              label="PVP ранг"
              :color="UI.actionColor.color"
              :item-color="UI.actionColor.color"
              :items="PVP_RANK"
              item-text="name"
              item-value="_id"
              :disabled="staticMode"
            />
          </v-col>
        </v-row>
        <v-row v-if="!staticMode">
          <v-col>
            <v-textarea
              v-model="form.note"
              label="Заметка"
              :color="UI.actionColor.color"
              rows="1"
            />
          </v-col>
        </v-row>
        <v-row v-if="editMode">
          <v-col>
            <div>
              Был создан: {{ time.createdAt }}
            </div>
            <div v-if="time.createdAt !== time.updatedAt">
              Был восстановлен в гильдии: {{ time.updatedAt }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              v-if="!itEdit"
              :color="UI.actionColor.color"
              block
              outlined
              large
              class="mt-3 mb-4"
              :disabled="!valid"
              @click="itEdit = true"
              >Редактировать
            </v-btn>
            <v-btn
              v-else
              :color="UI.actionColor.color"
              block
              outlined
              large
              class="mt-3 mb-4"
              :disabled="!valid"
              @click="sendForm"
              >{{
                staticMode
                  ? "Сохранить изменения"
                  : editMode
                  ? "Редактировать"
                  : "Добавить персонажа"
              }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import { Prop, Ref, State } from "nuxt-property-decorator"
import Vue from "vue"
import moment from "moment/moment";
import { CHARACTER_CLASS } from "~/server/Data/CHARACTER_CLASS"
import { RANK_PARTY } from "~/data/RANK_PARTY"
import { UI } from "~/data/UI"
import { getToken } from "~/utils/Token"
import {
  CharacterDto,
  CharacterDTOResponse,
} from "~/server/Character/dto/character.dto"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"
import { PVP_RANK } from "~/data/PVP_RANK"
import {Types} from "~/types";

@Component({
  name: "CharacterCreationForm",
})
export default class CharacterCreationForm extends Vue {
  @Ref("form") VForm!: any

  @State((state) => state.global.groups) groups!: GroupDtoModel[]

  UI = UI
  valid: boolean = true
  editMode: boolean = false
  itEdit: boolean = false
  @Prop({ default: false }) staticMode!: boolean
  CHARACTER_CLASS = CHARACTER_CLASS
  RANK_PARTY = RANK_PARTY
  PVP_RANK = PVP_RANK
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
    rankParty: undefined,
    userId: null,
    createdAt: null,
    updatedAt: null
  }

  get time() {
    return {
      createdAt: moment((this.form.createdAt || 0) * 1000).format(Types.DEFAULT_FORMAT_DATE),
      updatedAt:  moment((this.form.updatedAt || 0) * 1000).format(Types.DEFAULT_FORMAT_DATE)
    }
  }

  created() {
    if (this.staticMode) {
      this.editMode = true
    } else {
      this.itEdit = true
    }
  }

  closeModal(): void {
    if (!this.staticMode) {
      this.clearForm()
      this.editMode = false
    } else {
      this.itEdit = false
    }
    this.$emit("input", false)
  }

  sendForm(event: Event): void {
    event.preventDefault()
    console.log(event)
    this.editMode ? this.editCharacter() : this.createdCharacter()
  }

  async createdCharacter(): Promise<void> {
    const form: CharacterDto = JSON.parse(JSON.stringify(this.form))
    form.createdAt = moment().unix()
    form.updatedAt = moment().unix()
    console.log(form)
    const res = await this.$axios
      .post("/api/character", form, {
        headers: {
          token: getToken(),
        },
      })
      .catch((error) => error.response)

    this.closeModal()
  }

  async editCharacter(): Promise<void> {
    if (this.staticMode) {
      const res = await this.$axios
        .patch("/api/character/profile", this.form, {
          headers: {
            token: getToken(),
          },
        })
        .catch((error) => error.response)
      this.itEdit = false
      return
    }
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
