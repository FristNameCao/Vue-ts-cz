<template>
  <!-- 用户登录 -->
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="AccountRules"
      status-icon
      ref="formRef"
      label-width="60px"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import UseLoginStore from '@/store/login/login'
import { reactive } from 'vue'
import { ref } from 'vue'
import type { FormRules } from 'element-plus'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
// 1.双向绑定
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2.账户校验
const AccountRules: FormRules = {
  name: [
    { required: true, message: '账户内容不能为空', trigger: 'blur' },
    {
      min: 6,
      max: 24,
      pattern: /^[a-z0-9]{6,24}$/,
      message: '账户长度为6~24位数字或字母组成',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,24}$/,
      message: '账户长度为6~24位数字或字母组成',
      trigger: 'change'
    }
  ]
}

// 3.登录逻辑
const loginStore = UseLoginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
//isRemPsd是另一个组件传过来的判断是否勾选了
function loginAction(isRemPsd: boolean) {
  formRef.value?.validate((valid, fields) => {
    if (valid) {
      // 1.获取用户输入账号和密码
      const name = account.name
      const password = account.password
      //2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPsd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('输入信息错误请重新输入.')
    }
  })
}
defineExpose({ loginAction })
</script>

<style scoped lang="less">
.pane-account {
}
</style>
