<template>
  <v-card style="height: 100%" class="d-flex flex-column">
    <v-card-title class="pl-8">{{ title }}</v-card-title>
    <v-card-text
      class="d-flex justify-center align-center"
      style="flex: 1 1 100%"
    >
      <div :id="chartId" style="height: 500px; width: 100%" />
    </v-card-text>
    <slot />
  </v-card>
</template>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"
import { Prop, Watch } from "nuxt-property-decorator"
import Chartist from "chartist"

@Component({
  name: "Chart",
})
export default class Chart extends Vue {
  chartId!: string
  @Prop() data!: object
  @Prop() typeChart!: "Pie" | "Bar" | "Line"

  @Prop() title?: string
  @Prop({ default: {} }) options?: object
  @Prop({ default: () => ({}) }) responsiveOptions?: object
  chart: object | null = null
  constructor() {
    super()
    this.chartId = this.createId()
  }

  @Watch("data", { deep: true })
  chartLevelRender() {
    // eslint-disable-next-line no-new
    if (this.typeChart === "Pie")
      this.chart = new Chartist.Pie(
        `#${this.chartId}`,
        this.data,
        this.options,
        this.responsiveOptions
      )
    if (this.typeChart === "Bar")
      this.chart = new Chartist.Bar(
        `#${this.chartId}`,
        this.data,
        this.options,
        this.responsiveOptions
      )
    if (this.typeChart === "Line")
      this.chart = new Chartist.Line(
        `#${this.chartId}`,
        this.data,
        this.options,
        this.responsiveOptions
      )
  }

  createId(): string {
    const abc = "abcdefghijklmnopqrstuvwxyz"
    let rs = ""
    while (rs.length < 6) {
      rs += abc[Math.floor(Math.random() * abc.length)]
    }
    if (document.getElementById(rs)) {
      return this.createId()
    } else {
      return rs
    }
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

.color-box {
  width: 20px;
  height: 20px;
  background: #004d40;
  margin-right: 10px;
  margin-left: 50px;
}
.color-box--active {
  background: #26a69a;
}
</style>
