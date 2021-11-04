import jwt from "jsonwebtoken"
import { ServerData } from "../Data/SECRET_KEY"

const GenerateToken = (
  id: string,
  role: string,
  characterId?: string | null
) => {
  const payload = {
    id,
    role,
    characterId,
  }
  return jwt.sign(payload, ServerData.SECRET_KEY, { expiresIn: "24h" })
}

export default GenerateToken
