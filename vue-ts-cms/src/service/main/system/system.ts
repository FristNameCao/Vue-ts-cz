import hyRequest from '@/service'

// 用户的网络请求
export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
// 删除请求
export function deleteUserId(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
// 添加请求
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}
// 编辑请求
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 所有page请求
export function postPageLIstData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
// Page新建请求
export function newPageData(pageName: string, userInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: userInfo
  })
}

// 所有删除请求
export function postDeletePageId(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}
// 所有编辑请求
export function editPageListData(pageName: string, id: number, userInfo: any) {
  return hyRequest.patch({
    url: ` /${pageName}/${id}`,
    data: userInfo
  })
}
