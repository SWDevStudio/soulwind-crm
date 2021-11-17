import { Plugin } from "@nuxt/types"
import { initializeRequestServer } from "~/server/utils/api"

const accessor: Plugin = ({ $requestServer }) => {
  initializeRequestServer($requestServer)
}

export default accessor
