<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 补签表单
 * @params: 
 * @Date: 2023-03-09 15:17:14
 * @LastEditTime: 2023-03-15 14:48:45
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
          <a-select-option value="punchCard">
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
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { attendanceResign } from '@/api/myAttendance.js'

export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'rotroactive ' })
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let res = await attendanceResign({
            resignRemark: 'resignRemark',
            resignTime: '2023-03-11 14:31:55',
            resignType: 0
          })
          console.log('补签申请', res)
        }
      })
    },
    handleReset() {
      this.form.resetFields()
    }
  }
}
</script>

<style lang="less" scope>
.retroactive-form {
  .form-title {
    color: #9598a3;
  }
  .form-tip {
    margin-left: 81px;
    color: #9598a3;
  }
}
</style>

