<template>
  <v-card overlay-color="teal accent-4" overlay-opacity="0.1">
    <v-card-title>
      <v-row>
        <v-col>
          <v-menu
            v-model="controller"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                :value="`${moment(form.date * 1000).format('YYYY-MM-DD')}`"
                label="Date"
                prepend-inner-icon="mdi-calendar"
                :color="UI.actionColor.color"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              :value="`${moment(form.date * 1000).format('YYYY-MM-DD')}`"
              :color="UI.actionColor.color"
              no-title
              locale="RU"
              first-day-of-week="1"
              @input="controller = false"
              @change="(val) => (form.date = moment(val).unix())"
            />
          </v-menu>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="form.eventType"
            label="Event"
            :color="UI.actionColor.color"
            :items="GUILD_EVENTS"
            style="cursor: pointer"
            required
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-simple-table dense fixed-header class="mb-6">
        <template #default>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th class="text-right" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="(character, key) in getActiveCharacters" :key="key">
              <td>{{ character.lastName }}</td>
              <td>
                <v-radio-group
                  :value="test"
                  row
                  @change="addParticipants($event, character)"
                >
                  <v-radio
                    v-for="item in EVENT_STATUS"
                    :key="item"
                    class="ml-auto"
                    :color="UI.actionColor.color"
                    :label="item"
                    :value="item"
                  />
                </v-radio-group>
              </td>
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
import moment from "moment/moment"
import MixinModal from "~/mixins/MixinModal.vue"
import { GUILD_EVENTS } from "~/server/Data/GUILD_EVENTS"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { EVENT_STATUS, EventStatus } from "~/types/GuildEvents/EventStatus"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import {
  GuildEventDto,
  Participants,
} from "~/server/GuildEvent/dto/guildEvent.dto"

@Component({
  name: "FormGuildEvent",
})
export default class FormGuildEvent extends mixins(
  MixinModal,
  CharacterStoreMixin
) {
  controller: boolean = false
  GUILD_EVENTS = GUILD_EVENTS
  EVENT_STATUS = EVENT_STATUS
  test: string = "Осада"
  form: GuildEventDto = {
    date: moment().unix(),
    eventType: "Осада",
    participants: [],
  }

  moment = moment

  addParticipants(val: EventStatus, char: CharacterDTOResponse) {
    console.log(123123, val, char._id)
    const findParticipant: Participants | undefined =
      this.form.participants.find((item) => char._id === item.characterId)
    if (findParticipant) {
      findParticipant.status = val
    } else {
      this.form.participants.push({
        characterId: char._id,
        status: val,
      })
    }
  }
}
</script>
