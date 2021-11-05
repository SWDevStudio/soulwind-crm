export function CompareArrays(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false
  const len = arr1.length
  const sorted1 = arr1.sort()
  const sorted2 = arr2.sort()
  for (let i = 0; i < len; i++) {
    if (sorted1[i] !== sorted2[i]) return false
  }
  return true
}
