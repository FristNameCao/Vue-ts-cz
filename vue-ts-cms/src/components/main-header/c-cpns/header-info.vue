<template>
  <div class="header-info">
    <div class="info">
      <el-dropdown>
        <span class="userInfo">
          <el-avatar
            :size="30"
            src="https://s1.ax1x.com/2023/02/13/pSo3FKA.jpg"
            class="avatar"
          />
          <span class="name">曹志</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import type { CircleClose } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleExitClick() {
  // 1.移除缓存
  localCache.removeCache(LOGIN_TOKEN)
  // 2.跳转路由
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  .userInfo {
    display: flex;
    align-items: center;
  }
  .name {
    cursor: pointer;
    margin-left: 5px;
  }
  .info {
    :global(.el-dropdown-menu_item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
