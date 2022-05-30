<template>
  <v-row v-if="getAllCharacters.length" justify="center" class="mt-2 pb-2">
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
          fixed-header
          :height="800"
        >
          <template #item.lastName="{ item }"
          >
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr))">
              <div> {{
                  findUserFromId(item.lastName).lastName
                }}
              </div>
              <div>
                {{
                  findGroupFromId(findUserFromId(item.lastName).partyId) || 'Без группы'
                }}
              </div>
              <div>
                {{
                  moment(findUserFromId(item.lastName).updatedAt * 1000).format(Types.DEFAULT_FORMAT_DATE)
                }}
              </div>
            </div>


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
        @updateData="updateEvent"
      />
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Component, {mixins} from "nuxt-class-component"
import {Prop, Ref} from "nuxt-property-decorator"
import moment from "moment/moment"
import {UI} from "~/data/UI"
import {
  GuildEventDtoResponse,
  Participants,
} from "~/server/GuildEvent/dto/guildEvent.dto"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import FormGuildEvent from "~/components/forms/FormGuildEvent.vue"
import {GuildEventApi} from "~/api/guildEvent.api"
import GlobalStoreMixin from "~/mixins/GlobalStoreMixin.vue";
import {Types} from '~/types'
// TODO на беке посмотреть при обновлении ивентов не приходит ответ который я хочу, падает filter в template
@Component({
  name: "GuildEvent",
  components: {FormGuildEvent},
})
export default class GuildEvent extends mixins(CharacterStoreMixin, GlobalStoreMixin) {
  moment = moment
  Types = Types
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
        text: `${moment(event.date * 1000).format("DD.MM")} / ${event.eventType}`,
        value: event._id,
      }
    })
    return [{text: "Фамилия / Группа / Дата вступления", value: "lastName"}, ...cols]
  }

  updateEvent(arr: GuildEventDtoResponse[]) {
    this.events = arr
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
    const allCharacter = charactersId.map((charactersId) => {
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
    this.getActiveCharacters.forEach((el) => {
      if (!allCharacter.find((i) => i.lastName === el._id)) {
        allCharacter.push({lastName: el._id})
      }
    })
    return allCharacter
  }

  get dateRangeText(): string {
    return this.dates.join("  ~  ")
  }

  // props
  @Prop() propNam?: string

  @Ref("eventForm") eventForm!: FormGuildEvent

  editEvent(): void {
    this.eventForm.startEdit()
    this.modalCreateEvent = true
  }

  findUserFromId(id: string) {
    return this.getAllCharacters.find((character) => id === character._id)
    // return {}
  }

  findGroupFromId(id: string) {
    if (!id) return ''
    return this.storeGroups.find(i => i._id === id)?.name
  }

  // watch
  // @Watch("form.name")
  // startWork(val: string, oldVal: string): void {}

  // methods
  // startMethod(): void {}

  // жизненные хуки
  events: GuildEventDtoResponse[] = []

  async loadEvents() {
    this.events = await this.$requestServer<GuildEventDtoResponse[]>(
      GuildEventApi.loadEvent,
      {
        params: {from: this.dates[0], to: this.dates[1]},
      }
    ).catch(() => [])
  }

  created(): void {
    this.loadEvents()
  }
}
</script>

<style>
.v-data-table-header {
  width: 100%;
  position: sticky;
  background-color: #1e1e1e;
}

/*.v-data-table .v-data-table__wrapper table thead {*/
/*  position: fixed;*/
/*}*/
/*.v-data-table__wrapper {*/
/*  overflow: unset !important;*/
/*}*/
</style>
