<template>
  <v-row class="mt-2 pb-2" justify="center">
    <v-card width="100%">
      <v-card-title>
        <v-row class="justify-end">
          <v-col cols="auto">
            <v-dialog v-model="modalCreateGroup" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ml-auto col col-auto"
                  fab
                  dark
                  v-bind="attrs"
                  outlined
                  :color="UI.actionColor.color"
                  v-on="on"
                >
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </template>
              <template #default>
                <form-group v-model="modalCreateGroup" />
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel v-for="(group, key) in groups" :key="key">
            <v-expansion-panel-header>
              {{ group.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="HEADER_CHARACTER"
                :items="findAllMember(group._id)"
                disable-pagination
                hide-default-footer
              ></v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Action, Component, State, Vue, Watch } from "nuxt-property-decorator"
import { HEADER_CHARACTER } from "~/data/headers/HEADER_CHARACTER"
import { UI } from "~/data/UI"
import FormGroup from "~/components/forms/FormGroup.vue"
import GroupApi from "~/api/GroupApi"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"
import CharacterApi from "~/api/CharacterApi"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"

@Component({
  name: "Groups",
  components: { FormGroup },
})
export default class Groups extends Vue {
  @State((state) => state.global.groups) groups!: GroupDtoModel[]
  @Action("global/updateGroups") actionUpdateGroup!: () => Promise<void>
  HEADER_CHARACTER = HEADER_CHARACTER
  UI = UI
  modalCreateGroup: boolean = false
  characters: CharacterDTOResponse[] = []
  @Watch("modalCreateGroup")
  update() {
    this.actionUpdateGroup()
  }

  async created() {
    // TODO решить проблему того что на SSR у нас нет токена
    if (process.client) {
      const res = await CharacterApi.loadCharacters(() => {})
      if (res) {
        this.characters = res.filter((i) => i.status === "ACTIVE")
      }
    }
  }

  findAllMember(id: string): CharacterDTOResponse[] {
    const members: CharacterDTOResponse[] = []
    this.characters.forEach((character) =>
      character.partyId === id ? members.push(character) : null
    )
    return members
  }
}
</script>
