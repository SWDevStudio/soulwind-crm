import { AxiosResponse } from "axios"
import { NetworkManager } from "~/api/NetworkManager"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import { ErrorResponse, FunctionErrorResponse } from "~/structs/ErrorResponse"

class CharacterApi extends NetworkManager {
  // TODO 2 одинаковых метода, но generalInfo подразумевает получение данных неавторизованному пользователю - уменьшить кол-во данных
  async loadCharacters(
    callbackError: FunctionErrorResponse
  ): Promise<CharacterDTOResponse[]> {
    const res: AxiosResponse<CharacterDTOResponse[] | ErrorResponse> =
      await this.$axios.get("/api/character").catch((e) => this.defaultCatch(e))
    if (res.status === 200) {
      return res.data as CharacterDTOResponse[]
    } else {
      callbackError(res as AxiosResponse<ErrorResponse>)
    }
    return []
  }

  async loadGeneralInfo(
    callbackError: FunctionErrorResponse
  ): Promise<CharacterDTOResponse[]> {
    const res: AxiosResponse<CharacterDTOResponse[] | ErrorResponse> =
      await this.$axios
        .get("/api/character/general")
        .catch((e) => this.defaultCatch(e))
    if (res.status === 200) {
      return res.data as CharacterDTOResponse[]
    } else {
      callbackError(res as AxiosResponse<ErrorResponse>)
    }
    return []
  }

  async patchCharacter(
    id: string,
    body: any,
    callbackError: FunctionErrorResponse
  ): Promise<CharacterDTOResponse | void> {
    const res: AxiosResponse<CharacterDTOResponse | ErrorResponse> =
      await this.$axios.patch("/api/character/" + id, body)
    if (res.status === 200) {
      return res.data as CharacterDTOResponse
    } else {
      callbackError(res as AxiosResponse<ErrorResponse>)
    }
  }
}
export default new CharacterApi()
