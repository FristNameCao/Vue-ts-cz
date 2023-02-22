import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/map-menus'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/Login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
      // children: [
      // {
      //   path: 'overview',
      //   component: () => import('@/views/main/analysis/overview/overview.vue')
      // },
      // {
      //   path: 'dashboard',
      //   component: () =>
      //     import('@/views/main/analysis/dashboard/dashboard.vue')
      // },
      // {
      //   path: 'role',
      //   component: () => import('@/views/main/system/role/role.vue')
      // },
      // {
      //   path: 'department',
      //   component: () =>
      //     import('@/views/main/system/department/department.vue')
      // },
      // {
      //   path: 'menu',
      //   component: () => import('@/views/main/system/menu/menu.vue')
      // },
      // {
      //   path: 'user',
      //   component: () => import('@/views/main/system/user/user.vue')
      // }
      // ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-Found/NotFound.vue')
    }
  ]
})
// 登录导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/Login'
  }
  if (to.path === '/main') return firstMenu.url
})
export default router
