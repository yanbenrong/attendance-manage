<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 日考勤记录
 * @params: 
 * @Date: 2023-03-08 11:05:22
 * @LastEditTime: 2023-03-08 21:06:07
-->
<template>
  <div class="dailyAttendance-container page-container">
    <div class="left-calendar">
      <a-calendar @panelChange="onPanelChange" @select="selectChange" :header-render="headerRender">
        <template slot="dateCellRender" slot-scope="value">
          <a-badge v-if="isYcDateCell(value)" dot :offset="[5, 0]">
            <div class="yc-font">考勤异常</div>
          </a-badge>
        </template>
        <!-- <template slot="dateFullCellRender" slot-scope="value">
          {{ value.date() }}
        </template> -->
      </a-calendar>
    </div>
    <div class="right-info">
      <a-card
        :title="`${nowDate} 考勤详情`"
        style="box-shadow: rgb(206 206 206) 0px 0px 9px 0px;border-radius: 5px;height: 100%;"
        :bodyStyle="{ height: 'calc(100% - 48px)' }"
      >
        <div v-if="false" class="info-data">
          <p>
            <span class="mr-20">08：30：00</span><span class="mr-20">上班</span
            ><span class="mr-20">打卡(08：45：23)</span>
          </p>
          <p>
            <span class="mr-20">18：00：00</span><span class="mr-20">下班</span
            ><span class="mr-20">打卡(08：45：23)</span>
          </p>
          <hr />
        </div>
        <div v-else class="flex-center" style="height:100%"><a-empty description="暂时无考勤记录" /></div>
      </a-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      nowDate: '', // 当前时间
      ycData: ['2023-03-01'] // 考勤异常数据
    }
  },
  created() {
    this.initNowDate()
  },
  methods: {
    // 初始化当前日期
    initNowDate() {
      this.nowDate = moment().format('YYYY-MM-DD') // 转换为指定格式的字符串
    },
    // 日期面板变化回调
    onPanelChange(value, mode) {
      console.log('面板变化回调', value, mode)
    },
    // 点击选择日期回调
    selectChange(date) {
      console.log('日期变化回调', date.format('YYYY-MM-DD'))
      this.nowDate = date.format('YYYY-MM-DD')
    },
    // 自定义日历头部
    headerRender({ value, onChange }) {
      const start = 0
      const end = 12
      const monthOptions = []

      const current = value.clone()
      const localeData = value.localeData()
      const months = []
      for (let i = 0; i < 12; i++) {
        current.month(i)
        months.push(localeData.monthsShort(current))
      }

      for (let index = start; index < end; index++) {
        monthOptions.push(
          <a-select-option class="month-item" key={`${index}`}>
            {months[index]}
          </a-select-option>
        )
      }
      const month = value.month()

      const year = value.year()
      const options = []
      for (let i = year - 10; i < year + 10; i += 1) {
        options.push(
          <a-select-option key={i} value={i} class="year-item">
            {i}
          </a-select-option>
        )
      }
      return (
        <div style={{ padding: '20px 17px' }}>
          <a-row gutter={16} type="flex" align="middle">
            <a-col>
              <a-select
                size="small"
                dropdownMatchSelectWidth={false}
                class="my-year-select"
                onChange={newYear => {
                  const now = value.clone().year(newYear)
                  onChange(now)
                }}
                value={String(year)}
              >
                {options}
              </a-select>
            </a-col>
            <a-col>
              <a-select
                size="small"
                dropdownMatchSelectWidth={false}
                value={String(month)}
                onChange={selectedMonth => {
                  const newValue = value.clone()
                  newValue.month(parseInt(selectedMonth, 10))
                  onChange(newValue)
                }}
              >
                {monthOptions}
              </a-select>
            </a-col>
            <a-col>
              <a-button type="primary">查看打卡数据</a-button>
            </a-col>
          </a-row>
        </div>
      )
    },
    // 判断日历单元格是否考勤异常
    isYcDateCell(value) {
      return this.ycData.includes(value.format('YYYY-MM-DD'))
    }
  }
}
</script>

<style lang="less" scope>
.dailyAttendance-container {
  display: flex;
  justify-content: space-between;
  .left-calendar {
    width: 62.5%;
    border: 1px solid #1890ff;
    border-radius: 5px;

    .yc-font {
      font-size: 14px;
    }
  }
  .right-info {
    width: 32.5%;

    .info-data {
    }
  }

  // antd日历样式修改
  .ant-fullcalendar-fullscreen .ant-fullcalendar-value {
    font-size: 24px;
    text-align: center;
  }
  .ant-fullcalendar-value {
    height: 80px;
    line-height: 80px;
  }

  .ant-fullcalendar-fullscreen .ant-fullcalendar-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    transform: translateY(-22px);
  }
  .ant-fullcalendar-fullscreen .ant-fullcalendar-column-header {
    padding-right: 0;
    text-align: center;
  }
}
</style>

