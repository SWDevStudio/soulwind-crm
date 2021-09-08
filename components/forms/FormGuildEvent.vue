<template>
  <v-card overlay-color="teal accent-4" overlay-opacity="0.1">
    <v-card-title>
      <v-menu
        v-model="controller"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.date"
            label="Date"
            prepend-inner-icon="mdi-calendar"
            :color="UI.actionColor.color"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.date"
          :color="UI.actionColor.color"
          no-title
          locale="RU"
          first-day-of-week="1"
          @input="controller = false"
        ></v-date-picker>
      </v-menu>
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn block :color="UI.actionColor.color" outlined> Добавить</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component"
import MixinModal from "~/mixins/MixinModal.vue"

@Component({
  name: "FormGuildEvent",
})
export default class FormGuildEvent extends mixins(MixinModal) {
  controller: boolean = false
  form = {
    date: "",
  }
}
</script>
