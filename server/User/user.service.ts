import UserModel from "./dto/user.model"
import { UserDto, UserRegisterDto } from "~/server/User/dto/user.dto"
// TODO 1 функция одно действие, логикой должен заниматься middleware
// т.е если мне нужно сначала проверить существование, а потом создать если нет делаем это в middleware

class UserService {
  create(payload: UserRegisterDto) {}

  load(user: UserDto) {
    return UserModel.findOne(user)
  }

  loadAll() {}
  update() {}
  delete() {}

  isCreated(email: string) {
    return UserModel.findOne({ email })
  }
}

export default new UserService()
