<template>
  <v-dialog v-model="isOpen" width="400px">
    <v-card>
      <v-card-title>
        {{ text || "Подтвердите действие" }}
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
        <v-form>
          <v-btn
            :color="UI.actionColor.color"
            block
            outlined
            large
            @click="confirm"
            >подтвердить</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { UI } from "~/data/UI"

@Component({
  name: "DialogConfirm",
})
export default class DialogConfirm extends Vue {
  UI = UI
  isOpen: boolean = false
  popupController: any = { resolve: null, reject: null }
  text: string = ""
  closeModal() {
    this.isOpen = false
    this.popupController?.resolve(false)
  }

  confirm(e: Event) {
    e.preventDefault()
    this.isOpen = false
    this.popupController?.resolve(true)
  }

  open(text = "") {
    this.text = text
    let resolve, reject
    // eslint-disable-next-line promise/param-names
    const popupPromise = new Promise((ok, fail) => {
      resolve = ok
      reject = fail
    })
    this.popupController = { resolve, reject }
    this.isOpen = true
    return popupPromise
  }
}
</script>
