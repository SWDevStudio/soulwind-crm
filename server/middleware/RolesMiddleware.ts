import { Request } from "express"
import { Roles } from "~/types/Roles"
// TODO Написать проверку на роль
export default function RolesMiddleware(roles: Roles[]) {
  return function (req: Request, res: Response, next: Function) {
    next()
  }
}
