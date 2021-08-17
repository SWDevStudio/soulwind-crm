import * as core from "express-serve-static-core"
import express from "express"
import basicAuth from "express-basic-auth"
import bodyParser from "body-parser"
import { ConnectDataBase } from "./utils/ConnectDataBase"
import GroupController from "./Group/group.controller"
import UserController from "./User/user.controller"
import { ServerData } from "./Data/PATHS"

const start = () => {
  // Подключаемся к бд
  ConnectDataBase()
  // Создаем express
  const app: core.Express = express()
  // Добавляем прослушку body
  app.use(bodyParser.json())

  // Добавляем роуты которые слушает express
  app.use(ServerData.PATHS.GROUP, GroupController)
  app.use(ServerData.PATHS.USER, UserController)

  return app
}

module.exports = {
  path: "/api",
  handler: start(),
}
