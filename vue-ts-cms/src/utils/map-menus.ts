import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1.动态路由获取所有的路由对象，放到数组中
  // *路由对象都在独立文件中
  // *从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []
  // 2.读取router/main中所有文件
  // **/*是获取main下的所有子文件下的.ts文件
  const file: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    //  eager渴望的意思，就是渴望同时获取所有文件不再是异步
    eager: true
  })
  // console.log('file', file)
  // 3.将加载的对象放到localRoutes
  for (const key in file) {
    // 4.拿到所有文件的键值对
    const module = file[key]
    // 5.把拿到的键值对的默认路径push给localRoutes数组
    localRoutes.push(module.default)
    // console.log('module', module.default)
  }
  return localRoutes
}
// 定义第一次进去的菜单为全局
export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any) {
  // console.log('userMenus2', userMenus)
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()
  // console.log('localRoutes', localRoutes)
  // 2.根据菜单去匹配正确得路由
  // 3.重新定义个存放路由的数组
  const routes: RouteRecordRaw[] = []
  // 4.双重遍历拿到角色菜单传过来的path或者url
  for (const menu of userMenus) {
    // console.log('menu', menu)
    for (const submenu of menu.children) {
      // 5.拿到loadLocalRoutes路由配置得所有文件进行寻找相同得地址，把相同的地址通过push到一个新的数组
      const route = localRoutes.find((item) => item.path === submenu.url)
      // 6.判断有没有相同得路径

      if (route) {
        // 1.获取顶级菜单给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.二级菜单,拿到与菜单匹配的路由
        routes.push(route)
      }
      // 把菜单给firstMenu,记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}
/**
 *根据路径去匹配需要显示的菜单
 * @param path  需要匹配的路径
 * @param userMenus 所有菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  // console.log('path', path)
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      // console.log('submenu.url', submenu.url)
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

/**
 *根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
interface IBreadCrumbs {
  name: string
  path: string
}
export function mapPathToBreadCrumb(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadCrumbs: IBreadCrumbs[] = []
  // 2.遍历获取面包屑
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.获取顶级菜单

        breadCrumbs.push({ name: menu.name, path: menu.url })
        // 2.二级菜单
        breadCrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadCrumbs
}
