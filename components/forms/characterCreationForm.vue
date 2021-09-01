<template>
  <v-dialog :value="value" max-width="1200" @click:outside="closeModal">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
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
          <v-col cols="4">
            <v-text-field
              v-model="form.ap"
              label="Атака"
              color="teal accent-3"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="form.awakeningAp"
              label="Атака проб. оружием"
              color="teal accent-3"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="form.dp"
              label="Защита"
              color="teal accent-3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="form.class"
              label="Класс"
              color="teal accent-3"
              :items="CHARACTER_CLASS"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="form.partyId"
              label="Группа"
              color="teal accent-3"
              :items="groupItem"
            ></v-select>
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
              >Добавить персонажа
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-dialog>
</template>

<script>
import { CHARACTER_CLASS } from "~/server/Data/CHARACTER_CLASS"

export default {
  name: "characterCreationForm",
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
    },
  }),
  methods: {
    closeModal() {
      this.$emit("input", false)
    },
  },
}
</script>

<style scoped></style>
