import swaggerJSDoc from "swagger-jsdoc"

export const tagsForSwagger: swaggerJSDoc.Tag[] = [
  {
    name: "User",
    description: "Управление пользователями",
    externalDocs: { description: "Узнать больше", url: "google.com" },
  },
]
