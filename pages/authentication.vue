<template>
  <v-row justify="center" align-content="center" class="mt-10">
    <v-col sm="8" md="6" lg="4">
      <v-card>
        <v-tabs :color="UI.actionColor.color">
          <v-tab>Вход</v-tab>
          <v-tab>Регистрация</v-tab>
          <v-tab-item :transition="false" :reverse-transition="false">
            <v-container>
              <login />
            </v-container>
          </v-tab-item>
          <v-tab-item :transition="false" :reverse-transition="false">
            <v-container>
              <sign-in />
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Login from "~/components/forms/login"
import SignIn from "~/components/forms/signIn"
import { UI } from "~/data/UI"

export default {
  name: "Authentication",
  components: { SignIn, Login },
  layout: "empty",
  data: () => ({
    UI,
  }),
}
</script>

<style scoped></style>
