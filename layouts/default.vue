<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      expand-on-hover
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 100%">
        <div class="d-flex justify-space-between" style="cursor: pointer">
          <span>{{ pageTitle }}</span>
          <span @click="removeToken">log out</span>
        </div>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container
        class="d-flex ml-3 mr-3"
        style="height: 100%; width: auto; max-width: none"
      >
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { SIDEBAR_MENU } from "~/data/SIDEBAR_MENU"
import { removeToken } from "~/utils/Token"

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: SIDEBAR_MENU,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    }
  },
  computed: {
    pageTitle() {
      return (
        this.items.find((item) => item.to === this.$route.path)?.title || ""
      )
    },
  },
  created() {
    if (process.client) {
      this.$store.dispatch("global/loadGlobalData")
    }
  },
  methods: {
    removeToken,
  },
}
</script>
