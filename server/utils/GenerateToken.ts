import jwt from "jsonwebtoken"
import { ServerData } from "../Data/SECRET_KEY"

const GenerateToken = (
  id: string,
  role: string,
  characterId?: string | null,
  activeUser: boolean = false
) => {
  const payload = {
    id,
    role,
    characterId,
    activeUser,
  }
  return jwt.sign(payload, ServerData.SECRET_KEY, { expiresIn: "24h" })
}

export default GenerateToken
