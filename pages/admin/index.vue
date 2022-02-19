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
                        <v-autocomplete
                          style="max-width: 250px"
                          :items="getAllCharacters"
                          item-text="lastName"
                          :value="item.characterId"
                          item-value="_id"
                          clearable
                          :hint="
                            getAllCharacters.find(
                              (i) => i._id === item.characterId
                            ).status !== 'ACTIVE'
                              ? 'Персонаж исключен!'
                              : ''
                          "
                          persistent-hint
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
                      <td>
                        <v-btn @click="deleteUser(item)">Удалить</v-btn>
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
    <dialog-confirm ref="dialog"></dialog-confirm>
  </v-row>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import { Ref } from "nuxt-property-decorator"
import { UI } from "~/data/UI"
import { UserApi } from "~/api/user.api"
import { PermissionResponse } from "~/server/Permission/dto/permission.dto"
import { PermissionApi } from "~/api/permission.api"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import DialogConfirm from "~/components/dialog/dialog-confirm.vue"
import { UserResponseDto } from "~/server/User/dto/user.dto"

@Component({
  name: "Index",
  components: { DialogConfirm },
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
    { text: "" },
  ]

  permissionList: PermissionResponse[] = []

  created() {
    this.loadUsers()
    this.loadGroups()
  }

  @Ref("dialog") dialog!: DialogConfirm

  async loadUsers() {
    const realUsers = await this.$requestServer(UserApi.get).catch(() => [])
    this.users = realUsers
  }

  async loadGroups() {
    const res: any = await this.$requestServer(PermissionApi.get)
    this.permissionList = [...res.map((i: any) => i.name), "SUPER_ADMIN"]
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
    }).catch(() => {})
  }

  checkStatusCharacter(id: string): boolean {
    if (this.getAllCharacters) {
      return !!this.getAllCharacters?.find((i) => i._id === id)
    }
    return false
  }

  async setCharacter(characterId: string, id: string) {
    const res = await this.$requestServer(UserApi.updateCharacter, {
      method: "patch",
      data: {
        characterId,
        id,
      },
    }).catch(() => {})
  }

  async deleteUser(user: UserResponseDto) {
    const res = await this.dialog.open(`Удалить пользователя ${user.email}`)
    if (res) {
      await this.$requestServer(UserApi.delete, {
        method: "DELETE",
        data: {
          _id: user._id,
        },
      }).catch((e) => {
        this.dialog.setError(e.data.message)
        this.deleteUser(user)
      })
      await this.loadUsers()
    }
  }
}
</script>
