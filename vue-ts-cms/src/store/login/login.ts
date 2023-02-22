import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { accountLoginRequest } from '@/service/login/login'
import { getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import useMainStore from '../main/main'

interface IStateType {
  token: string
  userInfo: any
  userMenus: any
}
const UseLoginStore = defineStore('login', {
  state: (): IStateType => ({
    userInfo: {},
    token: '',
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录，获取token信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const token = loginResult.data.token
      this.token = token
      // this.name = loginResult.data.name
      // 1.1登录后本地缓存
      localCache.setCache(LOGIN_TOKEN, token)
      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3. 根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4.本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)
      // console.log('userInfo', userInfo)
      // console.log('userMenus', userMenus)

      // 4.2请求所有roles/department
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      // 5.超级重要：动态添加路由,自己点过去看
      const routes = mapMenusToRoutes(userMenus)
      // console.log('routes', routes)
      // 5.1接着传路由过去筛选
      routes.forEach((route) => router.addRoute('main', route))
      // 6.登录跳转
      // router.push('/Main')
      router.push('/main')
    },
    // 7.刷新页面时候重新调用该函数
    loadLocalCacheAction() {
      // 7.1刷新后重新定义
      const userInfo = localCache.getCache('userInfo')
      const token = localCache.getCache(LOGIN_TOKEN)
      const userMenus = localCache.getCache('userMenus')
      //7.2 获取信息后进行一个用户是否登录的判断
      if (userInfo && token && userMenus) {
        // 7.3如果登录了
        this.userInfo = userInfo
        this.token = token
        this.userMenus = userMenus

        // 重新请求所有roles/department
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 7.4然后重新进行一次动态路由添加
        // 超级重要：动态添加路由,自己点过去看
        const routes = mapMenusToRoutes(userMenus)
        // console.log('routes', routes)
        // 接着传路由过去筛选
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
export default UseLoginStore
