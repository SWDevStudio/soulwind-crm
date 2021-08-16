export interface DefaultServerResponse<T> {
  status: boolean
  code: number
  response: T
}
