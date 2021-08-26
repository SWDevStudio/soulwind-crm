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
    <v-btn
      color="teal accent-3"
      outlined
      large
      block
      class="mt-3 mb-2"
      :disabled="!valid"
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
}
</script>

<style scoped></style>
