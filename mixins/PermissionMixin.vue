<script lang="ts">
import { Component } from "nuxt-property-decorator"
import Vue from "vue"
import {
  PermissionArea,
  PermissionField,
} from "~/server/Data/PERMISSION_FIELDS"
@Component({
  name: "PermissionMixin",
})
export default class PermissionMixin extends Vue {
  private get USER_PERMISSION() {
    return this.$store.state.global.userPermission
  }

  checkPermission(area: PermissionArea, field: PermissionField): boolean {
    if (typeof this.USER_PERMISSION === "boolean") {
      return this.USER_PERMISSION
    }
    if (typeof this.USER_PERMISSION === "object") {
      return this.USER_PERMISSION.fields[area][field]
    }
    return false
  }
}
</script>

<style></style>
