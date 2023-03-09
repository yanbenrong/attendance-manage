<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 休假表单
 * @params: 
 * @Date: 2023-03-09 15:18:11
 * @LastEditTime: 2023-03-09 18:26:57
-->
<template>
  <div class="vacate-form">
    <h4 class="form-title">请假申请</h4>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="请假地点" :colon="false">
        <a-select
          v-decorator="['type', { rules: [{ required: true, message: '请选择请假类型！' }] }]"
          placeholder="请选择请假类型"
          :options="typeOption"
          allowClear
        >
        </a-select>
        <div class="form-help">
          备注:①请假时长超过1天且第一天是全天请假的，请假开始时间需早于或等于班次最早上班时间。；②请假时长超过1天，第一天请假半天且请假结束时间为班次弹性后时间的，需要按天拆开分别提交请假电子流。
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
      ], // 附件图片列表
      typeOption: [
        { key: '1', title: '事假' },
        { key: '2', title: '病假' },
        { key: '3', title: '年假' },
        { key: '4', title: '补休' },
        { key: '5', title: '婚假' },
        { key: '6', title: '产检假' },
        { key: '7', title: '产假' },
        { key: '8', title: '哺乳假' },
        { key: '9', title: '护理假' },
        { key: '10', title: '丧假与路程假' },
        { key: '11', title: '育儿假' },
        { key: '12', title: '医疗假' }
      ]
    }
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
      this.fileList = fileList
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
}
.ant-modal-close-x {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
</style>

