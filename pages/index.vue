<template>
  <v-col>
    <v-row>
      <v-col lg="4" md="6" sm="12">
        <v-card>
          <v-card-title class="pl-8"> Гир</v-card-title>
          <v-card-text class="d-flex justify-center">
            <div class="chart-gs" style="height: 500px; width: 500px" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col lg="8" md="6" sm="12">
        <v-card>
          <v-card-title class="pl-8">Персонажи</v-card-title>
          <v-card-text class="d-flex justify-center">
            <div class="chart-class" style="height: 500px; width: 100%" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="8" md="6" sm="12">
        <v-card>
          <v-card-title class="pl-8">Посещение осад</v-card-title>
          <v-card-text class="d-flex justify-center">
            <div class="chart-visit-event" style="height: 430px; width: 100%" />
          </v-card-text>
          <v-card-subtitle >
            <v-row>
              <v-col class="d-flex">
                <div class="color-box color-box--active"/>
                <p>Присутствовал</p>
              </v-col>
              <v-col class="d-flex">
                <div class="color-box "/>
                <p>Отпросился</p>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col lg="4" md="6" sm="12">
        <v-card>
          <v-card-title class="pl-8">Уровни</v-card-title>
          <v-card-text class="d-flex justify-center">
            <div class="chart-level" style="height: 500px; width: 500px" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Component, { mixins } from "nuxt-class-component"
import Chartist from "chartist"
import { Watch } from "nuxt-property-decorator"
import moment from "moment"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import { CHARACTER_CLASSES } from "~/data/CHARACTER_CLASSES"
import GuildEventApi from "~/api/GuildEventApi"
import { GuildEventDtoResponse } from "~/server/GuildEvent/dto/guildEvent.dto"

@Component({
  name: "index",
})
export default class Index extends mixins(CharacterStoreMixin) {
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

  guildEvents: GuildEventDtoResponse[] = []

  get chartGearScore() {
    return {
      labels: ["до 510", "511-570", "571-590", "от 591", "ГС не указан"],
      series: [...this.gearScore()],
    }
  }

  get chartLevel() {
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

  get chartVisitEvent() {
    return {
      labels: this.guildEvents.map((guildEvent) =>
        moment(guildEvent.date * 1000).format("DD-MM")
      ),
      series: [
        this.guildEvents.map(
          (guildEvent) =>
            guildEvent.participants.filter(
              (item) => item.status === "Присутствовал"
            ).length
        ),
        this.guildEvents.map(
          (guildEvent) =>
            guildEvent.participants.filter(
              (item) => item.status === "Отпросился"
            ).length
        ),
      ],
    }
  }

  get chartClass() {
    return {
      labels: CHARACTER_CLASSES,
      series: [
        ...CHARACTER_CLASSES.map((charClass) => {
          return {
            value: this.getActiveCharacters.filter(
              (character) => character?.class === charClass
            ).length,
            className: "ct-series-a",
          }
        }),
      ],
    }
  }

  @Watch("chartGearScore", { deep: true })
  chartGearScoreRender() {
    const data = this.chartGearScore

    const options = {
      labelInterpolationFnc(value: any[]) {
        return value
      },
      donut: true,
      donutWidth: 100,
    }

    const responsiveOptions: any = [
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

    // eslint-disable-next-line no-new
    new Chartist.Pie(".chart-gs", data, options, responsiveOptions)
  }

  @Watch("chartLevel", { deep: true })
  chartLevelRender() {
    const data = this.chartLevel

    const options = {
      labelInterpolationFnc(value: any[]) {
        return value
      },
    }

    const responsiveOptions: any = [
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

    // eslint-disable-next-line no-new
    new Chartist.Pie(".chart-level", data, options, responsiveOptions)
  }

  @Watch("chartClass", { deep: true })
  chartClassRender() {
    const data = this.chartClass

    const options: any = {
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
    // eslint-disable-next-line no-new
    new Chartist.Bar(".chart-class", data, options)
  }

  @Watch("chartVisitEvent", { deep: true })
  chartVisitEventRender() {
    const data = this.chartVisitEvent
    console.log(data)
    const options: any = {
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
    const responsiveOptions: any = [
      [
        "screen and (min-width: 400px)",
        {
          horizontalBars: true,
          reverseData: true,
          axisX:{
            scaleMinSpace: 100,
          }
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
    // eslint-disable-next-line no-new
    new Chartist.Bar(".chart-visit-event", data, options,responsiveOptions)
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

  mounted() {
    this.chartGearScoreRender()
    this.chartLevelRender()
    this.chartClassRender()
    this.chartVisitEventRender()
  }
}
</script>
<style>
.lowLevel {
  fill: #004d40;
}

.sixtyOne {
  fill: #1de9b6;
}

.sixtyTwo {
  fill: #a7ffeb;
}

.highLevel {
  fill: #e0f2f1;
}

.ct-series-a .ct-slice-donut {
  stroke: #00796b;
}

.ct-series-b .ct-slice-donut {
  stroke: #00bfa5;
}

.ct-series-c .ct-slice-donut {
  stroke: #1de9b6;
}

.ct-series-d .ct-slice-donut {
  stroke: #80cbc4;
}

.ct-series-e .ct-slice-donut {
  stroke: #004d40;
}

.ct-series-a .ct-bar {
  stroke: #26a69a;
}
.ct-series-b .ct-bar {
  stroke: #004d40;
}
.ct-label {
  color: #e0f2f1;
}

.color-box{
  width: 20px;
  height: 20px;
  background: #004d40;
  margin-right: 10px;
  margin-left: 50px;
}
.color-box--active{

  background: #26a69a;
}
</style>
