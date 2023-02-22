<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="login-title">CZ后台管理系统</h1>
    <!-- 中间的tabs切换 -->
    <div class="login-tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.账号登陆 -->
        <el-tab-pane name="account">
          <template #label>
            <el-icon><UserFilled /></el-icon>
            <span class="login-account">登录账号</span>
          </template>
          <PaneAccount ref="accountRef" />
        </el-tab-pane>
        <!-- 2.手机登陆 -->

        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="login-phone">手机登录</span>
          </template>
          <PanePhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部区域 -->
    <div class="login-remember">
      <el-checkbox v-model="isRemPsd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
      >登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
// 记住密码
const isRemPsd = ref<boolean>(false)

// tabs切换，用户和手机
const activeName = ref<string>('account')

// 登录
// <InstanceType<typeof PaneAccount>>拿到一个组件实列
const accountRef = ref<InstanceType<typeof PaneAccount>>()
function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPsd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  .login-title {
    text-align: center;
    margin-bottom: 14px;
  }
  width: 300px;
  .login-tabs {
    margin-bottom: 14px;
    .login-account {
      margin-left: 5px;
    }
    .login-phone {
      margin-left: 5px;
    }
  }
  .login-remember {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
