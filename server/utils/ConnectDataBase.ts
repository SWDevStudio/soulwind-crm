import { connect } from "mongoose"

export function ConnectDataBase(
  login: string = "KotaroSW",
  passwd: string = "KotaroSW2015",
  db: string = "myFirstDatabase"
) {
  connect(
    `mongodb+srv://KotaroSW:${passwd}@cluster0.pes58.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  ).then()
}
