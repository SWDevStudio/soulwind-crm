<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="form.email"
      label="e-mail"
      :rules="emailRules"
      :color="UI.actionColor.color"
      type="email"
      required
    />
    <v-text-field
      v-model="form.password"
      label="password"
      :rules="passwordRules"
      :color="UI.actionColor.color"
      required
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
    />
    <p v-if="serverErrorResponse" class="error--text text-sm-caption">
      {{ serverErrorResponse }}
    </p>
    <v-btn
      :color="UI.actionColor.color"
      outlined
      large
      block
      class="mt-3 mb-2"
      :disabled="!valid"
      @click="sendForm"
    >
      Войти
    </v-btn>
  </v-form>
</template>

<script>
import { PAGES } from "~/data/PAGES"
import MixinToken from "~/mixins/MixinToken"
import { UI } from "~/data/UI"

export default {
  name: "Login",
  mixins: [MixinToken],
  data: () => ({
    valid: true,
    show: false,
    serverErrorResponse: "",
    UI,
    emailRules: [
      (value) => !!value || "Email is required",
      (value) => /.+@.+\..+/.test(value) || "Email must be valid",
    ],
    passwordRules: [(value) => !!value || "Password is required"],
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async sendForm() {
      if (this.$refs.form.validate()) {
        const response = await this.$axios
          .post("/api/user/login", this.form)
          .catch((e) => e.response)
        if (response.status === 200) {
          console.log(response.data?.token, "token")
          this.setToken(response.data?.token)
          console.log(this.getToken(), "get token")
          // TODO Костыль который позволяет перезагрузить страницу и изменить headers в NetworkManager
          window.location.replace(PAGES.root)
          // await this.$router.push(PAGES.root)
        } else {
          this.serverErrorResponse = response.data.message
        }
      }
    },
  },
}
</script>

<style scoped></style>
