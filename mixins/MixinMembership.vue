<template>
  <v-row justify="center" class="mt-2 pb-2">
    <v-card width="100%">
      <v-card-title>
        <v-row align="center">
          <v-col cols="2">
            <v-autocomplete
              v-model="form.partyId"
              label="Группа"
              :color="UI.actionColor.color"
              clearable
              :items="groups"
              item-value="_id"
              item-text="name"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="form.search"
              :color="UI.actionColor.color"
              label="Поиск"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-col>Кол-во в таблице: {{ sortCharacters.length || 0 }}</v-col>
          <v-col class="d-flex">
            <v-btn
              fab
              outlined
              class="ml-auto"
              :color="UI.actionColor.color"
              @click="modal = !modal"
            >
              <v-icon dark> mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="sortCharacters"
        :search="form.search"
        disable-pagination
        hide-default-footer
      >
        <template #item.actions="{ item }">
          <v-icon @click="editCharacter(item)" class="mr-2">mdi-pencil</v-icon>
          <v-icon  @click="startDismiss(item)">mdi-delete-forever-outline</v-icon>
        </template>
        <template #item.partyId="{ item }">
          {{ findGroupName(item.partyId) }}
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      v-model="modal"
      max-width="1200"
      overlay-color="teal accent-4"
      overlay-opacity="0.1"
      persistent
      eager
    >
      <character-creation-form ref="characterForm" v-model="modal" />
    </v-dialog>
    <v-dialog v-model="modalRemoveCharacter" max-width="600" persistent eager>
      <form-dismiss-character
        ref="dismissedForm"
        v-model="modalRemoveCharacter"
      />
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component"
import { Ref, State, Watch } from "nuxt-property-decorator"
import { UI } from "~/data/UI"
import { HEADER_CHARACTER } from "~/data/headers/HEADER_CHARACTER"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import CharacterCreationForm from "~/components/forms/FormCreationCharacter.vue"
import FormDismissCharacter from "~/components/forms/FormDismissCharacter.vue"
import { GroupDtoModel } from "~/server/Group/dto/group.dto"

@Component({
  name: "MixinMembership",
  components: { FormDismissCharacter, CharacterCreationForm },
})
export default class MixinMembership extends mixins<CharacterStoreMixin>(
  CharacterStoreMixin
) {
  @State((state) => state.global.groups) groups!: GroupDtoModel[]

  modal: boolean = false
  modalRemoveCharacter: boolean = false
  UI = UI
  form = {
    search: "",
    partyId: "",
  }

  needCharacters!:
    | "getBlackListCharacters"
    | "getActiveCharacters"
    | "getDismissedCharacters"

  modeDismissModal: "" | "recovery" = ""
  headers = HEADER_CHARACTER

  get sortCharacters() {
    if (!this.form.partyId) return this[this.needCharacters] || []
    const arr: any[] = this[this.needCharacters] || []
    return (
      arr?.filter(
        (item) => item.partyId === this.form.partyId
      ) || []
    )
  }

  @Watch("modal")
  modalWatch(val: boolean) {
    if (!val) {
      this.storeUpdateCharacters()
    }
  }

  @Ref("characterForm") characterForm!: CharacterCreationForm

  editCharacter(item: CharacterDTOResponse): void {
    this.characterForm.startEdit(item)
    this.modal = true
  }

  @Ref("dismissedForm") readonly dismissForm!: FormDismissCharacter

  startDismiss(item: CharacterDTOResponse): void {
    this.modalRemoveCharacter = true
    this.dismissForm.startEdit(item, this.modeDismissModal)
  }

  findGroupName(id: string): string {
    return this.groups.find((i) => i._id === id)?.name || ""
  }
}
</script>

<style scoped></style>
