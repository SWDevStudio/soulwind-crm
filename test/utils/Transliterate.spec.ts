import { Transliterate } from "~/utils/Transliterate"
// TODO перенести
describe("Transliterate.ts", function () {
  it("Это функция?", function () {
    expect(Transliterate).toBeInstanceOf(Function)
  })

  it("Функция сделала правильный перевод символов", function () {
    expect(Transliterate("Юзер")).toBe("Uzer")
  })

  it("Проверка спецсимволов", function () {
    expect(Transliterate("юзер@-,,")).toBe("uzer@-,,")
  })
})
