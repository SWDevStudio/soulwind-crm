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
        <template v-for="(item, i) in items">
          <v-list-item
            v-if="item.area ? showItem(item.area) : true"
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
        </template>
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
import { PermissionArea } from "~/server/Data/PERMISSION_FIELDS"

@Component({
  name: "default",
})
export default class Default extends mixins<CharacterStoreMixin, MixinToken>(
  CharacterStoreMixin,
  MixinToken
) {
  clipped: boolean = false
  drawer: boolean = false
  fixed: boolean = false
  items: typeof SIDEBAR_MENU = SIDEBAR_MENU
  miniVariant: boolean = false
  right: boolean = true
  rightDrawer: boolean = false
  title: string = "Vuetify.js"

  get pageTitle(): string {
    return this.items.find((item) => item.to === this.$route.path)?.title || ""
  }

  async created() {
    await this.$store.dispatch("global/loadPermission")
    if (this.$checkPermission("group", "view")) {
      await this.$store.dispatch("global/loadGlobalData")
    }

    // this.$store.dispatch("characters/updateCharacter")
    await this.storeUpdateCharacters()
  }

  showItem(permission: PermissionArea | PermissionArea[]): boolean {
    if (Array.isArray(permission)) {
      for (const i of permission) {
        if (!this.$checkPermission(i, "view")) {
          return false
        }
      }
      return true
    } else {
      return this.$checkPermission(permission, "view")
    }
  }
}
</script>
