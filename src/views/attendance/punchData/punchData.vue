<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 
 * @params: 
 * @Date: 2023-03-13 15:05:40
 * @LastEditTime: 2023-03-15 11:16:07
-->
<template>
  <a-card :bordered="false">
    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
      :showAlertInfo="false"
      @onSelect="onChange"
      rowKey="no"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import STable from '@/components/table/'
import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'
import { getRoleList } from '@/api/manage'
import { getDailyPunchData } from '@/api/myAttendance.js'

export default {
  name: 'TableList',
  components: {
    AInput,
    ATextarea,
    STable
  },
  data() {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '姓名',
          dataIndex: 'id'
        },
        {
          title: '工号',
          dataIndex: 'jobId'
        },
        {
          title: '部门',
          dataIndex: 'deptName'
        },
        {
          title: '打卡时间',
          dataIndex: 'signTime',
          sorter: true
        },
        {
          title: '打卡地址',
          dataIndex: 'signAddress'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('😍2023-03-13 parameter', parameter)
        // return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
        //   return res.result
        // })
        return getDailyPunchData(Object.assign(parameter, { selMonth: this.$route.params.date })).then(res => {
          return res.result.records
        })
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  async created() {
    getRoleList({ t: new Date() })
    console.log('😍2023-03-14 params参数', this.$route.params.date)
    // let res = await getDailyPunchData({ selMonth: this.$route.params.date, pageNo: 1, pageSize: 10 })
    // console.log('😍2023-03-13 res', res)
  },
  methods: {
    onChange(row) {
      this.selectedRowKeys = row.selectedRowKeys
      this.selectedRows = row.selectedRows

      console.log(this.$refs.table)
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>

