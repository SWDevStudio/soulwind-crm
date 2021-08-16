import { connect } from "mongoose"
import WebManager from "./express/WebManager"
import CatsController from "./Cats/cats.controller"
import UserComtroller from "./User/user.controller"
// connectDataBase нужно будет добавить подключение по .env
connect(
  "mongodb+srv://KotaroSW:KotaroSW2015@cluster0.pes58.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
CatsController.init()
UserComtroller.init()
module.exports = {
  path: "/api",
  handler: WebManager.Init(),
}
