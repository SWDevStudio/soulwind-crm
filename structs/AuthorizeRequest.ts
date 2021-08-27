import { Request } from "express"

export interface AuthorizeRequest extends Request {
  _user: object | string
}
