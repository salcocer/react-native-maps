import { Module } from '_di/types'
import { container } from '_di/container'

export const registerSingleModule = (module: Partial<Module>) => container.register({ ...module })
