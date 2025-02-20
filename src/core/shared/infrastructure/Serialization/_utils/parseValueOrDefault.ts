import { isNil } from 'core/shared/domain/utils'

export const parseValueOrDefault = <T>(value: T | undefined | null, defaultParsedValue: T | undefined = undefined) =>
  isNil(value) ? (defaultParsedValue as T) : value
