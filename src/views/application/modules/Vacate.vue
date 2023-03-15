<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 请假表单 
 * @params: 
 * @Date: 2023-03-09 15:18:11
 * @LastEditTime: 2023-03-15 14:30:53
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
          <div class="form-tip">{{ vacateType }}最小单位{{ vacateTypeTip[vacateType].minUnit }}</div>
        </div>
      </a-form-item>
      <a-form-item label="开始时间-结束时间" :colon="false">
        <a-range-picker
          :show-time="{ format: 'HH:mm:ss' }"
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['time', { rules: [{ required: true, message: '请选择开始时间和结束时间!' }] }]"
          :placeholder="['开始时间', '结束时间']"
        />
      </a-form-item>
      <a-form-item label="请假时长">
        <a-input
          placeholder="请假时长"
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
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :bodyStyle="{ padding: '25px' }" :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
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
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
          重置
        </a-button>
      </a-form-item>
    </a-form>
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
import { getBase64 } from '@/utils/attendanceUtils.js'
import { vacateTypeTip, specialistMail } from './staticData'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'onbusiness ' }),
      previewVisible: false, // 图片预览
      previewImage: '', // 预览图片数据
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        // }
      ], // 附件图片列表
      typeOption: [],
      vacateType: '', // 当前请假类型
      vacateTypeTip, // 请假类型备注静态数据
      specialistMail, // 考勤专员邮箱数据
      drawerVisible: false
    }
  },
  created() {
    this.getLeaveTypeDict()
  },
  methods: {
    // 提交回调
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    // 重置回调
    handleReset() {
      this.form.resetFields()
    },
    // 关闭预览弹窗
    handleCancel() {
      this.previewVisible = false
    },
    // 预览回调
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    // 上传文件变化回调
    handleChange({ fileList }) {
      console.log('文件', fileList)
      this.fileList = fileList
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
            您当前剩余补休0.87500天，剩余年假5.00000天(其中去年结转5.00000天),为了保证您领薪的完整性，建议优先申请补休/年假电子流。
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
    onClose() {
      this.drawerVisible = false
    },
    async getLeaveTypeDict() {
      let dict = await initDictOptions('leave_type')
      console.log('请假类型字典', dict)
      this.typeOption = dict.result
    }
  }
}
</script>

<style lang="less" scope>
.vacate-form {
  .form-title {
    color: #9598a3;
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

