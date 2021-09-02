import { AxiosResponse } from "axios"

export interface ErrorResponse {
  message: string
}
export type FunctionErrorResponse = (res: AxiosResponse<ErrorResponse>) => void
