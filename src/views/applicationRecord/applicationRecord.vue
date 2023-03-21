<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 
 * @params: 
 * @Date: 2023-03-21 09:54:03
 * @LastEditTime: 2023-03-21 11:00:30
-->
<template>
  <div class="page-container record-container">
    <div class="tab">
      <a-tabs v-model="activeKey" type="card" @change="tabChange">
        <a-tab-pane v-for="item in panes" :key="item.key" :tab="`${item.title} (${item.total})`"></a-tab-pane>
      </a-tabs>
      <s-table
        v-if="columnObj[activeKey]"
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        :showAlertInfo="false"
        @onSelect="onChange"
        rowKey="no"
      >
      </s-table>
      <a-empty v-else />
    </div>
  </div>
</template>

<script>
import STable from '@/components/table/'
import { casualLeaveColumn, compensatoryLeaveColumn, retroactiveColumn, onBusinessColumn } from './data'

let columnObj = {
  '1': casualLeaveColumn,
  '2': compensatoryLeaveColumn,
  '3': retroactiveColumn,
  '5': onBusinessColumn
}
export default {
  components: {
    STable
  },
  data() {
    return {
      panes: [
        { title: '事假', key: '1', total: 0 },
        { title: '补休', key: '2', total: 16 },
        { title: '补签', key: '3', total: 10 },
        { title: '延时工作/加班', key: '4', total: 0 },
        { title: '公出', key: '5', total: 0 }
      ],
      activeKey: '1',
      // 查询参数
      queryParam: {},
      // 表头
      columns: casualLeaveColumn,
      columnObj,
      loadData: () => {
        return Promise.resolve([
          {
            name: 'wwww',
            type: '补签',
            retroactiveTime: '2022-10-2',
            retroactiveType: '补签',
            state: '通过',
            approver: 'sss',
            retroactiveReason: '忘打卡'
          }
        ])
      }
    }
  },
  methods: {
    tabChange(key) {
      this.activeKey = key
      this.columns = columnObj[key]
    }
  }
}
</script>

<style lang="less" scope></style>

