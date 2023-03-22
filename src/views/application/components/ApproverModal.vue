<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 
 * @params: 
 * @Date: 2023-03-21 17:25:26
 * @LastEditTime: 2023-03-22 10:43:39
-->
<template>
  <div>
    <a-modal :width="900" :visible="visible" :maskClosable="false" title="选择审批人" @ok="handleOk">
      <a-divider orientation="left">
        PM/代PM
      </a-divider>
      <div class="btn-label">
        <div>指定审批人</div>
        <a-button
          @click="
            () => {
              secondVisible = true
            }
          "
          >请选择</a-button
        >
      </div>
    </a-modal>
    <a-modal :width="900" :visible="secondVisible" :maskClosable="false" title="选择审批人" @ok="secondModalOk">
      <div class="second-modal-content">
        <div class="second-modal-left">
          <a-collapse :bordered="false" accordion v-model="activeKey">
            <a-collapse-panel key="1" header="This is panel header 1" :style="customStyle">
              <p>{{ 111 }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="This is panel header 2" :disabled="false" :style="customStyle" F>
              <p>{{ 222 }}</p>
            </a-collapse-panel>
          </a-collapse>
        </div>
        <div class="second-modal-right">
          <div class="second-modal-right-top">
            <a-input-search style="width: 300px;" placeholder="请输入姓名" enter-button />
          </div>
          <div class="second-modal-right-bottom">
            <div class="selected-label">所选审批人</div>
            <a-tag closable>
              Tag 2
            </a-tag>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'
export default {
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      secondVisible: false,
      activeKey: ['1'],
      customStyle
    }
  },
  methods: {
    // 一级弹窗ok
    handleOk(e) {
      console.log(e)
      this.$emit('handleOk', { id: 'a22' })
    },
    // 二级弹窗ok
    secondModalOk() {
      this.secondVisible = false
    }
  }
}
</script>

<style lang="less" scope>
.btn-label {
  display: flex;
  align-items: center;
  & div:nth-child(1) {
    margin-right: 20px;
    margin-left: 100px;
  }
}
.second-modal-content {
  display: flex;
  .second-modal-left {
    border-right: 1px solid #ccc;
    min-width: 360px;
    padding-right: 24px;
    box-sizing: border-box;
  }
  .second-modal-right {
    width: 100%;
    min-height: 400px;
    .second-modal-right-top {
      height: calc(100% - 80px);
      padding: 0 0 24px 24px;
    }
    .second-modal-right-bottom {
      height: 80px;
      width: 100%;
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
      padding-left: 24px;
      .selected-label {
        margin-right: 18px;
      }
    }
  }
}
</style>

