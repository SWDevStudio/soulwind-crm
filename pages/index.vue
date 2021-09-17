<template>
  <v-col>
    <v-row>
      <v-col lg="4" md="6" sm="12" cols="12">
        <chart
          title="Гир"
          type-chart="Pie"
          :data="chartGearScore"
          :options="optionsChartGearScore"
          :responsive-options="responsiveOptionsChartGearScore"
        ></chart>
      </v-col>
      <v-col lg="8" md="6" sm="12" cols="12">
        <chart
          title="Класс"
          type-chart="Bar"
          :data="chartClass"
          :options="optionsChartClass"
        ></chart>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="8" md="6" sm="12" cols="12">
        <chart
          title="Посещение осад"
          type-chart="Bar"
          :data="chartVisitEvent"
          :options="optionsChartVisitEvent"
          :responsive-options="responsiveOptionsChartVisitEvent"
        >
          <v-card-subtitle>
            <v-row>
              <v-col class="d-flex">
                <div class="color-box color-box--active" />
                <p>Присутствовал</p>
              </v-col>
              <v-col class="d-flex">
                <div class="color-box" />
                <p>Отпросился</p>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </chart>
      </v-col>

      <v-col lg="4" md="6" sm="12" cols="12">
        <chart
          title="Уровни"
          type-chart="Pie"
          :data="chartLevel"
          :responsive-options="responsiveOptionsChartLevel"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component"
import moment from "moment"
import {
  IBarChartOptions,
  IChartistData,
  IPieChartOptions,
  IResponsiveOptionTuple,
} from "chartist"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { CHARACTER_CLASSES } from "~/data/CHARACTER_CLASSES"
import GuildEventApi from "~/api/GuildEventApi"
import { GuildEventDtoResponse } from "~/server/GuildEvent/dto/guildEvent.dto"
import Chart from "~/components/Chart.vue"
import { EventStatus } from "~/types/GuildEvents/EventStatus"

@Component({
  name: "index",
  components: { Chart },
})
export default class Index extends mixins(CharacterStoreMixin) {
  guildEvents: GuildEventDtoResponse[] = []

  get chartGearScore(): IChartistData {
    return {
      labels: ["до 510", "511-570", "571-590", "от 591", "ГС не указан"],
      series: this.gearScore(),
    }
  }

  optionsChartGearScore: IPieChartOptions = {
    donut: true,
    donutWidth: 100,
  }

  responsiveOptionsChartGearScore: Array<
    IResponsiveOptionTuple<IPieChartOptions>
  > = [
    [
      "screen and (min-width: 640px)",
      {
        chartPadding: 30,
        labelOffset: -10,

        labelInterpolationFnc(value: any) {
          return value
        },
      },
    ],
    [
      "screen and (min-width: 1024px)",
      {
        labelOffset: -10,
        chartPadding: 20,
      },
    ],
  ]

  get chartLevel(): IChartistData {
    return {
      labels: ["<61", "61", "62", "62>"],
      series: [
        {
          value: this.getActiveCharacters.filter((character) =>
            character?.level ? character.level <= 60 : false
          ).length,
          className: "lowLevel",
        },
        {
          value: this.getActiveCharacters.filter((character) =>
            character?.level ? character.level === 61 : false
          ).length,
          className: "sixtyOne",
        },
        {
          value: this.getActiveCharacters.filter((character) =>
            character?.level ? character.level === 62 : false
          ).length,
          className: "sixtyTwo",
        },
        {
          value: this.getActiveCharacters.filter((character) =>
            character?.level ? character.level >= 63 : false
          ).length,
          className: "highLevel",
        },
      ],
    }
  }

  responsiveOptionsChartLevel: Array<IResponsiveOptionTuple<IPieChartOptions>> =
    [
      [
        "screen and (min-width: 640px)",
        {
          chartPadding: 30,
          labelOffset: 50,
          labelInterpolationFnc(value: any) {
            return value
          },
        },
      ],
      [
        "screen and (min-width: 1024px)",
        {
          labelOffset: 50,
          chartPadding: 20,
        },
      ],
    ]

  get chartVisitEvent(): IChartistData {
    const needStatus: EventStatus[] = ["Присутствовал", "Отпросился"]
    return {
      labels: this.guildEvents.map((guildEvent) =>
        moment(guildEvent.date * 1000).format("DD-MM")
      ),
      series: [
        ...needStatus.map((statusType) =>
          this.guildEvents.map(
            (guildEvent) =>
              guildEvent.participants.filter(
                (item) => item.status === statusType
              ).length
          )
        ),
      ],
    }
  }

  optionsChartVisitEvent: IBarChartOptions = {
    // reverseData: true,
    seriesBarDistance: 10,
    axisY: {
      offset: 60,
      scaleMinSpace: 100,
    },
    axisX: {
      labelInterpolationFnc(value: any) {
        return value
      },
    },
  }

  responsiveOptionsChartVisitEvent: Array<
    IResponsiveOptionTuple<IBarChartOptions>
  > = [
    [
      "screen and (min-width: 400px)",
      {
        horizontalBars: true,
        reverseData: true,
        axisX: {
          scaleMinSpace: 100,
        },
      },
    ],
    [
      "screen and (min-width: 1024px)",
      {
        horizontalBars: false,
        reverseData: false,
      },
    ],
  ]

  get chartClass(): IChartistData {
    return {
      labels: CHARACTER_CLASSES,
      series: CHARACTER_CLASSES.map((charClass) => {
        return {
          value: this.getActiveCharacters.filter(
            (character) => character?.class === charClass
          ).length,
          className: "ct-series-a",
        }
      }),
    }
  }

  optionsChartClass: IBarChartOptions = {
    distributeSeries: true,
    reverseData: true,
    horizontalBars: true,
    axisY: {
      offset: 140,
    },
    axisX: {
      labelInterpolationFnc(value: any) {
        return value
      },
      scaleMinSpace: 100,
    },
  }

  async created() {
    this.guildEvents = await GuildEventApi.loadEvents(
      {
        from: moment().subtract("days", 13).format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },
      () => {}
    )
  }

  gearScore() {
    const res = this.getActiveCharacters.map((char) => {
      if (char.ap && char.awakeningAp) {
        if (char.ap >= char.awakeningAp) {
          return char.ap + (char.dp ? char.dp : 0)
        } else {
          return char.awakeningAp + (char.dp ? char.dp : 0)
        }
      }
      return null
    })
    const nubGS = res.filter((gs) => (gs ? gs <= 510 : false))
    const lowGS = res.filter((gs) => (gs ? gs >= 511 && gs <= 570 : false))
    const middleGS = res.filter((gs) => (gs ? gs >= 571 && gs <= 590 : false))
    const highGS = res.filter((gs) => (gs ? gs >= 591 : false))
    const notGS = res.filter((gs) => gs === null)

    return [
      nubGS.length,
      lowGS.length,
      middleGS.length,
      highGS.length,
      notGS.length,
    ]
  }
}
</script>
<style></style>
