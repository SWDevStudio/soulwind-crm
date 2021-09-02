<template>
  <v-dialog
    :value="value"
    max-width="1200"
    overlay-color="teal accent-4"
    overlay-opacity="0.1"
    persistent
    @keydown.esc="closeModal"
  >
    <v-card>
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
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="form.firstName"
                label="Имя персонажа"
                :rules="rules"
                :color="UI.actionColor.color"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.lastName"
                label="Фамилия персонажа"
                :rules="rules"
                :color="UI.actionColor.color"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.level"
                label="Уровень"
                :color="UI.actionColor.color"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.ap"
                label="Атака"
                :color="UI.actionColor.color"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.awakeningAp"
                label="Атака проб. оружием"
                :color="UI.actionColor.color"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.dp"
                label="Защита"
                :color="UI.actionColor.color"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                v-model="form.class"
                label="Класс"
                :color="UI.actionColor.color"
                :items="CHARACTER_CLASS"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="form.partyId"
                label="Группа"
                :color="UI.actionColor.color"
                :items="groupItem"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="form.note"
                label="Заметка"
                :color="UI.actionColor.color"
                rows="1"
              ></v-textarea>
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
                @click="editMode ? editCharacter() : createdCharacter()"
                >{{ editMode ? "Редактировать" : "Добавить персонажа" }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { CHARACTER_CLASS } from "~/server/Data/CHARACTER_CLASS"
import { UI } from "~/data/UI"

export default {
  name: "CharacterCreationForm",
  props: {
    value: {
      type: Boolean,
    },
  },
  data: () => ({
    UI,
    valid: true,
    editMode: false,
    CHARACTER_CLASS,
    groupItem: ["Bar", "Fizz"],
    rules: [(value) => !!value || "Заполни меня"],
    form: {
      firstName: "",
      lastName: "",
      class: "",
      ap: "",
      awakeningAp: "",
      dp: "",
      partyId: "",
      alchemy: "",
      note: "",
      pvpRank: "",
      level: "",
      _id: null,
    },
  }),
  methods: {
    closeModal() {
      this.clearForm()
      this.editMode = false
      this.$emit("input", false)
    },
    async createdCharacter() {
      const res = await this.$axios
        .post("/api/character", this.form, {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjAyNjA1YjAyMjE2NGFiY2NlMjk1MiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYzMDUxMTQyNCwiZXhwIjoxNjMwNTk3ODI0fQ.TEaOBRCd7FK2klmpdtXWGRauknZmvAl4JZ0sAaADVEo",
          },
        })
        .catch((error) => error.response)

      this.closeModal()
    },
    async editCharacter() {
      const res = await this.$axios
        .patch("/api/character/" + this.form._id, this.form, {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjAyNjA1YjAyMjE2NGFiY2NlMjk1MiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYzMDUxMTQyNCwiZXhwIjoxNjMwNTk3ODI0fQ.TEaOBRCd7FK2klmpdtXWGRauknZmvAl4JZ0sAaADVEo",
          },
        })
        .catch((error) => error.response)
      this.closeModal()
    },
    clearForm() {
      this.$refs.form.reset()
    },
    startEdit(character) {
      if (character) {
        this.editMode = true
        this.form = {
          ...this.form,
          ...character,
        }
      }
    },
  },
}
</script>

<style scoped></style>
