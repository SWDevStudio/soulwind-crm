import { Response } from "express"

export class ServiceHelper {
  static defaultErrorResponse(res: Response, message: Error | string) {
    res.status(400).json({ message })
  }

  static ErrorResponse(res: Response, message: any, status?: number) {
    res.status(status || 400).json({ message })
  }
}
