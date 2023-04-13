<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 请假表单 
 * @params: 
 * @Date: 2023-03-09 15:18:11
 * @LastEditTime: 2023-03-31 10:44:29
-->
<template>
  <div class="vacate-form">
    <h4 class="form-title">请假申请</h4>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="假期类型" :colon="false">
        <a-select
          v-decorator="['type', { rules: [{ required: true, message: '请选择假期类型！' }] }]"
          placeholder="请选择假期类型"
          :options="typeOption"
          allowClear
          @change="vacateTypeChange"
          label-in-value
        >
        </a-select>
        <div v-if="vacateTypeTip[vacateType]">
          <div class="form-help">
            备注： {{ vacateTypeTip[vacateType].tip }}
            <a-button type="link" size="default" @click="showDrawer">
              查看各考勤专员邮箱
            </a-button>
          </div>
          <div class="form-tip">
            {{ vacateType }}最小单位{{ vacateTypeTip[vacateType].minUnit }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span v-if="vacateType === '年假'">年假剩余 {{ annualLeaveInfo.residueHours }}小时</span>
          </div>
        </div>
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
      <a-form-item label="请假时长">
        <a-input
          placeholder="请假时长"
          :disabled="true"
          v-decorator="['duration', { rules: [{ required: true, message: '请填写请假时长!' }] }]"
        />
      </a-form-item>
      <a-form-item label="请假说明" :colon="false">
        <a-textarea
          v-decorator="['explain', { rules: [{ required: false, message: '请输入请假说明!' }] }]"
          placeholder="请输入..."
          :auto-size="{ minRows: 3, maxRows: 5 }"
          :maxLength="300"
        />
      </a-form-item>
      <a-form-item label="附件">
        <j-image-upload
          v-decorator="['filePath', {}]"
          bizPath="scott/pic"
          :isMultiple="true"
          :maxLength="2"
        ></j-image-upload>

        <div style="line-height: 21px;">
          上传图片
          <span v-if="vacateTypeTip[vacateType] && vacateTypeTip[vacateType].uploadTip" class="red-font"
            >({{ vacateTypeTip[vacateType].uploadTip }})</span
          >
        </div>
      </a-form-item>
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
    <!-- 各考勤专员邮箱    -->
    <a-drawer placement="right" :closable="false" :visible="drawerVisible" @close="onClose" :width="500">
      <template slot="title"><div class="drawer-title">查看各考勤专员邮箱(考勤专员联系表)</div></template>
      <div class="mail-drawer-container">
        <div v-for="item in specialistMail" class="drawer-item">
          <div class="drawer--item-name">{{ item.name }}</div>
          <p>角色：{{ item.role }}</p>
          <p>部门：{{ item.department }}</p>
          <p>工号：{{ item.jobNumber }}</p>
          <p>邮箱：{{ item.mail }}</p>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { vacateTypeTip, specialistMail } from './staticData'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import JImageUpload from '@/components/jeecg/JImageUpload'
import ApproverModal from '../components/ApproverModal.vue'
import { attendanceLeave, getWorkHours, getLeavePool } from '@/api/myAttendance.js'
import { getFileAccessHttpUrl } from '@/api/manage'

export default {
  components: { ApproverModal, JImageUpload },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'onbusiness ' }),
      typeOption: [],
      vacateType: '', // 当前请假类型
      vacateTypeTip, // 请假类型备注静态数据
      specialistMail, // 考勤专员邮箱数据
      drawerVisible: false, // 专员邮箱抽屉
      ApproverModalVisible: false, // 选择审批人弹窗
      formValue: {}, // 表单值
      approverInfo: {}, // 审批人信息
      annualLeaveInfo: {} // 假期池信息
    }
  },
  inject: ['closeCurrent'],
  created() {
    this.getLeaveTypeDict()
    this.getHolidayResidue()
  },
  methods: {
    // 提交回调
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // 选择审批人
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

    // 请假类型选择回调
    vacateTypeChange(value) {
      console.log('请假类型change', value)

      let role = 1
      if (!value) return
      this.vacateType = value.label
      if (value.label === '事假') this.showCasualLeaveConfirm()
      if (role === 1 && ['产检假', '产假', '哺乳假'].includes(value.label)) this.noPermissionProm()
    },
    // 事假提示弹窗
    showCasualLeaveConfirm() {
      this.$confirm({
        title: '提示',
        content: h => (
          <div style="color:#000;">
            您当前剩余年假{this.annualLeaveInfo.residueHours}小时 (其中去年结转{this.annualLeaveInfo.restHours}
            小时),为了保证您领薪的完整性，建议优先申请补休/年假电子流。
          </div>
        ),
        centered: true
      })
    },
    // 无权限申请提示
    noPermissionProm() {
      this.$nextTick(() => {
        this.form.setFieldsValue({ type: undefined })
      })
      this.$message.warning({ content: `您没有权限申请${this.vacateType}!`, duration: 2 })
    },
    // 抽屉显示隐藏
    showDrawer() {
      this.drawerVisible = true
    },
    // 抽屉关闭
    onClose() {
      this.drawerVisible = false
    },
    // 获取请假类型字典
    async getLeaveTypeDict() {
      let dict = await initDictOptions('leave_type')
      console.log('请假类型字典', dict)
      this.typeOption = dict.result
    },
    // 选择审批人 ok
    handleModalOk(params) {
      this.ApproverModalVisible = false
      console.log('审批人信息', params)
      this.approverInfo = params.pmUser
      this.submitAttendanceVacate()
    },
    // 选择审批人 cancel
    handleModalCancel() {
      this.ApproverModalVisible = false
      this.$message.error('未选择审批人')
      // this.handleFormCancel()
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
    // 获取假期池
    async getHolidayResidue() {
      let res = await getLeavePool()
      console.log('😍2023-03-13 假期池res', res)
      if (res.code === 200) {
        res.result.length > 0 && (this.annualLeaveInfo = res.result[0])
      }
    },
    // 提交请假申请
    async submitAttendanceVacate() {
      let { duration, explain, time, type, filePath } = this.formValue
      const params = {
        leaveStartTime: time[0].format('YYYY-MM-DD HH:MM:SS'),
        leaveEndTime: time[1].format('YYYY-MM-DD HH:MM:SS'),
        leaveType: type.key,
        leaveHours: duration,
        leaveRemake: explain,
        examineUserId: this.approverInfo.id,
        examineUserName: this.approverInfo.realname,
        filePath: this.handleFile(filePath)
      }
      let res = await attendanceLeave(params)
      console.log('请假申请', res)
      if (res.success) {
        this.$message.success('请假申请保存成功，已进入审批流程')
        this.handleFormCancel()
      }
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
.vacate-form {
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
  .red-font {
    font-size: 14px;
    color: red;
  }
}
.drawer-title {
  font-size: 17px;
  font-weight: 600;
}
.mail-drawer-container {
  p {
    margin-bottom: 5px;
  }

  .drawer-item {
    margin-top: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .drawer--item-name {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 6px;
  }
}
.ant-modal-close-x {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
</style>

