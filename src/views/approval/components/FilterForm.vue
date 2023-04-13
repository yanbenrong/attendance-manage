<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 
 * @params: 
 * @Date: 2023-03-21 14:32:11
 * @LastEditTime: 2023-03-31 10:27:38
-->
<template>
  <div class="filter-container">
    <div class="searchInput">
      <a-input-group size="large" compact style="width:400px;display: flex;margin-right: 50px;">
        <a-select size="large" default-value="xm" style="width:150px" :options="inputSelectOption"> </a-select>
        <a-input-search size="large" placeholder="请填写..." v-model="inputValue" enter-button @search="onSearch" />
      </a-input-group>
      <a-button
        v-if="false"
        type="primary"
        icon="filter"
        size="large"
        @click="
          () => {
            isShowAdvanced = !isShowAdvanced
          }
        "
      >
        高级筛选
      </a-button>
    </div>
    <div v-show="isShowAdvanced" class="advanced-filter">
      <a-form class="form" :form="form" layout="inline" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-form-item label="部门" class="form-item">
          <a-input v-decorator="['department']" placeholder="请选择...." />
        </a-form-item>
        <a-form-item label="班次" class="form-item">
          <a-input v-decorator="['classes']" placeholder="请选择...." />
        </a-form-item>
        <a-form-item label="考勤地点" class="form-item">
          <a-input v-decorator="['attendancePlace']" placeholder="请选择...." />
        </a-form-item>
        <a-form-item label="管理归属地" class="form-item">
          <a-input v-decorator="['administrativeHome']" placeholder="请选择...." />
        </a-form-item>
        <a-form-item label="申请类型" class="form-item">
          <a-input v-decorator="['typeOfApplication']" placeholder="请选择...." />
        </a-form-item>
        <a-form-item label="申请时间" class="form-item">
          <a-input v-decorator="['applicationTime']" placeholder="请选择...." />
        </a-form-item>
        <a-form-item label="审批状态" class="form-item">
          <a-input v-decorator="['approvalStatus']" placeholder="请选择...." />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      isShowAdvanced: false,
      inputSelectOption: [
        // { value: 'gh', label: '工号' },
        { value: 'xm', label: '姓名' }
        // { value: 'lsh', label: '流水号' },
        // { value: 'spr', label: '审批人' },
        // { value: 'sprgh', label: '审批人工号' },
        // { value: 'fqr', label: '发起人' }
      ],
      inputValue: ''
    }
  },
  methods: {
    onSearch() {
      this.$emit('submit', { name: this.inputValue })
    }
  }
}
</script>

<style lang="less" scope>
.filter-container {
  .searchInput {
    display: flex;
    justify-content: start;
  }
  .advanced-filter {
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 0 10px 0 #e5e5e5;
    margin-bottom: 5px;
    margin-top: 10px;
    .form {
      display: flex;
      flex-wrap: wrap;
    }
    .form-item {
      width: 300px;
    }
  }
}
</style>

