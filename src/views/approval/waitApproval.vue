<template>
  <div class="page-container waitApproval-container">
    <FilterForm @submit="submitCallback"></FilterForm>
    <div v-if="true" class="approval-info">
      <div class="info-left">
        <div class="left-top">已审批 19条</div>
        <div class="left-scroll">
          <div v-for="i in 20" :key="i" class="approval-item" :class="i === 1 ? 'approval-item-active' : ''">
            <div class="approval-item-left">
              <p>公出申请</p>
              <p>王五/集成开发二部</p>
              <p>申请时间:2023-03-06 11:15:16</p>
            </div>
            <div class="approval-item-tip">
              公
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
export default {
  components: { FilterForm },
  data() {
    return {}
  },
  methods: {
    submitCallback(params) {
      console.log('筛选参数', params)
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
            line-height: 30px;
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

