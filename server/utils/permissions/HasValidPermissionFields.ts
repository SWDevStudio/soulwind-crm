import createError from "http-errors"
import { PERMISSION_FIELDS } from "../../Data/PERMISSION_FIELDS"
import { PermissionDto } from "~/server/Permission/dto/permission.dto"
// TODO вынести в utils написать тесты
const compareArrays = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false
  const len = arr1.length
  const sorted1 = arr1.sort()
  const sorted2 = arr2.sort()
  for (let i = 0; i < len; i++) {
    if (sorted1[i] !== sorted2[i]) return false
  }
  return true
}

// TODO вынести как middleware
export function HasValidPermissionFields(
  fields: PermissionDto["fields"]
): boolean {
  const requiredPermissionFields = Object.keys(PERMISSION_FIELDS.character)
  if (!compareArrays(Object.keys(PERMISSION_FIELDS), Object.keys(fields)))
    throw createError(
      400,
      "Переданы не все разделы в permission " +
        `[${Object.keys(PERMISSION_FIELDS)}]`
    )
  for (const i in fields) {
    if (!compareArrays(requiredPermissionFields, Object.keys(fields[i])))
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
  return true
}
