import * as core from "express-serve-static-core"
import express from "express"
import bodyParser from "body-parser"
// @ts-ignore
import swaggerJsDoc from "swagger-jsdoc"
// @ts-ignore
import swaggerUi from "swagger-ui-express"
import { ConnectDataBase } from "./utils/ConnectDataBase"
import GroupController from "./Group/group.controller"
import UserController from "./User/user.controller"
import { ServerData } from "./Data/PATHS"
import CharacterController from "./Character/character.controller"

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      contact: {
        name: "Kotaro hiba",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./server/index.ts"],
}
const swagger = swaggerJsDoc(swaggerOptions)
const start = () => {
  // Подключаемся к бд
  ConnectDataBase()
  // Создаем express
  const app: core.Express = express()
  // Добавляем прослушку body
  app.use(bodyParser.json())
  app.use("/docs/customer", swaggerUi.serve, swaggerUi.setup(swagger))
  // Добавляем роуты которые слушает express
  app.use(ServerData.PATHS.GROUP, GroupController)
  app.use(ServerData.PATHS.USER, UserController)
  app.use(ServerData.PATHS.CHARACTER, CharacterController)
  /**
   * @swagger
   *  /fuck-test:
   *  get:
   *    description: This is test
   *    responses:
   *      '200':
   *        description: sdfad
   *
   */
  app.get("/fuck-test", (req, res) => {
    res.json("hello world")
  })
  return app
}

module.exports = {
  path: "/api",
  handler: start(),
}
