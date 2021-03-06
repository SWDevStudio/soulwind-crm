import { connect } from "mongoose"
import isDev from "./IsDev"
export function ConnectDataBase(
  login: string = "KotaroSW",
  passwd: string = "KotaroSW2015",
  db: string = "SoulWind"
) {
  const uri = isDev()
    ? `mongodb+srv://${login}:${passwd}@cluster0.v6u1x.mongodb.net/${db}?retryWrites=true&w=majority`
    : `mongodb+srv://${login}:${passwd}@cluster0.pes58.mongodb.net/${db}?retryWrites=true&w=majority`
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then()
}
