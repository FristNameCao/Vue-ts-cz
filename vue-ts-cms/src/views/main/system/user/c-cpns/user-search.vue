<template>
  <div class="user-search">
    <!-- 1.搜索关键字表单 -->
    <el-form label-width="140px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="状态"
              style="width: 100%"
            >
              <el-option label="开启" :value="1" />
              <el-option label="禁止" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              start-placeholder="开始"
              end-placeholder="结束"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 2.重置和搜索按钮 -->
    <div class="btn">
      <el-button icon="Refresh" type="primary" @click="handleResetClick"
        >重置</el-button
      >
      <el-button icon="Search" @click="handleQueryClick">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
// 定义自定义事件
const emit = defineEmits(['QueryClick', 'ResetClick'])
// 定义数据
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

// 重置数据操作
const formRef = ref<InstanceType<typeof ElForm>>()

function handleResetClick() {
  formRef.value?.resetFields()
  // 将事件传出去，content内部重新发送网络请求
  emit('ResetClick')
}
// 搜索
function handleQueryClick() {
  // console.log('searchForm', searchForm)
  // console.log('formRef', formRef)
  emit('QueryClick', searchForm)
}
</script>

<style scoped lang="less">
.user-search {
  padding: 20px;
  background-color: #fff;
  .el-form-item {
    padding: 24px 30px;
    margin-bottom: 0px;
  }
  .btn {
    text-align: right;
  }
}
</style>
