<template>
  <div class='redsan'>hello world</div>
</template>

<script lang='ts'>
import Component from 'nuxt-class-component'
import Vue from 'vue'
@Component({
  name: 'Test'
})
export default class Test extends Vue {
}
</script>
<style lang='scss'>
.redsan {
  color: red;
}
</style>
