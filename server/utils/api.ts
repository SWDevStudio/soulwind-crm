import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { RequestServerFunc } from "~/plugins/requestServer"

// eslint-disable-next-line import/no-mutable-exports
let $requestServer: RequestServerFunc

export function initializeRequestServer(requestFunction: RequestServerFunc) {
  $requestServer = requestFunction
}

export { $requestServer }
