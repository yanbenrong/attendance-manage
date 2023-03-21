<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 公出表单
 * @params: 
 * @Date: 2023-03-09 15:19:01
 * @LastEditTime: 2023-03-15 17:02:33
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
        />
      </a-form-item>
      <a-form-item label="公出时长">
        <a-input
          placeholder="公出时长"
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
import { getBase64 } from '@/utils/attendanceUtils.js'
import { attendanceOut } from '@/api/myAttendance.js'
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'onbusiness ' }),
      previewVisible: false, // 图片预览
      previewImage: '', // 预览图片数据
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ] // 图片列表
    }
  },
  methods: {
    // 提交回调
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let { onbusinessPlace, explain, time } = values
          let res = await attendanceOut({
            outPlace: onbusinessPlace,
            startDate: time[0].format('YYYY-MM-DD HH:MM:SS'),
            endDate: time[1].format('YYYY-MM-DD HH:MM:SS'),
            outHours: 8,
            outDays: 1,
            outReason: explain,
            tenantId: 123
          })
          console.log('公出申请', res)
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
      this.fileList = fileList
    }
  }
}
</script>

<style lang="less" scope>
.onbusiness-form {
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

