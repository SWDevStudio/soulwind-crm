<template>
  <v-row justify="center" class="mt-2 pb-2">
    <v-card width="100%">
      <v-card-title>
        <v-row>
          <v-col cols="auto">
            <v-menu
              v-model="controller"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
              @input="loadEvents"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date range"
                  prepend-inner-icon="mdi-calendar"
                  :color="UI.actionColor.color"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dates"
                :color="UI.actionColor.color"
                no-title
                range
                locale="RU"
                first-day-of-week="1"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="search"
              :color="UI.actionColor.color"
              label="Поиск"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn
            class="mt-2 mr-4"
            :color="UI.actionColor.color"
            outlined
            large
            @click="editEvent"
          >
            Изменить событие
          </v-btn>
          <v-btn
            class="mt-2"
            :color="UI.actionColor.color"
            outlined
            large
            @click="modalCreateEvent = !modalCreateEvent"
          >
            Добавить событие
          </v-btn>
        </v-card-actions>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          disable-pagination
          hide-default-footer
        >
          <template #item.lastName="{ item }"
            >{{
              getAllCharacters.find(
                (character) => item.lastName === character._id
              ).lastName
            }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="modalCreateEvent"
      max-width="1200"
      overlay-color="teal accent-4"
      overlay-opacity="0.1"
      persistent
      eager
    >
      <form-guild-event
        ref="eventForm"
        v-model="modalCreateEvent"
        :guild-events-list="events"
      />
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component"
import { Prop, Ref } from "nuxt-property-decorator"
import moment from "moment/moment"
import { UI } from "~/data/UI"
import {
  GuildEventDtoResponse,
  Participants,
} from "~/server/GuildEvent/dto/guildEvent.dto"
import GuildEventApi from "~/api/GuildEventApi"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import FormGuildEvent from "~/components/forms/FormGuildEvent.vue"

@Component({
  name: "GuildEvent",
  components: { FormGuildEvent },
})
export default class GuildEvent extends mixins(CharacterStoreMixin) {
  // data
  form: object = {
    name: "",
  }

  UI = UI

  modalCreateEvent: boolean = false
  controller: boolean = false
  search: string = ""

  dates = [
    moment().startOf("month").format("YYYY-MM-DD"),
    moment().endOf("month").format("YYYY-MM-DD"),
  ]

  get headers() {
    const cols = this.events.map((event) => {
      return {
        text: moment(event.date * 1000).format("DD.MM"),
        value: event._id,
      }
    })
    return [{ text: "Фамилия", value: "lastName" }, ...cols]
  }

  get items() {
    // Получить массив из всех пользователей во всех событиях
    const charactersId: string[] = []

    // Создать объект для каждого персонажа со значениями всех событий eventId: status
    this.events.forEach((event: GuildEventDtoResponse) => {
      event.participants.forEach((i: Participants) => {
        if (!charactersId.includes(i.characterId)) {
          charactersId.push(i.characterId)
        }
      })
    })

    return charactersId.map((charactersId) => {
      const characterEventInfo: any = {
        lastName: charactersId,
      }

      this.events.forEach((event: GuildEventDtoResponse) => {
        const checkCharacter: Participants | undefined =
          event.participants.find((i) => i.characterId === charactersId)
        if (checkCharacter) {
          characterEventInfo[event._id] = checkCharacter.status
        }
      })

      return characterEventInfo
    })
  }

  // computed
  // get fullName(): string {}

  get dateRangeText(): string {
    return this.dates.join("  ~  ")
  }

  // props
  @Prop() propNam?: string

  @Ref("eventForm") eventForm!: FormGuildEvent

  editEvent(item: GuildEventDtoResponse): void {
    this.eventForm.startEdit(item)
    this.modalCreateEvent = true
  }

  // watch
  // @Watch("form.name")
  // startWork(val: string, oldVal: string): void {}

  // methods
  // startMethod(): void {}

  // жизненные хуки
  events: GuildEventDtoResponse[] = []

  async loadEvents() {
    const response = await GuildEventApi.loadEvents(
      { from: this.dates[0], to: this.dates[1] },
      () => {}
    )
    this.events = response.filter(
      (item) =>
        item.date >= moment(this.dates[0]).unix() &&
        item.date <= moment(this.dates[1]).unix()
    )
  }

  created(): void {
    this.loadEvents()
  }
}
</script>
