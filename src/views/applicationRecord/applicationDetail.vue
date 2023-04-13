<template>
  <div class="info-right">
    <template v-if="JSON.stringify(processInfo) !== '{}'">
      <div class="info-right-title">
        申请详情
      </div>
      <div class="info-right-content">
        <a-descriptions title="申请信息" :column="2">
          <a-descriptions-item label="姓名">
            {{ processInfo.userName || '--' }}
          </a-descriptions-item>
          <!-- <a-descriptions-item label="工号">
                {{ processInfo.userName || '--' }}
              </a-descriptions-item> -->
          <a-descriptions-item label="开始日期">
            {{ processInfo.leaveStartTime || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="结束日期">
            {{ processInfo.leaveEndTime || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="公出地点">
            {{ processInfo.outPlace || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="公出时长">
            {{ processInfo.outDays || '--' }}天 / {{ processInfo.leaveHours || '--' }}小时
          </a-descriptions-item>
          <a-descriptions-item label="申请时间">
            {{ processInfo.createdDate || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="公出说明">
            {{ processInfo.leaveRemake || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="流水号">
            {{ processInfo.processId || '--' }}
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="申请状态" :column="2">
          <a-descriptions-item label="发起人" :span="2">
            {{ processInfo.userName || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="审批状态" :span="2">
            {{ examineStatus[processInfo.examineStatus] || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="当前审批人" :span="2">
            {{ processInfo.examineUserName || '--' }}
          </a-descriptions-item>
          <a-descriptions-item v-for="item in processInfo.examineVoList" label="下级审批人" :span="2">
            {{ item.examineUserName }}&nbsp; &nbsp;{{ item.examineTime }}&nbsp;&nbsp;
            {{ examineStatus[item.examineStatus] }}&nbsp;&nbsp; 审批意见:
            {{ item.examineOption }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </template>
    <div v-else class="empty flex-center">
      <a-empty />
    </div>
  </div>
</template>

<script>
import { getExamineInfoById } from '@/api/myAttendance.js'

export default {
  data() {
    return {
      processInfo: {} // 申请信息
    }
  },
  created() {
    console.log('打印query', this.$route.query)
    this.getExamineInfo(this.$route.query.id)
  },
  methods: {
    // 获取流程审批详情
    async getExamineInfo(id) {
      let res = await getExamineInfoById({ id })
      console.log('获取流程审批详情', res)
      if (res.result) {
        this.processInfo = res.result
      }
    }
  }
}
</script>

<style lang="less" scope>
.info-right {
  border-left: 1px solid #e5e5e5;
  height: 100%;
  // min-width: 800px;
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
  .empty {
    height: 100%;
  }
  .info-right-title {
    font-size: 17px;
    color: #ccc;
    margin-bottom: 10px;
  }
  .info-right-content {
    width: 100%;
  }
  .btn-container {
    margin-top: 25px;
  }
}
</style>

