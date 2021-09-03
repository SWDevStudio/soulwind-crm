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
          <v-expansion-panel v-for="(group, key) in storeGroups" :key="key">
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
import { Component, mixins, Watch } from "nuxt-property-decorator"
import { HEADER_CHARACTER } from "~/data/headers/HEADER_CHARACTER"
import { UI } from "~/data/UI"
import FormGroup from "~/components/forms/FormGroup.vue"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import GlobalStoreMixin from "~/mixins/GlobalStoreMixin.vue"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"

@Component({
  name: "Groups",
  components: { FormGroup },
})
export default class Groups extends mixins<
  GlobalStoreMixin,
  CharacterStoreMixin
>(GlobalStoreMixin, CharacterStoreMixin) {
  HEADER_CHARACTER = HEADER_CHARACTER
  UI = UI
  modalCreateGroup: boolean = false
  characters: CharacterDTOResponse[] = []
  @Watch("modalCreateGroup")
  update() {
    this.actionUpdateGroup()
  }

  findAllMember(id: string): CharacterDTOResponse[] {
    const members: CharacterDTOResponse[] = []
    this.getActiveCharacters.forEach((character) =>
      character.partyId === id ? members.push(character) : null
    )
    return members
  }
}
</script>
