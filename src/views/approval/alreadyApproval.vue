<template>
  <div class="page-container alreadyApproval-container">
    <FilterForm @submit="submitCallback"></FilterForm>
    <div v-if="true" class="approval-info">
      <div class="info-left">
        <div class="left-top">已审批 {{ examineList.length || 0 }}条</div>
        <div class="left-scroll">
          <div
            v-for="i in examineList"
            :key="i.processId"
            class="approval-item"
            :class="i.processId === processId ? 'approval-item-active' : ''"
            @click="examineItemClick(i.processId)"
          >
            <div class="approval-item-left">
              <p>{{ i.flowType }}申请</p>
              <p>{{ i.userName || '--' }}/{{ i.deptName || '--' }}</p>
              <p>申请时间: {{ i.createdDate }}</p>
            </div>
            <div class="approval-item-tip">
              {{ (i.flowType && i.flowType.slice(0, 1)) || '-' }}
            </div>
          </div>
        </div>
      </div>
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
    </div>
    <a-empty v-else style="margin-top: 50px;" />

    <ApproverModal
      :visible="ApproverModalVisible"
      @handleOk="handleModalOk"
      @handleCancel="handleModalCancel"
    ></ApproverModal>
  </div>
</template>

<script>
import FilterForm from './components/FilterForm.vue'
import { getExamineList, getExamineInfoById } from '@/api/myAttendance.js'
import ApproverModal from '../application/components/ApproverModal.vue'

const examineStatus = {
  '01': '待审批',
  '02': '审批通过',
  '03': '审批不通过',
  '09': '撤销'
}
export default {
  components: { FilterForm, ApproverModal },
  data() {
    return {
      examineList: [], // 审批列表数据
      processId: '', // 当前选中审批审批流程id
      processInfo: {},
      examineStatus,
      ApproverModalVisible: false, // 选择审批人弹窗
      approverInfo: {} // 审批人信息
    }
  },
  created() {
    this.getExamineListData({ type: '02' })
  },
  methods: {
    // 筛选查询回调
    submitCallback(params) {
      console.log('筛选参数', params)
      this.getExamineListData({ type: '02', userName: params.name })
    },
    // 获取审批数据列表
    async getExamineListData({ type, userName = '' }) {
      let res = await getExamineList({ type, userName })
      console.log('审批列表', res)
      if (res.code === 200) {
        this.examineList = res.result
        this.processId = res.result[0].processId
        this.examineItemClick(res.result[0].processId)
      }
    },
    // 审批列表卡片点击
    examineItemClick(id) {
      this.processId = id
      this.getExamineInfo('845706771208077312')
    },
    // 获取流程审批详情
    async getExamineInfo(id) {
      let res = await getExamineInfoById({ id })
      console.log('获取流程审批详情', res)
      if (res.result) {
        this.processInfo = res.result
      }
    },
    // 选择审批人 ok
    handleModalOk(params) {
      this.ApproverModalVisible = false
      console.log('审批人信息', params)
      this.approverInfo = params.pmUser
    },
    // 选择审批人 cancel
    handleModalCancel() {
      this.ApproverModalVisible = false
      this.$message.error('未选择审批人')
      // this.handleReset()
    }
  }
}
</script>

<style lang="less" scope>
.alreadyApproval-container {
  .approval-info {
    // height: 500px;
    box-shadow: 0 0 10px 0 #e5e5e5;
    margin-top: 20px;
    display: flex;
    // min-width: 1200px;
    padding: 20px 0;
    box-sizing: border-box;
    .info-left {
      min-width: 400px;
      height: 100%;

      padding: 0 20px;
      .left-top {
        background-color: #f0faf9;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        margin: 0 18px 10px 10px;
      }
      .left-scroll {
        height: calc(100% - 50px);
        overflow: auto;
        padding: 10px;
        box-sizing: border-box;
        .approval-item {
          height: 100px;
          width: 100%;
          border: 1px solid #e5e5e5;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          padding: 15px;
          box-sizing: border-box;
          position: relative;
          cursor: pointer;
          .approval-item-left {
            line-height: 20px;
            p {
              margin-bottom: 5px;
              color: #000;
            }
          }
          .approval-item-tip {
            width: 30px;
            height: 30px;
            line-height: 28px;
            text-align: center;
            border-radius: 50%;
            border: 1px solid #e5e5e5;
            color: #e5e5e5;
            position: absolute;
            top: 10px;
            right: 10px;
          }
        }
        .approval-item-active {
          border: 1px solid #bfd9e8;
          background-color: #eff3ff;
          .approval-item-tip {
            background-color: #4691f5;
            color: #fff;
          }
        }
      }
    }
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
  }
}
</style>

