<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px" size="large">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称">
          </el-input>
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入领导名称">
          </el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="formData.parentId" style="width: 100%">
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.parentId" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password" v-if="isNewRef">
          <el-input
            v-model="formData.password"
            show-password
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入手机号">
          </el-input>
        </el-form-item> -->
        <!-- <el-form-item label="选择角色" prop="roleId">
          <el-select
            v-model="formData.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <template v-for="role in entireRoles" :key="role.id">
              <el-option :label="role.name" :value="role.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select
            v-model="formData.departmentId"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'

// 新建用户名称
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
// 保存编辑id
const editData = reactive<any>({})

// 新建时候出现密码,编辑时候密码位false,也作为新建用户和编辑用户的区分
const isNewRef = ref(true)
// 定义新建开关
const dialogVisible = ref(false)
// 拦截导出界面
function newClickUser(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true

  // 如果编辑传数据过来就获取数据,并且保留id

  if (!isNew && itemData) {
    isNewRef.value = false
    editData.value = itemData
    for (const key in itemData) {
      formData[key] = itemData[key]
    }
  } else {
    // 如果不是编辑页面就是null
    editData.value = null
    // 如果编辑没传数据过来就初始化成为新建
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

// 定义获取数据
const mainStore = useMainStore()
// 定义添加数据
const systemStore = useSystemStore()
// 获取所有roles/department
const { entireDepartments } = mainStore

// 确定,创建数据
function handleConfirm() {
  dialogVisible.value = false
  // 新创建数据请求
  if (isNewRef.value) {
    systemStore.newPageDataAction('department', formData)
  } else {
    // 编辑创建数据请求
    systemStore.editPageDataAction('department', editData.value.id, formData)
  }
}
defineExpose({ newClickUser })
</script>

<style scoped lang="less">
.modal {
}
</style>
