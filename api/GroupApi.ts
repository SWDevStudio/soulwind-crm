import { AxiosResponse } from "axios"
import { NetworkManager } from "~/api/NetworkManager"
import { GroupDto, GroupDtoModel } from "~/server/Group/dto/group.dto"
import { ErrorResponse, FunctionErrorResponse } from "~/structs/ErrorResponse"

class GroupApi extends NetworkManager {
  async create(
    groupDTO: GroupDto,
    callbackError: FunctionErrorResponse
  ): Promise<GroupDtoModel | undefined> {
    const res: AxiosResponse<GroupDtoModel | ErrorResponse> = await this.$axios
      .post("/api/group/create", groupDTO)
      .catch((e) => this.defaultCatch(e))
    if (res?.status === 200) {
      return res?.data as GroupDtoModel
    } else {
      callbackError(res as AxiosResponse<ErrorResponse>)
    }
  }

  async loadGroups(
    callbackError: FunctionErrorResponse
  ): Promise<GroupDtoModel[]> {
    const res: AxiosResponse<GroupDtoModel[] | ErrorResponse> =
      await this.$axios.get("/api/group")

    if (res?.status === 200) {
      return res?.data as GroupDtoModel[]
    } else {
      callbackError(res as AxiosResponse<ErrorResponse>)
      return []
    }
  }
}

export default new GroupApi()
