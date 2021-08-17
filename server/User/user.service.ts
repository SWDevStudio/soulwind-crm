import UserModel from "./dto/user.model"
import { UserDto, UserRegisterDto } from "~/server/User/dto/user.dto"

// import { Response } from "express"

class UserService {
  // readonly res: Response
  // constructor(res: Response) {
  //   this.res = res
  // }

  async create(data: UserRegisterDto): Promise<boolean> {
    // Проверить есть ли пользователь с такой почтой в чате
    console.log(data)
    await UserModel.create(data)
    return true
  }

  async get(id?: string): Promise<UserDto[]> {
    let resp: any
    if (id) {
      resp = await UserModel.find({ _id: id })
      return resp[0]
    }
    resp = await UserModel.find()
    console.log(resp)
    return resp
  }
}

export default new UserService()
