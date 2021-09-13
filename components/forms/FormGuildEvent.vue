<template>
  <v-card overlay-color="teal accent-4" overlay-opacity="0.1">
    <v-card-actions class="justify-end pt-3">
      <v-icon :color="UI.actionColor.color" @click="closeModal"
        >mdi-close
      </v-icon>
    </v-card-actions>
    <v-card-title class="pt-0">
      <v-row>
        <v-col v-if="!editMode">
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
        <v-col v-if="editMode">
          <v-autocomplete
            v-model="selectDateEdit"
            label="Дата"
            :color="UI.actionColor.color"
            :items="
              guildEventsList.map((item) => ({
                title: moment(item.date * 1000).format('YYYY-MM-DD'),
                value: item.date,
                _id: item._id,
              }))
            "
            style="cursor: pointer"
            required
            item-text="title"
            item-value="_id"
          />
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
        <v-col>
          <v-text-field
            v-model="search"
            :color="UI.actionColor.color"
            label="Поиск"
            prepend-inner-icon="mdi-magnify"
            clearable
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
            <tr v-for="(character, key) in filteredCharacters" :key="key">
              <td>{{ character.lastName }}</td>
              <td>
                <v-radio-group
                  row
                  dense
                  :value="findStatus(character._id)"
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
      <v-btn
        :color="UI.actionColor.color"
        :disabled="editMode ? !selectDateEdit : false"
        block
        outlined
        @click="sendForm"
      >
        {{ editMode ? "Редактировать" : "Добавить" }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component"
import moment from "moment/moment"
import { Prop, Watch } from "nuxt-property-decorator"
import { AxiosResponse } from "axios"
import MixinModal from "~/mixins/MixinModal.vue"
import { GUILD_EVENTS } from "~/server/Data/GUILD_EVENTS"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { EVENT_STATUS, EventStatus } from "~/types/GuildEvents/EventStatus"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import {
  GuildEventDto,
  GuildEventDtoResponse,
  Participants,
} from "~/server/GuildEvent/dto/guildEvent.dto"
import GuildEventApi from "~/api/GuildEventApi"
import { ErrorResponse } from "~/structs/ErrorResponse"
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
  editMode: boolean = false
  search: string = ""
  selectDateEdit: any = null
  form: GuildEventDto = {
    date: moment().unix(),
    eventType: "Осада",
    participants: [],
  }

  moment = moment

  @Prop() guildEventsList!: GuildEventDtoResponse[]

  get filteredCharacters(): CharacterDTOResponse[] {
    return this.getActiveCharacters.filter((character) =>
      character.lastName.toLowerCase().includes(this.search.toLowerCase())
    )
  }

  @Watch("selectDateEdit")
  setForm(value: number) {
    const event = this.guildEventsList.find((item) => value === item._id)
    if (event) {
      this.form = {
        date: event.date,
        eventType: event.eventType,
        participants: JSON.parse(JSON.stringify(event.participants)),
      }
    }
  }

  addParticipants(val: EventStatus, char: CharacterDTOResponse) {
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

  closeModal() {
    this.$emit("input", false)
    this.editMode = false
    this.selectDateEdit = null
    this.form = {
      date: moment().unix(),
      eventType: "Осада",
      participants: [],
    }
  }

  findStatus(id: string): string {
    return (
      this.form.participants.find((item) => id === item.characterId)?.status ||
      ""
    )
  }

  async sendForm() {
    const errorCallback = (response: AxiosResponse<ErrorResponse>) => {
      this.serverErrorResponse = response.data.message
    }
    const resp = this.editMode
      ? await GuildEventApi.updateEvent(
          this.selectDateEdit,
          this.form,
          errorCallback
        )
      : await GuildEventApi.createEvent(this.form, errorCallback)
    if (resp) {
      this.$emit("updateData", resp)
      this.closeModal()
    }
  }

  startEdit() {
    this.editMode = true
  }
}
</script>
