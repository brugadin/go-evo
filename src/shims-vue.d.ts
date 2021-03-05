/* eslint-disable */
import { Provider } from '@/core/services/index'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $services: Provider
  }
}