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
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <!-- TODO Сделать по примеру в groups.vue 7 строка-->
          <v-icon small class="mr-2"> mdi-card-bulleted-off-outline </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <character-creation-form ref="characterForm" v-model="modal" />
  </v-row>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { State, Watch } from "nuxt-property-decorator"
import CharacterCreationForm from "~/components/forms/CharacterCreationForm"
import { getToken } from "~/utils/Token"
import { UI } from "~/data/UI"
import { HEADER_CHARACTER } from "~/data/headers/HEADER_CHARACTER"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
@Component({
  name: "membership",
  components: { CharacterCreationForm },
})
export default class Membership extends CharacterStoreMixin {
  modal: boolean = false
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
  modalWatch(val) {
    if (!val) {
      this.storeUpdateCharacters()
    }
  }

  editItem(item): void {
    // TODO @Fox что это?
    this.editedIndex = this.getActiveCharacters.indexOf(item)
    this.editedItem = Object.assign({}, item)
    // END
    this.$refs.characterForm.startEdit(item)
    this.modal = true
  }
}
</script>

<style scoped></style>
