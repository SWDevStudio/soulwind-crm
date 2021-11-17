<template>
  <v-app dark>
    <h1>{{ error.message || "Что то пошло не так" }}</h1>

    <nuxt-link v-if="error.statusCode === 403" to="/authentication">
      страница авторизации
    </nuxt-link>
    <NuxtLink to="/" v-else> Home page </NuxtLink>
  </v-app>
</template>

<script>
import { PAGES } from "~/data/PAGES"

export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurreds",
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  created() {},
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
