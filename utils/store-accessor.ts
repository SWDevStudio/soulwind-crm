import { Store } from "vuex"
import { getModule } from "vuex-module-decorators"
import global from "~/store/global"
import characters from "~/store/characters"

let globalStore: global
let charactersStore: characters

function initialiseStores(store: Store<any>): void {
  globalStore = getModule(global, store)
  charactersStore = getModule(characters, store)
}

export { initialiseStores }
