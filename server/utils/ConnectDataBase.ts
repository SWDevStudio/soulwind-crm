import { connect } from "mongoose"

export function ConnectDataBase(
  login: string = "KotaroSW",
  passwd: string = "KotaroSW2015",
  db: string = "myFirstDatabase"
) {
  connect(
    `mongodb+srv://${login}:${passwd}@cluster0.pes58.mongodb.net/${db}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then()
}
