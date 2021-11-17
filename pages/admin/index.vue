<template>
  <v-row justify="center" class="mt-2 pb-2">
    <v-card width="100%">
      <v-tabs :color="UI.actionColor.color">
        <v-tab>Аккаунты</v-tab>
        <v-tab-item :transition="false" :reverse-transition="false">
          <v-row>
            <v-col>
              <v-data-table
                disable-pagination
                hide-default-footer
                :items="users"
                :headers="headers"
              >
                <template #body="{ items }">
                  <tbody>
                    <tr v-for="(item, key) in items" :key="key">
                      <td>{{ item.email }}</td>
                      <td>
                        <v-select
                          style="max-width: 250px"
                          :items="getActiveCharacters"
                          item-text="lastName"
                          :value="item.characterId"
                          item-value="_id"
                          @change="setCharacter($event, item._id)"
                        />
                      </td>
                      <td>
                        <v-select
                          style="max-width: 150px"
                          :color="UI.actionColor.color"
                          :items="permissionList"
                          :value="item.role"
                          @change="setRole($event, item._id)"
                        />
                      </td>
                      <td>
                        <v-checkbox
                          :input-value="item.activeUser"
                          :color="UI.actionColor.color"
                          @change="setActive(!item.activeUser, item._id)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import { UI } from "~/data/UI"
import { UserApi } from "~/api/user.api"
import { PermissionResponse } from "~/server/Permission/dto/permission.dto"
import { PermissionApi } from "~/api/permission.api"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"

@Component({
  name: "Index",
})
export default class Index extends CharacterStoreMixin {
  // TODO при рендере таблицы с таким подходом страдает адаптивность таблицы! Найти решение
  UI = UI
  users: any[] = []
  headers: any = [
    { text: "Email", value: "email" },
    { text: "Привязанный персонаж", value: "characterId" },
    { text: "Роль", value: "role" },
    { text: "Активация", value: "activeUser" },
  ]

  permissionList: PermissionResponse[] = []

  created() {
    this.loadUsers()
    this.loadGroups()
  }

  async loadUsers() {
    const res: any = await this.$requestServer(UserApi.get)
    this.users = res.data
  }

  async loadGroups() {
    const res: any = await this.$requestServer(PermissionApi.get)
    this.permissionList = [...res.data.map((i: any) => i.name), "SUPER_ADMIN"]
  }

  async setActive(value: boolean, id: string) {
    const res: any = await this.$requestServer(UserApi.active, {
      method: "patch",
      data: {
        value,
        id,
      },
    })
  }

  async setRole(role: string, id: string) {
    const res: any = await this.$requestServer(UserApi.setRole, {
      method: "patch",
      data: { role, id },
    })
  }

  async setCharacter(characterId: string, id: string) {
    // console.log(characterId, id)
    const res = await this.$requestServer(UserApi.updateCharacter, {
      method: "patch",
      data: {
        characterId,
        id,
      },
    })
  }
}
</script>
