import { DefaultServerResponse } from "~/server/structs/DefaultServerResponse"
import { UserDto } from "~/server/User/dto/user.dto"
export type allDto = UserDto
export interface DefaultController {
  get?<T>(id?: number | string): Promise<DefaultServerResponse<T | T[]>>
  delete?(id: number | string): Promise<DefaultServerResponse<string>>
  create?(data: allDto): Promise<DefaultServerResponse<number | string> | any>
  edit?<T>(
    id: number | string,
    fields: T
  ): Promise<DefaultServerResponse<string>>
}
