<template>
  <v-card overlay-color="teal accent-4" overlay-opacity="0.1">
    <v-card-actions class="justify-end pt-3">
      <v-icon :color="UI.actionColor.color" @click="closeModal"
        >mdi-close
      </v-icon>
    </v-card-actions>
    <v-card-title class="pt-0">
      <v-row>
        <v-col v-if="!editMode" cols="auto">
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
        <v-col v-if="editMode" cols="auto">
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
        <v-col cols="auto">
          <v-autocomplete
            v-model="form.eventType"
            label="Event"
            :color="UI.actionColor.color"
            :items="GUILD_EVENTS"
            style="cursor: pointer"
            required
          />
        </v-col>
        <v-col cols="auto">
          <v-select
            v-model="selectedGroupId"
            label="Группа"
            :items="storeGroups"
            :color="UI.actionColor.color"
            item-text="name"
            item-value="_id"
            clearable
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
      <v-simple-table dense fixed-header class="mb-6 v-simple-table">
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
import { ErrorResponse } from "~/structs/ErrorResponse"
import GlobalStoreMixin from "~/mixins/GlobalStoreMixin.vue"
import { GuildEventApi } from "~/api/guildEvent.api"

@Component({
  name: "FormGuildEvent",
})
export default class FormGuildEvent extends mixins(
  MixinModal,
  CharacterStoreMixin,
  GlobalStoreMixin
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
  selectedGroupId: string = ""
  @Prop() guildEventsList!: GuildEventDtoResponse[]

  get filteredCharacters(): CharacterDTOResponse[] {
    let resp: CharacterDTOResponse[] = this.getActiveCharacters
    if (this.search)
      resp = resp.filter((character) =>
        character.lastName.toLowerCase().includes(this.search.toLowerCase())
      )

    if (this.selectedGroupId)
      resp = resp.filter((i) => i.partyId === this.selectedGroupId)

    return resp
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

  async updateEvent(): Promise<GuildEventDtoResponse | void> {
    return await this.$requestServer<GuildEventDtoResponse>(
      GuildEventApi.update + this.selectDateEdit,
      {
        method: "PATCH",
        data: this.form,
      }
    ).catch(this.errorCallback)
  }

  async createEvent(): Promise<GuildEventDtoResponse | void> {
    return await this.$requestServer<GuildEventDtoResponse>(
      GuildEventApi.create,
      {
        method: "POST",
        data: this.form,
      }
    ).catch(this.errorCallback)
  }

  errorCallback(response: ErrorResponse) {
    this.serverErrorResponse = response.message
  }

  async sendForm() {
    const resp = this.editMode
      ? await this.updateEvent()
      : await this.createEvent()
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

<style lang="scss" scoped>
.v-simple-table {
  max-height: 50vh;
  overflow: auto;
}
</style>
