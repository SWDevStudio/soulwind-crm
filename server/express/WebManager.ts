import * as core from "express-serve-static-core"
import express, { Request, Response } from "express"
import bodyParser from "body-parser"
class WebManager {
  public readonly AppExpress: core.Express
  constructor() {
    this.AppExpress = express()
    this.AppExpress.use(bodyParser.json())
    this.AppExpress.get("/echo/:what", (req: Request, res: Response) => {
      // const allCats: Cat[] = await Cats.find({})
      // res.send({ cats: allCats })
      res.send(req.params)
    })
  }

  Init() {
    return this.AppExpress
  }
}
export default new WebManager()
