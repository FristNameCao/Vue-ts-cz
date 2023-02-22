import { defineStore } from 'pinia'
import { getEntireRoles, getEntireDepartments } from '@/service/main/main'

// 获取所有角色和所有部门数据 role/department

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const entireRoles = await getEntireRoles()
      const entireDepartments = await getEntireDepartments()
      // 保存数据role/department
      this.entireRoles = entireRoles.data.list
      this.entireDepartments = entireDepartments.data.list
      // console.log('this.entireRoles', this.entireRoles)
      // console.log('this.entireDepartments', this.entireDepartments)
    }
  }
})

export default useMainStore
