<template>
  <div class="department">
    <pageSearch
      @query-click="handleQueryClick"
      @ResetClick="handleResetClick"
    />
    <pageContent
      ref="Content"
      @newClick="handleNewClick"
      @editClick="handleEditClick"
    />
    <pageModal ref="modal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'
// 点击search，传数据给content
const Content = ref<InstanceType<typeof pageContent>>()

// 查询
function handleQueryClick(queryInfo: any) {
  Content.value?.fetchUserListData(queryInfo)
}
// 重置
function handleResetClick() {
  Content.value?.fetchUserListData()
}
// 新建
const modal = ref<InstanceType<typeof pageModal>>()
function handleNewClick() {
  modal.value?.newClickUser()
}
// 编辑
function handleEditClick(itemData: any) {
  console.log('itemData', itemData)
  modal.value?.newClickUser(false, itemData)
}
</script>

<style scoped lang="less">
.system {
}
</style>
