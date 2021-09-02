import { AxiosResponse } from "axios"
import { NetworkManager } from "~/api/NetworkManager"
import { CharacterDTOResponse } from "~/server/Character/dto/character.dto"
import { ErrorResponse, FunctionErrorResponse } from "~/structs/ErrorResponse"

class CharacterApi extends NetworkManager {
  async loadCharacters(
    callbackError: FunctionErrorResponse
  ): Promise<CharacterDTOResponse[]> {
    const res: AxiosResponse<CharacterDTOResponse[] | ErrorResponse> =
      await this.$axios.get("/api/character")
    if (res.status === 200) {
      return res.data as CharacterDTOResponse[]
    } else {
      callbackError(res as AxiosResponse<ErrorResponse>)
    }
    return []
  }
}
export default new CharacterApi()
