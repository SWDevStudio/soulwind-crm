<template>
  <v-row justify="center" class="mt-2 pb-2">
    <v-card width="100%">
      <v-card-title>
        <v-row align="center">
          <v-col cols="2">
            <v-autocomplete
              v-model="form.partyId"
              label="Группа"
              color="teal accent-3"
              clearable
              :items="groupItem"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="form.search"
              color="teal accent-3"
              label="Поиск"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="7" class="d-flex">
            <v-btn
              fab
              outlined
              class="ml-auto"
              color="teal accent-3"
              @click="modal = !modal"
            >
              <v-icon dark> mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="characters"
        :search="form.search"
        disable-pagination
        hide-default-footer
      ></v-data-table>
    </v-card>
    <character-creation-form v-model="modal" />
  </v-row>
</template>

<script>
import CharacterCreationForm from "~/components/forms/CharacterCreationForm"

export default {
  name: "Modal",
  components: { CharacterCreationForm },
  data: () => ({
    modal: false,
    groupItem: ["Bar", "Fizz"],
    form: {
      search: "",
      partyId: "",
    },
    headers: [
      { text: "Фамилия", value: "lastName" },
      { text: "Класс", value: "class" },
      { text: "Уровень", value: "level" },
      { text: "Атака", value: "ap" },
      { text: "Атака П.", value: "awakeningAp" },
      { text: "Защита", value: "dp" },
      { text: "pvp skill", value: "pvpRank" },
    ],
    characters: [
      {
        firstName: "string",
        lastName: "string",
        class: "Варвар",
        ap: 0,
        awakeningAp: 0,
        dp: 0,
        partyId: 0,
        alchemy: ["string"],
        note: "string",
        pvpRank: "string",
        _id: "string",
        __v: 0,
      },
    ],
  }),
  async created() {
    await this.$axios.get("/api/character", {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjAyNjA1YjAyMjE2NGFiY2NlMjk1MiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYzMDUxMTQyNCwiZXhwIjoxNjMwNTk3ODI0fQ.TEaOBRCd7FK2klmpdtXWGRauknZmvAl4JZ0sAaADVEo",
      },
    })
  },
}
</script>

<style scoped></style>
