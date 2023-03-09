<template>
  <div class="monthlyAttendance-container page-container">
    <div><span class="mr-20">考勤周期 </span><a-month-picker /></div>
    <div v-if="false" class="month-attendance-info">
      <a-descriptions title="考勤详情" bordered :column="1">
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="早退" bordered :column="1" style="margin-top:15px">
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="擅自离岗" bordered :column="1" style="margin-top:15px">
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="旷工" bordered :column="1" style="margin-top:15px">
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="其他" bordered :column="1" style="margin-top:15px">
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
        <a-descriptions-item label="当月应该出勤(天)">
          0
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div v-else class="empty-info flex-center"><a-empty description="无考勤记录" style="margin:auto 8px" /></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
}
</style>

