<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="form.email"
      label="e-mail"
      :rules="emailRules"
      color="teal accent-3"
      type="email"
      required
    />
    <v-text-field
      v-model="form.password"
      label="password"
      :rules="passwordRules"
      color="teal accent-3"
      type="password"
      required
    />
    <v-text-field
      v-model="form.repeatPass"
      label="repeat the password"
      :rules="repeatPasswordRules"
      color="teal accent-3"
      type="password"
      required
    />
    <p v-if="notCorrectPass" class="error--text text-sm-caption">
      {{ notCorrectPass }}
    </p>
    <v-btn
      color="teal accent-3"
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
export default {
  name: "signIn",
  data: () => ({
    valid: true,
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
    },
  }),
  methods: {
    comparePass() {
      if (this.form.password === this.form.repeatPass) {
        console.log("the password is correct")
      } else {
        this.notCorrectPass = "Пароли не совпадают"
      }
    },
  },
}
</script>

<style scoped></style>
