import { CompareArrays } from "~/server/utils/CompareArrays"
describe("Функция сравнения массивов", function () {
  it("Это функция.", function () {
    expect(CompareArrays).toBeInstanceOf(Function)
  })
  it("Передача массивов с разной длинной", () => {
    expect(CompareArrays(["hello world"], ["hello", "world"])).toBeFalsy()
  })
  it("Сравнение строкового массива", () => {
    const arr1 = ["user", "kotaro", "КеМеРоВо", "User"]
    const arr2 = ["user", "kotaro", "КеМеРоВо", "User"]
    expect(CompareArrays(arr1, arr2)).toBeTruthy()
  })
  it("Сравнение числового массива", function () {
    const arr1 = [2, 15, 3, 7]
    const arr2 = [15, 2, 3, 7]
    expect(CompareArrays(arr1, arr2)).toBeTruthy()
    expect(CompareArrays(arr1, [12])).toBeFalsy()
  })
  it("Сравнение смешанного массива простых значений", function () {
    const arr1 = [2, "user", 11, "kotaro"]
    const arr2 = [2, "kotaro", 11, "user"]
    expect(CompareArrays(arr1, arr2)).toBeTruthy()
  })
})
