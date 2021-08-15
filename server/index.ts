import express, { Request, Response } from "express"
import { connect } from "mongoose"
import Cats from "./models/Cats"
import { Cat } from "~/server/structs/Cats"
const app = express()

const start = async () => {
  await connect(
    "mongodb+srv://KotaroSW:KotaroSW2015@cluster0.pes58.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  app.get("/echo/:what", async (req: Request, res: Response) => {
    const allCats: Cat[] = await Cats.find({})
    res.send({ cats: allCats })
  })
}
start()

module.exports = {
  path: "/api",
  handler: app,
}
