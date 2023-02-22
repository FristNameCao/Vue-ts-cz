<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import UseLoginStore from '@/store/login/login'
import { mapPathToBreadCrumb } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
// 动态面包屑
// 1.获取store也就是pinia的所有菜单
const userMenus = UseLoginStore().userMenus
// 2.获取当前的路径
const route = useRoute()
// 3.传参路径和所有菜单进行查找筛选,这里用computed因为是动态的属性
const breadCrumbs = computed(() => {
  return mapPathToBreadCrumb(route.path, userMenus)
})
</script>

<style scoped lang="less">
.breadcrumb {
}
</style>
