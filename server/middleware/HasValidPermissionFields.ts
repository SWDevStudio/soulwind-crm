import createError from "http-errors"
import { Request, Response } from "express"
import { PERMISSION_FIELDS } from "../Data/PERMISSION_FIELDS"
import { CompareArrays } from "../utils/CompareArrays"
import { PermissionDto } from "~/server/Permission/dto/permission.dto"

export function HasValidPermissionFields(
  req: Request,
  res: Response,
  next: Function
) {
  const fields: PermissionDto["fields"] = req.body.fields
  if (typeof fields !== "object")
    throw createError(400, "поле field имеет неправильный тип данных")
  const requiredPermissionFields = Object.keys(PERMISSION_FIELDS.character)
  if (!CompareArrays(Object.keys(PERMISSION_FIELDS), Object.keys(fields)))
    throw createError(
      400,
      "Переданы не все разделы в permission " +
        `[${Object.keys(PERMISSION_FIELDS)}]`
    )
  for (const i in fields) {
    if (!CompareArrays(requiredPermissionFields, Object.keys(fields[i])))
      throw createError(
        400,
        `Нехватает обязательных полей [${requiredPermissionFields}] в ${i}`
      )
    for (const r in fields[i]) {
      if (typeof fields[i][r] !== "boolean") {
        throw createError(400, `Неправильно передан тип permission в ${i}.${r}`)
      }
    }
  }
  next()
}
