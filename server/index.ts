import { connect } from "mongoose"
import WebManager from "./WebManager"
import UserController from "./User/user.controller"
connect(
  "mongodb+srv://KotaroSW:KotaroSW2015@cluster0.pes58.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then()
// Возможно стоит подключать их сразу в классе WebManager или вынести его сюда и импортировать в heandler
UserController("/user")

module.exports = {
  path: "/api",
  handler: WebManager.Init(),
}
