<template>
  <div class="page-container waitApproval-container">
    <FilterForm @submit="submitCallback"></FilterForm>
    <div v-if="true" class="approval-info">
      <div class="info-left">
        <div class="left-top">已审批 19条</div>
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
              {{ i.flowType.slice(0, 1) }}
            </div>
          </div>
        </div>
      </div>
      <div class="info-right">
        <div class="info-right-title">
          公出申请详情
        </div>
        <div class="info-right-content">
          <a-descriptions title="申请信息" :column="2">
            <a-descriptions-item label="姓名">
              Zhou Maomao
            </a-descriptions-item>
            <a-descriptions-item label="工号">
              1810000000
            </a-descriptions-item>
            <a-descriptions-item label="开始日期">
              Hangzhou, Zhejiang
            </a-descriptions-item>
            <a-descriptions-item label="结束日期">
              empty
            </a-descriptions-item>
          </a-descriptions>
          <a-divider />
          <a-descriptions title="申请状态" :column="2">
            <a-descriptions-item label="姓名">
              Zhou Maomao
            </a-descriptions-item>
            <a-descriptions-item label="工号">
              1810000000
            </a-descriptions-item>
            <a-descriptions-item label="开始日期">
              Hangzhou, Zhejiang
            </a-descriptions-item>
            <a-descriptions-item label="结束日期">
              empty
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>
    <a-empty v-else style="margin-top: 50px;" />
  </div>
</template>

<script>
import FilterForm from './components/FilterForm.vue'
import { getExamineList, getExamineInfoById } from '@/api/myAttendance.js'
export default {
  components: { FilterForm },
  data() {
    return {
      examineList: [], // 审批列表数据
      processId: '' // 当前选中审批审批流程id
    }
  },
  created() {
    this.getExamineListData()
  },
  methods: {
    // 筛选查询回调
    submitCallback(params) {
      console.log('筛选参数', params)
    },
    // 获取审批数据列表
    async getExamineListData() {
      let res = await getExamineList()
      console.log('审批列表', res)
      if (res.code === 200) {
        this.examineList = res.result
      }
    },
    // 审批列表卡片点击
    examineItemClick(id) {
      this.processId = id
      this.getExamineInfo(id)
    },
    // 获取流程审批详情
    async getExamineInfo(id) {
      let res = await getExamineInfoById({ id })
      console.log('获取流程审批详情', res)
    }
  }
}
</script>

<style lang="less" scope>
.waitApproval-container {
  .approval-info {
    height: 500px;
    box-shadow: 0 0 10px 0 #e5e5e5;
    margin-top: 20px;
    display: flex;
    min-width: 1200px;
    padding: 20px 0;
    box-sizing: border-box;
    .info-left {
      min-width: 400px;
      height: 100%;
      border-right: 1px solid #e5e5e5;
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
      height: 100%;
      min-width: 800px;
      padding: 0 20px;
      box-sizing: border-box;
      .info-right-title {
        font-size: 17px;
        color: #ccc;
        margin-bottom: 10px;
      }
      .info-right-content {
        width: 100%;
      }
    }
  }
}
</style>

