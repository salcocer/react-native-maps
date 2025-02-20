import { isNil } from 'core/shared/domain/utils'

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

export const removeNullableEntries = <T extends object>(entries: T[]) =>
  entries.filter((entry): entry is NonNullableFields<T> =>
    (Object.keys(entry) as (keyof T)[]).every(key => !isNil(entry[key]))
  )

type NullableToOptional<T> = {
  [K in keyof T]: null extends T[K] ? Exclude<T[K], null> | undefined : T[K]
}

export const removeNullFields = <T extends object>(obj: T): NullableToOptional<T> => {
  const result: Partial<T> = {}

  for (const key in obj) {
    if (!isNil(obj[key])) {
      // @ts-ignore
      result[key] = obj[key] as Exclude<T[typeof key], null>
    } else {
      result[key] = undefined
    }
  }

  return result as NullableToOptional<T>
}
