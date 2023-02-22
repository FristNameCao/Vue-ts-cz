<template>
  <div class="content">
    <!-- 数据表头 -->
    <div class="header">
      <h2 class="title">部门列表</h2>
      <el-button type="primary" @click="handleNewClick">新建部门</el-button>
    </div>
    <!-- 数据列表 -->
    <div class="users-list">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="selection" width="50px" />
        <el-table-column type="index" width="60px" label="序号" />
        <el-table-column prop="name" label="部门名称" width="140px" />
        <el-table-column prop="leader" label="领导名称" width="140px" />
        <el-table-column prop="parentId" label="上级部门" width="180px" />
        <!-- <el-table-column prop="enable" label="状态" width="80px">
          <template #default="scoped">
            <el-button
              size="small"
              :type="scoped.row.enable ? 'primary' : 'danger'"
            >
              {{ scoped.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column> -->
        <el-table-column prop="createAt" label="创建时间">
          <template #default="scoped">
            {{ formatUtc(scoped.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间">
          <template #default="scoped">
            {{ formatUtc(scoped.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template #default="scoped">
            <el-button
              size="small"
              text
              icon="Edit"
              type="primary"
              @click="handleEditClick(scoped.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              text
              icon="Delete"
              type="primary"
              @click="handleDeleClick(scoped.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { formatUtc } from '@/utils/dayjs'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
// 1.发起action网络，请usersList求数据
const systemStore = useSystemStore()

// 页码定义和页码数据请求
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()
// 2.获取userList数据，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// console.log('usersTotalCount', usersTotalCount)

// 3.分页相关的逻辑，点击就调用函数
// 每一页多少条数据
function handleSizeChange() {
  fetchUserListData()
}
// 当前页数
function handleCurrentChange() {
  fetchUserListData()
}

// 4.定义函数，用于发送网络请求
function fetchUserListData(formData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }
  // console.log('queryInfo', queryInfo)
  // 2.发起网络请求
  systemStore.postPageListAction('department', queryInfo)
}

// 5.删除监听
function handleDeleClick(id: number) {
  systemStore.delePageByIdAction('department', id)
}
// 6.新建用户操作
const emit = defineEmits(['newClick', 'editClick'])
function handleNewClick() {
  emit('newClick')
}
// 7.编辑用户
function handleEditClick(itemData: any) {
  emit('editClick', itemData)
}

// 暴露函数
defineExpose({ fetchUserListData })
//  :cell-style="{ textAlign: 'center' }" 表格居中
// :header-cell-style="{ textAlign: 'center' }" 表头居中两个必须一起使用
</script>

<style scoped lang="less">
.content {
  background-color: #fff;
  margin-top: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 20px;
  }
  .users-list {
    // .el-table .el-table__cell {
    //   text-align: center;
    // }
    // :where(.el-table .el-table_cell) {
    // }
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
