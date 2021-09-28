import * as core from "express-serve-static-core"
import express from "express"
import bodyParser from "body-parser"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { ConnectDataBase } from "./utils/ConnectDataBase"
import GroupController from "./Group/group.controller"
import UserController from "./User/user.controller"
import GuildEventController from "./GuildEvent/guildEvent.controller"
import { ServerData } from "./Data/PATHS"
import CharacterController from "./Character/character.controller"
import { swaggerOptions } from "./documentation/config/swaggerOption"
import isDev from "./utils/IsDev"
import PermissionController from "./Permission/permission.controller"
const start = () => {
  // Подключаемся к бд
  // ConnectDataBase()
  ConnectDataBase()
  // Создаем express
  const app: core.Express = express()
  // Добавляем прослушку body
  app.use(bodyParser.json())
  if (isDev()) {
    const swagger = swaggerJSDoc(swaggerOptions)
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger))
  }

  // Добавляем роуты которые слушает express
  app.use(ServerData.PATHS.GROUP, GroupController)
  app.use(ServerData.PATHS.USER, UserController)
  app.use(ServerData.PATHS.CHARACTER, CharacterController)
  app.use(ServerData.PATHS.GUILD_EVENT, GuildEventController)
  app.use(ServerData.PATHS.PERMISSION, PermissionController)
  return app
}

module.exports = {
  path: "/api",
  handler: start(),
}
