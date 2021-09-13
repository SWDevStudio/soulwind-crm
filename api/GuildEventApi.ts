import { AxiosResponse } from "axios"
import { NetworkManager } from "~/api/NetworkManager"
import {
  GuildEventDto,
  GuildEventDtoResponse,
} from "~/server/GuildEvent/dto/guildEvent.dto"
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
      return response.data as GuildEventDtoResponse[]
    } else {
      errorCallback(response as AxiosResponse<ErrorResponse>)
      return []
    }
  }

  async createEvent(
    eventDTO: GuildEventDto,
    errorCallback: FunctionErrorResponse
  ): Promise<GuildEventDtoResponse | void> {
    const response: AxiosResponse<GuildEventDtoResponse | ErrorResponse> =
      await this.$axios
        .post("/api/guild-event", eventDTO)
        .catch((error) => this.defaultCatch(error))
    if (response.status === 200) {
      return response.data as GuildEventDtoResponse
    } else {
      errorCallback(response as AxiosResponse<ErrorResponse>)
    }
  }

  async updateEvent(
    id: string,
    eventDTO: GuildEventDto,
    errorCallback: FunctionErrorResponse
  ): Promise<GuildEventDtoResponse | void> {
    const response: AxiosResponse<GuildEventDtoResponse | ErrorResponse> =
      await this.$axios
        .patch("/api/guild-event/" + id, eventDTO)
        .catch((error) => this.defaultCatch(error))
    if (response.status === 200) {
      return response.data as GuildEventDtoResponse
    } else {
      errorCallback(response as AxiosResponse<ErrorResponse>)
    }
  }
}

export default new GuildEventApi()
