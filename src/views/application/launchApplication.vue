<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 
 * @params: 
 * @Date: 2023-03-09 14:42:35
 * @LastEditTime: 2023-03-24 17:17:36
-->
<template>
  <div class="page-container launch-container">
    <div class="page-title">考勤审批</div>
    <div class="launch-type-container flex-around">
      <div v-for="item in launchTypeBtn" class="btn-father">
        <a-button type="primary" size="large" block style="height:45px" @click="launchTypeChange(item)">
          {{ item.name }}
        </a-button>
      </div>
    </div>
    <!-- <div class="form">
      <keep-alive>
        <component v-show="componentName" :is="componentName"></component>
      </keep-alive>
      <div v-show="!componentName" class="flex-center form-empty"><a-empty :description="false"></a-empty></div>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      launchTypeBtn: [
        { name: '请假', path: '/application/launchApplication/Vacate' },
        { name: '补签', path: '/application/launchApplication/Retroactive' },
        { name: '公出', path: '/application/launchApplication/Onbusiness' },
        { name: '销假' },
        { name: '夜班' },
        { name: '打卡权限' }
      ],
      componentName: 'Vacate'
    }
  },
  methods: {
    launchTypeChange({ path }) {
      if (path) {
        this.$router.push(path)
      } else {
        this.$message.info('待开发')
      }
    }
  }
}
</script>
<style lang="less" scope>
.launch-container {
  .page-title {
    font-size: 16px;
  }
  .launch-type-container {
    margin-top: 20px;
    width: 100%;
    height: 120px;
    box-shadow: 0 0 6px 0 #e5e5e5;
    border-radius: 10px;
    padding: 0 20px;
    box-sizing: border-box;
    .btn-father {
      width: 12%;
    }
  }
  .form {
    margin-top: 20px;
    width: 100%;
    min-height: 300px;
    box-shadow: 0 0 6px 0 #e5e5e5;
    border-radius: 10px;
    padding: 20px;

    .form-empty {
      min-height: 300px;

      height: 100%;
    }
  }
}
</style>

