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
        class="
          font-weight-regular
          teal--text
          text--accent-3
          d-flex
          justify-space-between
        "
      >
        {{ editMode ? "Редактирование" : "Создание" }} персонажа
        <v-icon color="teal accent-3" @click="closeModal">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="form.firstName"
                label="Имя персонажа"
                :rules="rules"
                color="teal accent-3"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.lastName"
                label="Фамилия персонажа"
                :rules="rules"
                color="teal accent-3"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.level"
                label="Уровень"
                color="teal accent-3"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.ap"
                label="Атака"
                color="teal accent-3"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.awakeningAp"
                label="Атака проб. оружием"
                color="teal accent-3"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="form.dp"
                label="Защита"
                color="teal accent-3"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                v-model="form.class"
                label="Класс"
                color="teal accent-3"
                :items="CHARACTER_CLASS"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="form.partyId"
                label="Группа"
                color="teal accent-3"
                :items="groupItem"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="form.note"
                label="Заметка"
                color="teal accent-3"
                rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                color="teal accent-3"
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

export default {
  name: "CharacterCreationForm",
  props: {
    value: {
      type: Boolean,
    },
  },
  data: () => ({
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
