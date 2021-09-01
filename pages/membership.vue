<template>
  <v-row justify="center" align-content="center" class="mt-10">
    <v-btn fab outlined large color="teal accent-3" @click="overlay = !overlay">
      <v-icon dark> mdi-plus</v-icon>
    </v-btn>
    <character-creation-form v-model="overlay" />
  </v-row>
</template>

<script>
import CharacterCreationForm from "~/components/forms/characterCreationForm"

export default {
  name: "modal",
  components: { CharacterCreationForm },
  data: () => ({
    overlay: false,
  }),
}
</script>

<style scoped></style>
