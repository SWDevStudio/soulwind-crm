import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ServerData } from "../Data/SECRET_KEY"
import PermissionModel from "../Permission/dto/permission.model"
import { Roles } from "~/types/Roles"
import { UserTokenInfo } from "~/server/User/dto/user.dto"
export default function RolesMiddleware(permissionPath: string): any {
  return async function (req: Request, res: Response, next: Function) {
    if (req.method === "OPTIONS") {
      next()
    }
    // Проверки которые будем делать

    // 1. Получаем группу пользователя
    // 2. Смотрим на переменную котоая отвечает за доступ к определенному методу
    // 3. Если удачно, то делаем все как было
    try {
      const token: string = req.headers?.token as string

      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }

      const user: UserTokenInfo = jwt.verify(
        token,
        ServerData.SECRET_KEY
      ) as UserTokenInfo
      // TODO проставить везде пути и убрать проверку самой роли
      // if (!roles.find((role) => role === user.role)) {
      //   return res.status(403).json({ message: "Недостаточно прав" })
      // }

      const perm = permissionPath.split(".")
      const permissionGroups = await PermissionModel.find()
      const needPermissionGroup = permissionGroups.find(
        (i) => i.name === user.role
      )
      // TODO нужно сделать проверку прав и возможность управления правами
      if (needPermissionGroup?.name) return next()
      if (needPermissionGroup) {
        if (!needPermissionGroup.fields[perm[0]][perm[1]]) {
          return res.status(403).json({ message: "Недостаточно прав" })
        }
      }
      next()
    } catch (e) {
      return res.status(403).json({ message: "Ошибка определения ролей" })
    }
  }
}
