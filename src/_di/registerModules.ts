import { modules } from '_di/modules'
import { container } from '_di/container'

export const registerModules = () => container.register({ ...modules })
