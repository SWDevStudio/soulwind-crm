import { Response } from "express"

export class ServiceHelper {
  static defaultErrorResponse(res: Response, e: Error | string) {
    res.status(400).json({ message: e })
  }

  static ErrorResponse(res: Response, status: number, message: any) {
    res.status(status || 400).json({message})
  }
}
