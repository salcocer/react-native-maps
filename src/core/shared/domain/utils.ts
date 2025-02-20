import isUndefined from 'lodash/isUndefined'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isString from 'lodash/isString'
import noop from 'lodash/noop'

export const isDefined = <T>(value: T | undefined): value is T => !isUndefined(value)

export { isUndefined, isEmpty, isString, isNil, noop }
