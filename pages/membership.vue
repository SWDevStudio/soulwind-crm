<template>
  <v-row justify="center" class="mt-2 pb-2">
    <v-card width="100%">
      <v-card-title>
        <v-row align="center">
          <v-col cols="2">
            <v-autocomplete
              v-model="form.partyId"
              label="Группа"
              :color="UI.actionColor.color"
              clearable
              :items="groupItem"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="form.search"
              :color="UI.actionColor.color"
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
              :color="UI.actionColor.color"
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
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <character-creation-form ref="characterForm" v-model="modal" />
  </v-row>
</template>

<script>
import CharacterCreationForm from "~/components/forms/CharacterCreationForm"
import { getToken } from "~/utils/Token"
import { UI } from "~/data/UI"
import { HEADER_CHARACTER } from "~/data/headers/HEADER_CHARACTER"

export default {
  name: "Modal",
  components: { CharacterCreationForm },
  data: () => ({
    modal: false,
    UI,
    groupItem: ["Bar", "Fizz"],
    form: {
      search: "",
      partyId: "",
    },
    headers: HEADER_CHARACTER,
    characters: [],
  }),
  // TODO данный метод обновления таблицы не оптимален (в запоросе приходит нужный измененный объект)
  watch: {
    modal(val) {
      if (!val) {
        this.loadCharacters()
      }
    },
  },
  created() {
    this.loadCharacters()
  },
  methods: {
    async loadCharacters() {
      const res = await this.$axios
        .get("/api/character", {
          headers: {
            token: getToken(),
          },
        })
        .catch((e) => e.response)
      if (res?.status === 200) {
        this.characters = res.data
      }
    },
    editItem(item) {
      console.log(item, "123")
      this.editedIndex = this.characters.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$refs.characterForm.startEdit(item)
      this.modal = true
    },
  },
}
</script>

<style scoped></style>
