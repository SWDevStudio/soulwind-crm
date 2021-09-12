import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ServerData } from "../Data/SECRET_KEY"

export default function AuthorizeMiddleware(
  req: Request,
  res: Response,
  next: Function
) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    // TODO мне кажется это не совсем верно
    const token: string = req.headers?.token as string
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }

    res.locals._user = jwt.verify(token, ServerData.SECRET_KEY)

    next()
  } catch (e) {
    return res.status(403).json({ message: "Ошибка авторизации" })
  }
}
