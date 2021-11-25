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

<script lang="ts">
import { Component, mixins } from "nuxt-property-decorator"
import { SIDEBAR_MENU } from "~/data/SIDEBAR_MENU"
import CharacterStoreMixin from "~/mixins/CharacterStoreMixin.vue"
import MixinToken from "~/mixins/MixinToken"

import "chartist/dist/chartist.min.css"
import PermissionMixin from "~/mixins/PermissionMixin.vue"

@Component({
  name: "default",
})
export default class Default extends mixins<
  CharacterStoreMixin,
  MixinToken,
  PermissionMixin
>(CharacterStoreMixin, MixinToken, PermissionMixin) {
  clipped: boolean = false
  drawer: boolean = false
  fixed: boolean = false
  items = SIDEBAR_MENU
  miniVariant: boolean = false
  right: boolean = true
  rightDrawer: boolean = false
  title: string = "Vuetify.js"

  get pageTitle(): string {
    return this.items.find((item) => item.to === this.$route.path)?.title || ""
  }

  created() {
    this.$store.dispatch("global/loadGlobalData")
    this.$store.dispatch("global/loadPermission")
    // this.$store.dispatch("characters/updateCharacter")
    this.storeUpdateCharacters()
  }
}
</script>
