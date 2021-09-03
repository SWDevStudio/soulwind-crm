import Vue from "vue"

export interface VForm extends Vue {
  validate: () => boolean
  reset: () => void
}
