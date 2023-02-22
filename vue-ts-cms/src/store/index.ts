import { createPinia } from 'pinia'
import type { App } from 'vue'
import UseLoginStore from './login/login'

const pinia = createPinia()

function loadMenus(app: App<Element>) {
  // 使用pinia
  app.use(pinia)

  //刷新后调用并且加载本地数据
  const loginStore = UseLoginStore()
  loginStore.loadLocalCacheAction()
}
export default loadMenus
