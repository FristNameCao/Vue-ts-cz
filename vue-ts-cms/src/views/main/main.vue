<template>
  <div class="main">
    <el-container class="el-container">
      <el-aside :width="isFold ? '60px' : '240px'" class="el-aside">
        <mainMenu :isFold="isFold"></mainMenu>
      </el-aside>
      <el-container class="el-container">
        <el-header class="el-header" height="50px"
          ><mainHeader @foldChange="handleFoldClick"
        /></el-header>
        <!--main占位符 -->
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { LOGIN_TOKEN } from '@/global/constants'
import { ref } from 'vue'
// 处理menu-header折叠变化
const isFold = ref(false)
function handleFoldClick(flag: boolean) {
  isFold.value = flag
}
// import router from '@/router'
// import { localCache } from '@/utils/cache'
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

// function handleExitClick() {
//   localCache.removeCache(LOGIN_TOKEN)
//   router.push('/Login')
// }
</script>

<style scoped lang="less">
.main {
  height: 100%;

  .el-container {
    height: 100%;
    .el-aside {
      background-color: rgb(11, 30, 53);
      cursor: pointer;
      overflow-x: hidden;
      overflow-y: auto;
      transition: width 0.3s linear;
      scrollbar-width: none; //删除滚动条/*firefox*/
      -ms-overflow-style: none; //IE10
      transition: width 1s ease;
      &::-webkit-scrollbar {
        // 隐藏滚动条
        display: none;
      }
    }
    .el-header {
      background-color: antiquewhite;
    }
    .el-main {
    }
  }
}
</style>
