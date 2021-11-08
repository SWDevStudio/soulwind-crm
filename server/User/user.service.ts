import bcrypt from "bcrypt"
import createError from "http-errors"
import UserModel from "./dto/user.model"
import {
  UserDto,
  UserRegisterDto,
  UserResponseDto,
} from "~/server/User/dto/user.dto"
// TODO 1 функция одно действие, логикой должен заниматься middleware
// т.е если мне нужно сначала проверить существование, а потом создать если нет делаем это в middleware
class UserService {
  static async create({ email, password, characterId }: UserRegisterDto) {
    const isUserCreated = await UserModel.findOne({ email })
    if (isUserCreated)
      throw createError(400, "Пользователь с такой почтой уже существует")
    return UserModel.create({
      email,
      password: bcrypt.hashSync(password, 7),
      characterId,
    })
  }

  static async load(filter: object, needPass: boolean = false) {
    const user = needPass
      ? await UserModel.findOne(filter)
      : await UserModel.findOne(filter).select("-password")
    if (!user) {
      throw createError(400, "Пользователь не найден")
    }
    return user
  }

  static async loadAll(needPass: boolean = false) {
    const user = needPass
      ? await UserModel.find()
      : await UserModel.find().select("-password")
    if (!user) {
      throw createError(400, "При получении пользователей, что то пошло не так")
    }
    return user
  }

  static update() {}

  static delete() {}

  static validPassword(password: string, userPassword: string) {
    const validPassword = bcrypt.compareSync(password, userPassword)
    if (!validPassword) {
      throw createError(400, "Пароль пользователя не совпадает")
    }
    return true
  }
}

export default UserService
