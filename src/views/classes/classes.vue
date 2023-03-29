<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 班次
 * @params: 
 * @Date: 2023-03-08 11:05:22
 * @LastEditTime: 2023-03-29 16:33:31
-->
<template>
  <div class="page-container">
    <PageView></PageView>
    <h3>P_0830_1200_1330_1800_XX_日_60_2100</h3>
    <hr />
    <p>考勤时间段：上午：08:30:00-12:00:00 下午：13:30:00-18:00:00，弹性打卡60.0分钟</p>
    <p>晚补时间：21:00</p>
    <p>弹性周期：日</p>
  </div>
</template>

<script>
import PageView from '@/components/layouts/PageView'

export default {
  components: { PageView },

  data() {
    return {}
  }
}
</script>

<style lang="less" scope></style>

