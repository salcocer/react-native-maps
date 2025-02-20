declare module 'react-native-markdown-package' {
  import { WebBrowserResult } from 'expo-web-browser'
  import { Component, ReactNode } from 'react'

  class Markdown extends Component<{
    enableLightBox?: boolean
    navigator?: unknown
    imageParam?: unknown
    onLink?: (url: string) => Promise<WebBrowserResult> | void
    bgImage?: unknown
    onImageOpen?: unknown
    onImageClose?: unknown
    rules?: unknown
    children: ReactNode
    styles: unknown
  }> {}

  export = Markdown
}
