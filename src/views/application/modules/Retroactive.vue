<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 补签表单
 * @params: 
 * @Date: 2023-03-09 15:17:14
 * @LastEditTime: 2023-03-30 15:54:59
-->
<template>
  <div class="retroactive-form">
    <h4 class="form-title">补签申请</h4>
    <h5 class="form-tip">同一天只能填写一条补签电子流</h5>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="补签时间" :colon="false">
        <a-date-picker
          v-decorator="['time', { rules: [{ required: true, message: '请选择补签时间!' }] }]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择补签时间"
        />
      </a-form-item>
      <a-form-item label="补签类型" :colon="false">
        <a-select
          v-decorator="['type', { rules: [{ required: true, message: '请选择补签类型！' }] }]"
          placeholder="请选择补签类型"
        >
          <a-select-option value="0">
            打卡
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="补签原因" :colon="false">
        <a-textarea
          v-decorator="['reason', { rules: [{ required: false }] }]"
          placeholder="请输入补签原因"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          :maxLength="300"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 6, offset: 3 }">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
          取消
        </a-button>
      </a-form-item>
    </a-form>
    <ApproverModal
      :visible="ApproverModalVisible"
      @handleOk="handleModalOk"
      @handleCancel="handleModalCancel"
    ></ApproverModal>
  </div>
</template>

<script>
import { attendanceResign } from '@/api/myAttendance.js'
import ApproverModal from '../components/ApproverModal.vue'

export default {
  components: { ApproverModal },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'rotroactive ' }),
      ApproverModalVisible: false, // 选择审批人弹窗
      formValue: {}, // 表单值
      approverInfo: {} // 审批人信息
    }
  },
  inject: ['closeCurrent'],
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // 选择审批人
          this.ApproverModalVisible = true
          console.log('Received values of form: ', values)
          this.formValue = values
        }
      })
    },
    // 取消回调
    handleReset() {
      // this.form.resetFields()
      this.$router.go(-1)
      this.closeCurrent()
    },
    // 选择审批人 ok
    handleModalOk(params) {
      this.ApproverModalVisible = false
      console.log('审批人信息', params)
      this.approverInfo = params.pmUser
      this.submitAttendanceResign()
    },
    // 选择审批人 cancel
    handleModalCancel() {
      this.ApproverModalVisible = false
      this.$message.error('未选择审批人')
      // this.handleReset()
    },
    // 提交补签申请
    async submitAttendanceResign() {
      let { reason, time, type } = this.formValue
      let res = await attendanceResign({
        resignRemark: reason,
        resignTime: time.format('YYYY-MM-DD HH:MM:SS'),
        resignType: type,
        examineUserId: this.approverInfo.id,
        examineUserName: this.approverInfo.realname
      })
      if (res.success) {
        this.$message.success('补签申请保存成功，已进入审批流程')
        this.handleReset()
      }
      console.log('补签申请', res)
    }
  }
}
</script>

<style lang="less" scope>
.retroactive-form {
  background-color: #fff;
  padding: 20px;

  .form-title {
    font-size: 18px;
    font-weight: 600;
  }
  .form-tip {
    margin-left: 81px;
    color: #9598a3;
  }
}
</style>

