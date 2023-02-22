<template>
  <div class="user">
    <userSearch @QueryClick="handleQueryClick" @ResetClick="handleResetClick" />
    <userContent
      ref="ContentRef"
      @newClick="handleNewClick"
      @editClick="handleEditClick"
    />
    <userModal ref="modal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userContent from './c-cpns/user-content.vue'
import userSearch from './c-cpns/user-search.vue'
import userModal from './c-cpns/user-modal.vue'
// 对userContent组件操作
const ContentRef = ref<InstanceType<typeof userContent>>()
// dayjs时间格式化
function handleQueryClick(formData: any) {
  ContentRef.value?.fetchUserListData(formData)
}
// 重置后重新刷新请求展示
function handleResetClick() {
  ContentRef.value?.fetchUserListData()
}
// 新建用户数据
// 获取userModal实列
const modal = ref<InstanceType<typeof userModal>>()
function handleNewClick() {
  modal.value?.newClickUser()
}
// 编辑用户
function handleEditClick(itemData: any) {
  console.log('handleEditClick', itemData)
  modal.value?.newClickUser(false, itemData)
}
</script>

<style scoped lang="less">
.user {
}
</style>
