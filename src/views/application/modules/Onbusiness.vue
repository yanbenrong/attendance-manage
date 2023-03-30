<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 公出表单
 * @params: 
 * @Date: 2023-03-09 15:19:01
 * @LastEditTime: 2023-03-30 15:57:30
-->
<template>
  <div class="onbusiness-form">
    <h4 class="form-title">公出申请</h4>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="公出地点" :colon="false">
        <a-input
          placeholder="请输入公出地点"
          v-decorator="['onbusinessPlace', { rules: [{ required: true, message: '请输入公出地点!' }] }]"
        />
        <div class="form-help">
          备注:①公出时长超过1天且第一天是全天公出的，公出开始时间需早于或等于班次最早上班时间。；②公出时长超过1天，第一天公出半天且公出结束时间为班次弹性后时间的，需要按天拆开分别提交公出电子流。
        </div>
        <div class="form-tip">最小单位30分钟</div>
      </a-form-item>
      <a-form-item label="开始时间-结束时间" :colon="false">
        <a-range-picker
          :show-time="{ format: 'HH:mm:ss' }"
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['time', { rules: [{ required: true, message: '请选择开始时间和结束时间!' }] }]"
          :placeholder="['开始时间', '结束时间']"
          @ok="datePickerok"
        />
      </a-form-item>
      <a-form-item label="公出时长">
        <a-input
          placeholder="公出时长"
          :disabled="true"
          v-decorator="['duration', { rules: [{ required: true, message: '请填写公出时长!' }] }]"
        />
      </a-form-item>
      <a-form-item label="公出说明" :colon="false">
        <a-textarea
          v-decorator="['explain', { rules: [{ required: true, message: '请输入公出说明!' }] }]"
          placeholder="请输入..."
          :auto-size="{ minRows: 3, maxRows: 5 }"
          :maxLength="300"
        />
      </a-form-item>
      <a-form-item label="附件" help="仅能上传图片">
        <j-image-upload
          v-decorator="['filePath', {}]"
          bizPath="scott/pic"
          :isMultiple="true"
          :maxLength="2"
        ></j-image-upload
      ></a-form-item>
      <a-form-item :wrapper-col="{ span: 6, offset: 3 }">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleFormCancel">
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
import { getBase64 } from '@/utils/attendanceUtils.js'
import { attendanceOut, getWorkHours } from '@/api/myAttendance.js'
import ApproverModal from '../components/ApproverModal.vue'
import JImageUpload from '@/components/jeecg/JImageUpload'
import { getFileAccessHttpUrl } from '@/api/manage'

export default {
  components: { ApproverModal, JImageUpload },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'onbusiness ' }),
      ApproverModalVisible: false, // 选择审批人弹窗
      formValue: {}, // 表单值
      approverInfo: {} // 审批人信息
    }
  },
  inject: ['closeCurrent'],
  methods: {
    // 提交回调
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.ApproverModalVisible = true
          this.formValue = values
        }
      })
    },
    // 取消回调
    handleFormCancel() {
      // this.form.resetFields()
      this.$router.go(-1)
      this.closeCurrent()
    },

    // 选择审批人 ok
    handleModalOk(params) {
      this.ApproverModalVisible = false
      console.log('审批人信息', params)
      this.approverInfo = params.pmUser
      this.submitAttendanceOnbusiness()
    },
    // 选择审批人 cancel
    handleModalCancel() {
      this.ApproverModalVisible = false
      this.$message.error('未选择审批人')
      // this.handleReset()
    },
    // 文件url处理
    handleFile(file) {
      if (file) {
        let fileList = file.split(',')
        let newarr = fileList.map(element => {
          return getFileAccessHttpUrl(element)
        })
        console.log('处理后的数组', newarr)
        return newarr.join(',')
      }
      return ''
    },
    // 提交公出申请
    async submitAttendanceOnbusiness() {
      let { onbusinessPlace, explain, time, filePath } = this.formValue
      let params = {
        outPlace: onbusinessPlace,
        startDate: time[0].format('YYYY-MM-DD HH:MM:SS'),
        endDate: time[1].format('YYYY-MM-DD HH:MM:SS'),
        outHours: 8,
        outDays: 1,
        outReason: explain,
        examineUserId: this.approverInfo.id,
        examineUserName: this.approverInfo.realname,
        filePath: this.handleFile(filePath)
      }
      let res = await attendanceOut(params)
      if (res.success) {
        this.$message.success('公出申请保存成功，已进入审批流程')
        this.handleFormCancel()
      }
      console.log('公出申请', res)
    },
    // 日期选择ok
    datePickerok(date) {
      let params = {
        startTime: date[0].format('YYYY-MM-DD HH:MM:SS'),
        endTime: date[1].format('YYYY-MM-DD HH:MM:SS')
      }
      console.log('日期选择ok params', params)
      this.getWorkHoursFunc(params)
    },
    // 获取请假时长
    async getWorkHoursFunc(params) {
      const res = await getWorkHours(params)
      console.log('获取请假时长', res)
      if (res.code === 200) {
        this.form.setFieldsValue({ duration: res.result })
      }
    }
  }
}
</script>

<style lang="less" scope>
.onbusiness-form {
  background-color: #fff;
  padding: 20px;
  .form-title {
    font-size: 18px;
    font-weight: 600;
  }
  .form-help {
    line-height: 18px;
    text-align: justify;
    margin-top: 10px;
  }
  .form-tip {
    color: #fa8c16;
  }
}
.ant-modal-close-x {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
</style>

