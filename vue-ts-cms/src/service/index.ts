import { LOGIN_TOKEN } from '@/global/constants'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
import HYRequest from './request'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截id
  interceptors: {
    requestSuccessFn(config) {
      console.log('config111', config)
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token
        console.log('config.headers.Authorization:', config)
      }
      return config
    }
  }
})

export default hyRequest
