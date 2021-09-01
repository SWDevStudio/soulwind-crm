import { Response } from "express"

export class ServiceHelper {
  static defaultErrorResponse(res: Response, e: Error | string) {
    res.status(400).json({ message: e })
  }
}
