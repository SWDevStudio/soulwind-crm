import { PAGES } from "~/data/PAGES"

export const SIDEBAR_MENU = [
  {
    icon: "mdi-account",
    title: "Состав",
    to: PAGES.membership,
  },
  {
    icon: "mdi-close",
    title: "Черный список",
    to: PAGES.blackList,
  },
  {
    icon: "mdi-close",
    title: "Исключенные",
    to: PAGES.dropout,
  },
  {
    icon: "mdi-account-multiple",
    title: "Группы",
    to: PAGES.groups,
  },
  {
    icon: "mdi-account",
    title: "Ивенты",
    to: PAGES.guildEvent,
  },
]
