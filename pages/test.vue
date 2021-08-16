<template>
  <div class="test">
    {{ value }}
    <input
      v-model.lazy="value"
      style="border: 2px solid wheat"
      @keydown.enter="setValue"
    />
  </div>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
@Component({
  name: "Test",
})
export default class Test extends Vue {
  value: string = ""
  setValue(e: any) {
    e.target.blur()
  }
}
</script>
<style lang="scss">
.redsan {
  color: red;
}
</style>
