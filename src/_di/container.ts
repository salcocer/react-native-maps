import { Container } from '_di/types'
import { createContainer, InjectionMode } from 'awilix'

export const container = createContainer<Container>({
  injectionMode: InjectionMode.PROXY
})

export const inject = <T extends keyof Container>(module: T): Container[T] => container.resolve<T>(module)
