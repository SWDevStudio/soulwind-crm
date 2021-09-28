import { PAGES } from "~/data/PAGES"

export const SIDEBAR_MENU = [
  {
    icon: 'ph-user',
    title: "Профиль",
    to: '',
  },
  {
    icon: "ph-user-list",
    title: "Состав",
    to: PAGES.membership,
  },
  {
    icon: "ph-users",
    title: "Группы",
    to: PAGES.groups,
  },
  {
    icon: "ph-cookie",
    title: "Ивенты",
    to: PAGES.guildEvent,
  },
  {
    icon: "ph-smiley-x-eyes",
    title: "Исключенные",
    to: PAGES.dropout,
  },
  {
    icon: "ph-prohibit",
    title: "Черный список",
    to: PAGES.blackList,
  },
]
