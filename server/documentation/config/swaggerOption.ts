import swaggerJSDoc from "swagger-jsdoc"
import { tagsForSwagger } from "./swaggerTags"

// Пример как заполнять swagger можно посмотреть тут https://editor.swagger.io/
export const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    basePath:
      process.env.NODE_ENV !== `production`
        ? "http://localhost:3000/api"
        : "/api",
    info: {
      title: "API",
      version: "1.0.0",
      description: "",
      contact: {
        name: "Kotaro hiba",
        email: "swdevstudio@gmail.com",
      },
      servers: ["http://localhost:3000"],
    },
    schemes: ["HTTP", "HTTPS"],
    tags: tagsForSwagger,
  },
  // Пути прописываются от корня приложения
  apis: ["./server/**/*.controller.ts", "./server/**/*.yaml"],
}
