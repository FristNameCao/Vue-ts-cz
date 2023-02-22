<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <!-- <el-icon size="24px"><Fold /></el-icon>
      <el-icon size="24px"><Expand /></el-icon> -->
      <el-icon size="24px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb"><headerBreadcrumb /></div>
      <div class="info"><headerInfo /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import headerInfo from './c-cpns/header-info.vue'
import headerBreadcrumb from './c-cpns/header-breadcrumb.vue'
import type { Expand } from '@element-plus/icons-vue'
import { ref } from 'vue'
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
function handleMenuIconClick() {
  // 1.改变内部状态
  isFold.value = !isFold.value
  // 2.将时间状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
