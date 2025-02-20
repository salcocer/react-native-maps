import dayjs from 'dayjs'

export type Timestamp = string

enum TimeConstants {
  ONE_SECOND = 1000,
  ONE_MINUTE = 60 * 1000,
  ONE_HOUR = 3600 * 1000,
  ONE_DAY = 24 * 3600 * 1000
}

export class Time {
  #total: number

  private constructor(millis: number) {
    this.#total = millis
  }

  asMillis() {
    return this.#total
  }

  asSeconds() {
    return this.#total / 1000
  }

  millis(millis: number) {
    this.#total += millis
    return this
  }

  seconds(seconds: number) {
    this.#total += seconds * TimeConstants.ONE_SECOND
    return this
  }

  minutes(minutes: number) {
    this.#total += minutes * TimeConstants.ONE_MINUTE
    return this
  }

  hours(hours: number) {
    this.#total += hours * TimeConstants.ONE_HOUR
    return this
  }

  days(days: number) {
    this.#total += days * TimeConstants.ONE_DAY
    return this
  }

  static millis(millis: number) {
    return new Time(millis)
  }

  static seconds(seconds: number) {
    return new Time(seconds * TimeConstants.ONE_SECOND)
  }

  static minutes(minutes: number) {
    return new Time(minutes * TimeConstants.ONE_MINUTE)
  }

  static hours(hours: number) {
    return new Time(hours * TimeConstants.ONE_HOUR)
  }

  static days(days: number) {
    return new Time(days * TimeConstants.ONE_DAY)
  }
}

export const timeInMillis = (timestamp: Timestamp) => new Date(timestamp).getTime()

export const nowInMillis = () => Date.now()

export const format = (timestamp: Timestamp, template: string) => dayjs(timestamp).format(template)
