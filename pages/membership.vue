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
          <v-col cols="7" class="d-flex">
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
          <v-icon small class="mr-2" @click="editCharacter(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="startDismiss(item)" ref="dismissForm"
            >mdi-card-bulleted-off-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <character-creation-form ref="characterForm" v-model="modal" />
    <v-dialog v-model="modalRemoveCharacter" max-width="600" persistent eager>
      <form-dismiss-character
        ref="dismissedForm"
        v-model="modalRemoveCharacter"
      />
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import { Ref, State, Watch } from "nuxt-property-decorator"
import { UI } from "~/data/UI"
import { HEADER_CHARACTER } from "~/data/headers/HEADER_CHARACTER"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import CharacterCreationForm from "~/components/forms/CharacterCreationForm.vue"
import FormDismissCharacter from "~/components/forms/FormDismissCharacter.vue"
@Component({
  name: "membership",
  components: { FormDismissCharacter, CharacterCreationForm },
})
export default class Membership extends CharacterStoreMixin {
  modal: boolean = false
  modalRemoveCharacter: boolean = false
  UI = UI
  form = {
    search: "",
    partyId: "",
  }

  headers = HEADER_CHARACTER

  get groups() {
    return this.$store.state.global.groups
  }

  get sortCharacters() {
    if (!this.form.partyId) return this.getActiveCharacters
    return this.getActiveCharacters.filter(
      (item) => item.partyId === this.form.partyId
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
    this.dismissForm.startEdit(item)
    // data?.editId = item._id
    // data?.form.note = item.note

    // this.dismissForm?.startEdit(item)

    // this.dismissForm.startEdit(item)
  }
}
</script>

<style scoped></style>
