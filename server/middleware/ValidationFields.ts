import { Request, Response } from "express"
import { validationResult } from "express-validator"

function ValidationFields(req: Request, res: Response, next: Function) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json(validationResult(req))
  }
  next()
}

export default ValidationFields
