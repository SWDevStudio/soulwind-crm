import { DataTableHeader } from "vuetify"
export const HEADER_CHARACTER: DataTableHeader[] = [
  { text: "Фамилия", value: "lastName" },
  { text: "Класс", value: "class" },
  { text: "Уровень", value: "level" },
  { text: "Атака", value: "ap" },
  { text: "Атака П.", value: "awakeningAp" },
  { text: "Защита", value: "dp" },
  { text: "pvp skill", value: "pvpRank" },
  { text: "Actions", value: "actions", sortable: false },
]
