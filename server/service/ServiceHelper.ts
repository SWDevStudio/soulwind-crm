import { Request, Response } from "express"
import { validationResult } from "express-validator"
// TODO подлежит удалению
export class ServiceHelper {
  readonly res: Response
  constructor(res: Response) {
    this.res = res
  }

  static defaultErrorResponse(res: Response, message: Error | string) {
    res.status(400).json({ message })
  }

  errorResponse(res: Response, message: any, status?: number) {
    res.status(status || 400).json({ message })
  }
}
