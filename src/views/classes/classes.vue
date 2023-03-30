<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 班次
 * @params: 
 * @Date: 2023-03-08 11:05:22
 * @LastEditTime: 2023-03-30 14:45:20
-->
<template>
  <div class="page-container">
    <PageView></PageView>
    <h3>{{ classesMerge }}</h3>
    <hr />
    <p>
      考勤时间段：上午：{{ classesInfo.amStartTime || '' }}-{{ classesInfo.amEndTime || '' }} 下午：{{
        classesInfo.pmStartTime || ''
      }}-{{ classesInfo.pmEndTime || '' }}，弹性打卡{{ classesInfo.elasticMins || '' }}分钟
    </p>
    <p>晚补时间：{{ classesInfo.dinnerTime || '' }}</p>
    <p>弹性周期：{{ elasticPeriodEnum[classesInfo.elasticPeriod || 0] }}</p>
  </div>
</template>

<script>
import PageView from '@/components/layouts/PageView'
import { getWorkTime } from '@/api/myAttendance.js'

export default {
  components: { PageView },

  data() {
    return {
      classesInfo: {},
      elasticPeriodEnum: { 0: '日', 1: '星期', 2: '月', 3: '年' }
    }
  },
  computed: {
    classesMerge() {
      if (JSON.stringify(this.classesInfo) !== '{}') {
        let ams = this.classesInfo.amStartTime.replace(':', '')
        let ame = this.classesInfo.amEndTime.replace(':', '')
        let pms = this.classesInfo.pmStartTime.replace(':', '')
        let pme = this.classesInfo.amStartTime.replace(':', '')
        let dt = this.classesInfo.dinnerTime.replace(':', '')
        let em = this.classesInfo.elasticMins
        return `P_${ams}_${ame}_${pms}_${pme}_XX_${
          this.elasticPeriodEnum[this.classesInfo.elasticPeriod || 0]
        }_${em}_${dt}`
      }
      return ''
    }
  },
  created() {
    this.getWorkTimeFunc()
  },
  methods: {
    async getWorkTimeFunc() {
      const res = await getWorkTime()
      console.log('班次查询', res)
      if (res.code === 200) {
        this.classesInfo = res.result
      }
    }
  }
}
</script>

<style lang="less" scope></style>

