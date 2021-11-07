<template>
  <v-row justify="center" class="mt-2 pb-2">
    <v-card width="100%">
      <v-card-title class="d-flex">
        <v-btn class="ml-auto" @click="createGroup = true">новая группа</v-btn>
      </v-card-title>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(permissionGroup, key) in permissionList"
            :key="key"
          >
            <v-expansion-panel-header>
              {{ permissionGroup.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col
                  v-for="(i, k) in permissionGroup.fields"
                  :key="k"
                  cols="4"
                >
                  <v-card>
                    <v-card-title>{{ k }}</v-card-title>
                    <v-card-text>
                      <v-form>
                        <v-checkbox
                          v-for="(checkItem, checkKey) in i"
                          :key="checkKey"
                          v-model="i[checkKey]"
                          :label="checkKey"
                        />
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex">
                  <v-btn @click="deleteGroup(permissionGroup.name)"
                    >удалить группу</v-btn
                  >
                  <v-btn
                    @click="
                      sendPermission(
                        permissionGroup.name,
                        permissionGroup.fields
                      )
                    "
                    class="ml-auto"
                  >
                    Установить права
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-dialog
        v-model="createGroup"
        overlay-color="teal accent-4"
        overlay-opacity="0.1"
        width="400px"
      >
        <form-permission-group v-model="createGroup" />
      </v-dialog>
      <dialog-confirm ref="dialog"></dialog-confirm>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Ref, Watch } from "nuxt-property-decorator"
import { PermissionResponse } from "~/server/Permission/dto/permission.dto"
import { PermissionApi } from "~/api/permission.api"
import FormPermissionGroup from "~/components/forms/FormPermissionGroup.vue"
import DialogConfirm from "~/components/dialog/dialog-confirm.vue"
@Component({
  name: "Index",
  components: { DialogConfirm, FormPermissionGroup },
})
export default class Index extends Vue {
  createGroup: boolean = false
  permissionList: PermissionResponse[] = []

  created() {
    this.loadGroups()
  }

  @Watch("createGroup")
  async loadGroups() {
    const res = await this.$requestServer(PermissionApi.get)
    this.permissionList = res.data
  }

  @Ref("dialog") Dialog!: DialogConfirm

  async deleteGroup(name: string) {
    const res = await this.Dialog.open("Удалить группу?")
    if (res) {
      const res = await this.$requestServer(PermissionApi.delete + name, {
        method: "delete",
      })
      await this.loadGroups()
    }
  }

  async sendPermission(permissionGroup: string, fields: object) {
    if (!permissionGroup) return
    const res = await this.$requestServer(
      PermissionApi.patch + permissionGroup,
      {
        method: "PATCH",
        data: { fields },
      }
    )
    // TODO как то уведомлять при ошибке
  }
}
</script>
