import { PAGES } from "~/data/PAGES"
import { PermissionArea } from "~/server/Data/PERMISSION_FIELDS"

export const SIDEBAR_MENU: {
  icon: string
  title: string
  to: string
  area?: PermissionArea | PermissionArea[]
}[] = [
  {
    icon: "mdi-home-outline",
    title: "Главная",
    to: PAGES.root,
  },
  {
    icon: "mdi-account-outline",
    title: "Профиль",
    to: PAGES.profile,
    area: "character",
  },
  {
    icon: "mdi-account-group-outline",
    title: "Состав",
    to: PAGES.membership,
    area: "character",
  },
  {
    icon: "mdi-sword-cross",
    title: "Группы",
    to: PAGES.groups,
    area: "group",
  },
  {
    icon: "mdi-calendar-week",
    title: "Ивенты",
    to: PAGES.guildEvent,
    area: "guildEvent",
  },
  {
    icon: "mdi-close-circle-outline",
    title: "Исключенные",
    to: PAGES.dropout,
    area: "character",
  },
  {
    icon: "mdi-emoticon-dead-outline",
    title: "Черный список",
    to: PAGES.blackList,
    area: "character",
  },
  {
    icon: "mdi-book-open-page-variant-outline",
    title: "Права",
    to: PAGES.permission,
    area: "permission",
  },
  {
    icon: "mdi-desktop-mac",
    title: "Админ. панель",
    to: PAGES.admin,
    area: "user",
  },
  {
    icon: "mdi-form-dropdown",
    title: "Статистика",
    to: PAGES.statistics,
    area: ["character", "guildEvent"],
  },
]
