import { AxiosResponse } from "axios"
import { NetworkManager } from "~/api/NetworkManager"
import { GuildEventDtoResponse } from "~/server/GuildEvent/dto/guildEvent.dto"
import { ErrorResponse, FunctionErrorResponse } from "~/structs/ErrorResponse"
export interface GuildEventFetch {
  from: string
  to: string
}
class GuildEventApi extends NetworkManager {
  async loadEvents(
    date: GuildEventFetch,
    errorCallback: FunctionErrorResponse
  ): Promise<GuildEventDtoResponse[]> {
    const response: AxiosResponse<GuildEventDtoResponse[] | ErrorResponse> =
      await this.$axios
        .get("/api/guild-event", { params: date })
        .catch((error) => this.defaultCatch(error))
    if (response.status === 200) {
      return response.data
    } else {
      errorCallback(response)
      return []
    }
  }
}

export default new GuildEventApi()
