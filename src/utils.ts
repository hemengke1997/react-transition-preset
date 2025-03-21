export function defaults<T extends Record<string, any>>(options: T, defaultOptions: T): T {
  const result = { ...defaultOptions }
  for (const key in options) {
    if (options[key] !== undefined) {
      result[key] = options[key]
    }
  }
  return result
}
