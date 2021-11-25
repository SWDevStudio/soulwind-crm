import { PAGES } from "~/data/PAGES"

export const SIDEBAR_MENU = [
  {
    icon: "mdi-account-outline",
    title: "Профиль",
    to: PAGES.profile,
  },
  {
    icon: "mdi-account-group-outline",
    title: "Состав",
    to: PAGES.membership,
  },
  {
    icon: "mdi-sword-cross",
    title: "Группы",
    to: PAGES.groups,
  },
  {
    icon: "mdi-calendar-week",
    title: "Ивенты",
    to: PAGES.guildEvent,
  },
  {
    icon: "mdi-close-circle-outline",
    title: "Исключенные",
    to: PAGES.dropout,
  },
  {
    icon: "mdi-emoticon-dead-outline",
    title: "Черный список",
    to: PAGES.blackList,
  },
  {
    icon: "mdi-book-open-page-variant-outline",
    title: "Права",
    to: PAGES.permission,
  },
  {
    icon: "mdi-desktop-mac",
    title: "Админ. панель",
    to: PAGES.admin,
  },
]
