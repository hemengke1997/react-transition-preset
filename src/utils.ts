export function mergeOmitUndefined<T extends Record<string, any>>(a: T, b: T): T {
  const result = { ...a }
  for (const key in b) {
    if (b[key] !== undefined) {
      result[key] = b[key]
    }
  }
  return result
}
