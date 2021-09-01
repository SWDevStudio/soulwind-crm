<template>
  <v-dialog
    :value="value"
    max-width="1200"
    overlay-color="teal accent-4"
    overlay-opacity="0.1"
    @click:outside="closeModal"
  >
    <v-card>
      <v-card-title class="font-weight-regular teal--text text--accent-3">
        Создание персонажа
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
                v-model="form.level"
                label="Уровень"
                color="teal accent-3"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="form.ap"
                label="Атака"
                color="teal accent-3"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="form.awakeningAp"
                label="Атака проб. оружием"
                color="teal accent-3"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="form.dp"
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
                @click="createdCharacter"
                >Добавить персонажа
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
    },
  }),
  methods: {
    closeModal() {
      this.$emit("input", false)
    },
    createdCharacter() {
      this.clearForm()
      this.closeModal()
    },
    clearForm() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped></style>
