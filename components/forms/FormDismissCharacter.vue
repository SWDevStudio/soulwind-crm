<template>
  <v-card
    overlay-color="teal accent-4"
    overlay-opacity="0.1"
    @keydown.esc="closeModal"
  >
    <v-card-title :class="UI.actionColor.textClass">
      Изгнать или добавить в черный список
      <v-icon
        :color="UI.actionColor.color"
        class="ml-auto"
        style="cursor: pointer"
        @click="closeModal"
      >
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Причина" :color="UI.actionColor.color" />
        </v-col>
      </v-row>
      <v-row class="">
        <v-col>
          <v-btn block :color="UI.actionColor.color" outlined>Изгнать</v-btn>
        </v-col>
        <v-col>
          <v-btn block :color="UI.actionColor.color" outlined>Забанить</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import MixinModal from "~/mixins/MixinModal.vue"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"

@Component({
  name: "FormDismissCharacter",
})
export default class FormDismissCharacter extends MixinModal {
  editId: string | null = null
  form = {
    status: "DISMISS",
    note: "",
  }

  startEdit(item: CharacterDTOResponse): void {
    this.editId = item._id
    // this.form.note = item.note
  }
}
</script>
