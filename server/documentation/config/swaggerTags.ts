import swaggerJSDoc from "swagger-jsdoc"

export const tagsForSwagger: swaggerJSDoc.Tag[] = [
  {
    name: "User",
    description: "Управление пользователями",
    externalDocs: { description: "Узнать больше", url: "google.com" },
  },
  {
    name: "Character",
    description: "Управление персонажами",
    externalDocs: { description: "Узнать больше", url: "google.com" },
  },
  {
    name: "Guild Events",
    description: "Управление событиями гильдии",
    externalDocs: { description: "Узнать больше", url: "google.com" },
  },
]
