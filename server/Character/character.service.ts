import { Request, Response } from "express"

class CharacterService {
  getCharacter(req: Request, res: Response) {
    res.json("123")
  }
}

export default new CharacterService()
