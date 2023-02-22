<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">CC后台管理系统</h2>
    </div>
    <div class="menu">
      <!-- 2.menu -->
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFold"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串：el-icon-monitor -->
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import UseLoginStore from '@/store/login/login'
import type { Fold } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { firstMenu, mapPathToMenu } from '@/utils/map-menus'
import { ref, computed } from 'vue'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
// import { Message, type Monitor } from '@element-plus/icons-vue'
//1. role登录后渲染界面,获取动态菜单
const loginStore = UseLoginStore()
const userMenus = loginStore.userMenus
// console.log('userMenus', userMenus)
const router = useRouter()

// 2.监听item路由的点击
function handleItemClick(item: any) {
  const url = item.url
  // console.log('url', url)
  // console.log('route', route.path)
  router.push(url)
}

//3.获取上面点击时候的path rote可以获取router当时push的path
const route = useRoute()

//3.1然后定义一个别名,传过去现在点击的path和所有的path层层遍历找相同
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})

// const first = ref(firstMenu.id + '')
</script>

<style scoped lang="less">
.main-menu {
  // .el-menu-item:hover {
  //   background-color: rgb(28, 110, 208);
  // }
  height: 100%;
  background-color: #0c2135;
  .logo {
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
    color: pink;
    // overflow: auto;
    .img {
      height: 100%;
      // 上下和左右
      margin: 0 10px;
    }
    .title {
      // font-weight: 400;
      float: right;
      font-size: 16px;
    }
  }
  .el-menu {
    border-right: none;
    user-select: none;
  }
  .el-sub-menu {
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }
    .el-menu-item:hover {
      color: #fff;
      // background-color: #0a60bd;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
