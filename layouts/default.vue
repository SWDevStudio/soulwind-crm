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
      <v-toolbar-title
        v-text="items.find((item) => item.to === $route.path).title"
      />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container class="d-flex mr-4 ml-4" style="height: 100% !important">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { SIDEBAR_MENU } from "~/data/SIDEBAR_MENU"

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
  async created() {
    // const res = await axios.post("/api/user/login", {
    //   email: "swdevstudio@gma1il.com",
    //   password: "qwer1232323",
    // })
    // console.log(res)
  },
}
</script>
