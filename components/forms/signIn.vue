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
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
    />
    <v-text-field
      v-model="form.repeatPass"
      label="repeat the password"
      :rules="repeatPasswordRules"
      :color="UI.actionColor.color"
      required
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2"
    />
    <v-select
      v-model="form.characterId"
      :items="freeCharacters"
      label="select your character"
      item-text="lastName"
      item-value="_id"
    />
    <p v-if="notCorrectPass" class="error--text text-sm-caption">
      {{ notCorrectPass }}
    </p>
    <v-btn
      :color="UI.actionColor.color"
      outlined
      large
      block
      class="mt-3 mb-2"
      :disabled="!valid"
      @click="comparePass"
    >
      Зарегистрироваться
    </v-btn>
  </v-form>
</template>

<script>
import MixinToken from "~/mixins/MixinToken"
import { UI } from "~/data/UI"
import { CharacterApi } from "~/api/character.api"
export default {
  name: "SignIn",
  mixins: [MixinToken],
  data: () => ({
    UI,
    valid: true,
    show1: false,
    show2: false,
    notCorrectPass: "",
    emailRules: [
      (value) => !!value || "Email is required",
      (value) => /.+@.+\..+/.test(value) || "Email must be valid",
    ],
    passwordRules: [(value) => !!value || "Password is required"],
    repeatPasswordRules: [(value) => !!value || "Password is required"],
    form: {
      email: "",
      password: "",
      repeatPass: "",
      characterId: "",
    },
    characters: [],
  }),
  computed: {
    freeCharacters() {
      return this.characters.filter((i) => !i.userId)
    },
  },
  async created() {
    this.characters = await this.$requestServer(
      CharacterApi.loadGeneralInfo,
      {}
    ).catch(() => [])
  },
  methods: {
    async comparePass() {
      if (this.form.password === this.form.repeatPass) {
        const registerResponse = await this.$axios
          .post("/api/user/register", {
            email: this.form.email,
            password: this.form.password,
            characterId: this.form.characterId,
          })
          .catch((e) => e.response)
        if (registerResponse.status === 200) {
          alert(
            "Регистрация прошла успешно, ожидайте подтверждения от администратора"
          )
          window.location.reload()
        }
      } else {
        this.notCorrectPass = "Пароли не совпадают"
      }
    },
  },
}
</script>

<style scoped></style>
