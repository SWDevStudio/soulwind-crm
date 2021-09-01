<template>
  <v-row justify="center" align-content="center" class="mt-2">
    <v-col>
      <v-row>
        <v-col cols="2">
          <v-autocomplete
            v-model="form.partyId"
            label="Группа"
            color="teal accent-3"
            :items="groupItem"
          ></v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field
            color="teal accent-3"
            label="Поиск"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="7" class="d-flex">
          <v-btn
            fab
            outlined
            large
            class="ml-auto"
            color="teal accent-3"
            @click="modal = !modal"
          >
            <v-icon dark> mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row> </v-row>
    </v-col>

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
  }),
}
</script>

<style scoped></style>
