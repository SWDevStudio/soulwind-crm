<template>
  <v-row justify="center" align-content="center" class="mt-10">
    <v-card>
      <v-row>
        <v-btn
          class="mx-2"
          fab
          dark
          outlined
          large
          elevation="2"
          color="teal accent-3"
          @click="overlay = !overlay"
        >
          <v-icon dark> mdi-plus</v-icon>
        </v-btn>
        <v-overlay :value="overlay">
          <character-creation-form />
        </v-overlay>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import CharacterCreationForm from "~/components/forms/characterCreationForm"

export default {
  name: "modal",
  components: { CharacterCreationForm },
  data: () => ({
    overlay: true,
  }),
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false
        }, 2000)
    },
  },
}
</script>

<style scoped></style>
