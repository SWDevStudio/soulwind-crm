<template>
  <v-row> hello world </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "Index",
})
export default class Index extends Vue {
  created() {
    this.$testFunc()
    this.$axios.get("/api/permission/err")
  }
}
</script>
