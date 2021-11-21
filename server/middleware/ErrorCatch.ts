import { Response, Request, Errback } from "express"

function ErrorCatch(error: any, req: Request, res: Response, next: Function) {
  res.status(error.status)
  res.json({ message: error.message })
}
export default ErrorCatch
