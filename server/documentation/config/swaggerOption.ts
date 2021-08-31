import swaggerJSDoc from "swagger-jsdoc"
// Пример как заполнять swagger можно посмотреть тут https://editor.swagger.io/
const tagsForSwagger: swaggerJSDoc.Tag[] = [
  {
    name: "user",
    description: "Управление пользователями",
    externalDocs: { description: "Узнать больше", url: "google.com" },
  },
]
export const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: "API",
      version: "1.0.0",
      description: "Какое то описание",
      contact: {
        name: "Kotaro hiba",
      },
      servers: ["http://localhost:3000"],
    },
    schemes: ["HTTP", "HTTPS"],
    tags: tagsForSwagger,
  },
  // Пути прописываются от корня приложения
  apis: ["./server/**/*.controller.ts", "./server/**/*.yaml"],
}
