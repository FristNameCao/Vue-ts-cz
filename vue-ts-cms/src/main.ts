import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/index.less'
import router from './router/index'
import store from './store'
import registerIcon from './global/register-icons'
import 'element-plus/theme-chalk/el-message.css'
const app = createApp(App)
app.use(registerIcon)
app.use(store)
app.use(router)
app.mount('#app')
