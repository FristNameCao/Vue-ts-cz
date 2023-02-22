import { defineStore } from 'pinia'
import {
  postUserListData,
  deleteUserId,
  newUserData,
  editUserData,
  postPageLIstData,
  newPageData,
  postDeletePageId,
  editPageListData
} from '@/service/main/system/system'
import type { IsSystemSate } from './types'

// system用户管理数据请求
const useSystemStore = defineStore('system', {
  state: (): IsSystemSate => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 获取用户列表请求
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUserListData(queryInfo)
      console.log('userListResult', userListResult)
      const { totalCount, list } = userListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
      // console.log('queryInfo111', queryInfo)
    },
    async deleUserByIdAction(id: number) {
      // 删除数据操作
      const userDeleteResult = await deleteUserId(id)
      // 删除后重新调用，接着offset: 0, size: 10意思就是重新从第一页开始
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的数据
      const newUser = await newUserData(userInfo)
      // 2.创建后自动再次请求数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.发送编辑后的数据
      const editResult = await editUserData(id, userInfo)
      console.log('editResult', editResult)

      // 2.重新请求数据刷新
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageLIstData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
      console.log('pageListResult', pageListResult)
    },
    async newPageDataAction(pageName: string, userInfo: any) {
      // 1.创建添加新的数据
      const newUser = await newPageData(pageName, userInfo)
      console.log('newUser', newUser)
      // 2.创建后自动再次请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async delePageByIdAction(pageName: string, id: number) {
      // 删除数据操作
      const userDeleteResult = await postDeletePageId(pageName, id)
      // 删除后重新调用，接着offset: 0, size: 10意思就是重新从第一页开始
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      // 1.发送编辑后的数据
      const editResult = await editPageListData(pageName, id, pageInfo)
      console.log('editResult', editResult)
      // 2.重新请求数据刷新
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
