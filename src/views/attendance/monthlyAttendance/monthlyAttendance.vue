<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 月考勤
 * @params: 
 * @Date: 2023-03-08 16:22:28
 * @LastEditTime: 2023-03-22 13:37:56
-->
<template>
  <div class="monthlyAttendance-container page-container">
    <div><span class="mr-20">考勤周期 </span><a-month-picker v-model="monthDate" /></div>
    <div v-if="monthlyData" class="month-attendance-info">
      <a-descriptions title="考勤详情" bordered :column="1" size="small">
        <a-descriptions-item v-for="item in column.first" :label="item.label">
          {{ monthlyData[item.key] }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="迟到" bordered :column="1" style="margin-top:15px" size="small">
        <a-descriptions-item v-for="item in column.second" :label="item.label">
          {{ monthlyData[item.key] }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="早退" bordered :column="1" style="margin-top:15px" size="small">
        <a-descriptions-item v-for="item in column.third" :label="item.label">
          {{ monthlyData[item.key] }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="擅自离岗" bordered :column="1" style="margin-top:15px" size="small">
        <a-descriptions-item v-for="item in column.fourth" :label="item.label">
          {{ monthlyData[item.key] }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="旷工" bordered :column="1" style="margin-top:15px" size="small">
        <a-descriptions-item v-for="item in column.fifth" :label="item.label">
          {{ monthlyData[item.key] }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="其他" bordered :column="1" style="margin-top:15px" size="small">
        <a-descriptions-item v-for="item in column.sixth" :label="item.label">
          {{ monthlyData[item.key] }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div v-else class="empty-info flex-center"><a-empty description="无考勤记录" style="margin:auto 8px" /></div>
  </div>
</template>

<script>
import moment from 'moment'
import { getMonthlyAttendance } from '@/api/myAttendance.js'
import { column } from './data'
export default {
  data() {
    return {
      monthDate: null,
      monthlyData: null,
      column
    }
  },
  watch: {
    monthDate(newVal) {
      let date = newVal.format('YYYY-MM').replace('-', '')
      this.getData(date)
    }
  },
  created() {
    console.log('初始化月记录')
    this.initCurrentDate()
  },
  methods: {
    initCurrentDate() {
      this.monthDate = moment()
    },
    // 获取月考勤数据
    async getData(date) {
      let res = await getMonthlyAttendance({ signDate: date })
      console.log('😍2023-03-13 res', res)
      if (res.code == 200) {
        this.monthlyData = res.result
      } else {
        this.monthlyData = null
      }
    }
  }
}
</script>

<style lang="less" scope>
.monthlyAttendance-container {
  .month-attendance-info {
    padding: 15px;
    box-sizing: border-box;
  }
  .empty-info {
    height: 500px;
  }
  .ant-descriptions-bordered .ant-descriptions-item-label {
    width: 400px;
  }
}
</style>

