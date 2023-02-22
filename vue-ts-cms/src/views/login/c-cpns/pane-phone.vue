<template>
  <div class="pane-phone">
    <el-form label-width="60px">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="phone-code">
          <el-input />
          <el-button class="phone-btn" type="primary"> 获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.pane-phone {
  .phone-code {
    display: flex;
    .phone-btn {
      margin-left: 4px;
    }
  }
}
</style>
