<template>
  <v-card @keydown.esc="closeModal">
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
      <v-form ref="form">
        <v-row>
          <v-col>
            <v-text-field
              v-model="note"
              label="Причина"
              :color="UI.actionColor.color"
            />
          </v-col>
        </v-row>
        <v-row v-if="recovery">
          <v-col>
            <v-btn
              block
              :color="UI.actionColor.color"
              outlined
              @click="sendForm('ACTIVE')"
              >Восстановить в гильдии</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-else class="">
          <v-col>
            <v-btn
              block
              :color="UI.actionColor.color"
              outlined
              @click="sendForm('DISMISSED')"
              >Изгнать</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              block
              :color="UI.actionColor.color"
              outlined
              @click="sendForm('BLACK_LIST')"
              >Забанить</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import { mixins } from "nuxt-property-decorator"
import MixinModal from "~/mixins/MixinModal.vue"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import { CharacterStatus } from "~/types/Character/CharacterStatus"
import CharacterApi from "~/api/CharacterApi"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"

@Component({
  name: "FormDismissCharacter",
})
export default class FormDismissCharacter extends mixins(
  MixinModal,
  CharacterStoreMixin
) {
  editId: string | null = null
  note: string = ""
  recovery: boolean = false
  public startEdit(item: CharacterDTOResponse, recovery?: string): void {
    this.editId = item._id
    this.note = item.note || ""
    if (recovery === "recovery") {
      this.recovery = true
    }
  }

  async sendForm(status: CharacterStatus): Promise<void> {
    if (this.editId) {
      const res = await CharacterApi.patchCharacter(
        this.editId,
        {
          status,
          note: this.note,
        },
        () => {}
      )
      if (res) {
        await this.storeUpdateCharacters()
        this.closeModal()
      }
    }
  }
}
</script>
