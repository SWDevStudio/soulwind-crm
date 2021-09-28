import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ServerData } from "../Data/SECRET_KEY"
import { Roles } from "~/types/Roles"
import { UserTokenInfo } from "~/server/User/dto/user.dto"
export default function RolesMiddleware(roles: Roles[]): any {
  return function (req: Request, res: Response, next: Function) {
    if (req.method === "OPTIONS") {
      next()
    }
    // Проверки которые будем делать
    // 1. Получаем группу пользователя
    // 2. Смотрим на переменную котоая отвечает за доступ к определенному методу
    // 3. Если удачно, то делаем все как было
    const token: string = req.headers?.token as string
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
    const user: UserTokenInfo = jwt.verify(
      token,
      ServerData.SECRET_KEY
    ) as UserTokenInfo
    if (!roles.find((role) => role === user.role)) {
      return res.status(403).json({ message: "Недостаточно прав" })
    }
    next()
  }
}
