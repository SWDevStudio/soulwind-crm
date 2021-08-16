import { Request, Response } from "express"
import WebManager from "../express/WebManager"
import Cats from "./cats.model"
import { Cat } from "~/server/structs/Cats"

class CatsController {
  getAllCats() {
    WebManager.AppExpress.get(
      "/qqqq/:what",
      async (req: Request, res: Response) => {
        const allCats: Cat[] = await Cats.find({})
        res.send({ cats: allCats })
      }
    )
  }

  deleteCat() {
    WebManager.AppExpress.get(
      "/delete/:what",
      async (req: Request, res: Response) => {
        // const allCats: Cat[] = await Cats.find({})
        res.send({ cats: "delete cat" })
      }
    )
  }

  init() {
    this.getAllCats()
    this.deleteCat()
  }
}
export default new CatsController()
