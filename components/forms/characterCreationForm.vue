<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.firstName"
              label="Имя персонажа"
              :rules="rules"
              color="teal accent-3"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
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
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.ap"
              label="Атака"
              color="teal accent-3"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.awakeningAp"
              label="Атака проб. оружием"
              color="teal accent-3"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.dp"
              label="Защита"
              color="teal accent-3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.class"
              label="Класс"
              color="teal accent-3"
              :items="classItem"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.partyId"
              label="Группа"
              color="teal accent-3"
              :items="groupItem"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            color="teal accent-3"
            block
            outlined
            large
            class="mt-3 mb-4"
            :disabled="!valid"
            >Добавить персонажа
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "characterCreationForm",
  data: () => ({
    valid: true,
    classItem: [
      "Варвар",
      "Лучница",
      "Сорка",
      "Мистик",
      "Валькирия",
      "Воин",
      "Волшебник",
      "Волшебница",
      "Ронин",
      "Маэва",
      "Ниндзя",
      "Куноичи",
      "Темный рыцарь",
      "Страйкер",
      "Фурия",
      "Лан",
      "Лучник",
      "Шай",
      "Страж",
      "Хасашин",
      "Нова",
      "Мудрец",
      "Корсар",
    ],
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
}
</script>

<style scoped></style>
