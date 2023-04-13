<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description:  申请记录
 * @params: 
 * @Date: 2023-03-21 09:54:03
 * @LastEditTime: 2023-03-31 16:57:39
-->
<template>
  <div class="page-container record-container">
    <div class="tab">
      <a-tabs v-model="activeKey" type="card" @change="tabChange">
        <a-tab-pane v-for="item in panes" :key="item.key" :tab="`${item.title} (${item.total})`"></a-tab-pane>
      </a-tabs>
      <a-table
        v-if="columnObj[activeKey]"
        :locale="{ emptyText: '空' }"
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        rowKey="id"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="toView(record.id)">查看</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="Sure to cancel?"
            @confirm="() => editApplyRecordFunc(record.id)"
            :disabled="record.examineStatus === '09'"
          >
            <a @click="revocation(record.examineStatus)">撤销</a>
          </a-popconfirm>
        </span>
      </a-table>
      <!-- <s-table
        v-if="columnObj[activeKey]"
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        :showAlertInfo="false"
        rowKey="id"
      >
      </s-table> -->
      <a-empty v-else />
    </div>
  </div>
</template>

<script>
import { getApplyRecordList, getApplytypeList, editApplyRecord } from '@/api/myAttendance.js'
import STable from '@/components/table/'
import { casualLeaveColumn, compensatoryLeaveColumn, retroactiveColumn, onBusinessColumn } from './data'

let columnObj = {
  事假: casualLeaveColumn, // 事假
  补休: compensatoryLeaveColumn, // 补休
  补签: retroactiveColumn, // 补签
  公出: onBusinessColumn // 公出
}
export default {
  components: {
    STable
  },
  data() {
    return {
      pagination: { pageSize: 5 }, // 分页
      panes: [], // 审批分类
      activeKey: '', // 当前选中
      queryParam: {}, // 查询参数
      columns: casualLeaveColumn, // 表头
      columnObj,
      data: []
      // loadData: () => {
      //   return getApplyRecordList().then(res => {
      //     console.log('res', res)
      //     if (res.result) return res.result
      //     return []
      //   })
      // }
    }
  },
  created() {
    this.getApplytypeListFunc()
  },
  mounted() {},
  methods: {
    tabChange(key) {
      this.activeKey = key
      this.columns = columnObj[key]
      let target = this.panes.find(item => item.title === key)
      console.log('target', target)
      this.getApplyRecordListFunc({ flowType: target.flowType || '', leaveType: target.leaveType || '' })
    },
    // 获取申请数据
    async getApplyRecordListFunc({ flowType, leaveType }) {
      getApplyRecordList({ flowType, leaveType }).then(res => {
        console.log('res', res)
        if (res.result.records) {
          this.data = res.result.records
        }
      })
    },
    // 撤销申请
    async editApplyRecordFunc(id) {
      const res = await editApplyRecord({ id })
      if (res.code === 200) {
        this.$message.success('撤销成功')
      }
    },
    // 点击撤销
    revocation(status) {
      if (status === '09') {
        this.$message.error('该状态下不可撤销')
      }
    },
    // 点击查看
    toView(id) {
      this.$router.push({ path: '/applicationRecord/applicationDetail', query: { id } })
    },
    // 获取申请分类
    async getApplytypeListFunc() {
      const res = await getApplytypeList()
      console.log('申请分类数据', res)
      if (res.code === 200) {
        res.result.flowTypeList.forEach(element => {
          const tempObj = {
            title: element.flowText,
            key: element.flowText,
            total: element.num,
            flowType: element.flowType
          }
          this.panes.push(tempObj)
        })
        res.result.leaveTypeList.forEach(element => {
          const tempObj = {
            title: element.leaveText,
            key: element.leaveText,
            total: element.num,
            flowType: element.flow_type,
            leaveType: element.leaveType
          }
          this.panes.push(tempObj)
        })
        this.activeKey = this.panes[0].title
        let target = this.panes.find(item => item.title === this.panes[0].title)
        this.getApplyRecordListFunc({ flowType: target.flowType || '', leaveType: target.leaveType || '' })
      }
    }
  }
}
</script>

<style lang="less" scope></style>

