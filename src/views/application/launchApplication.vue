<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 
 * @params: 
 * @Date: 2023-03-09 14:42:35
 * @LastEditTime: 2023-03-21 09:52:28
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
    <div class="form">
      <keep-alive>
        <component v-show="componentName" :is="componentName"></component>
      </keep-alive>
      <div v-show="!componentName" class="flex-center form-empty"><a-empty :description="false"></a-empty></div>
    </div>
  </div>
</template>
<script>
import Vacate from './modules/Vacate.vue'
import Retroactive from './modules/Retroactive.vue'
import Onbusiness from './modules/Onbusiness.vue'
export default {
  components: {
    Vacate,
    Retroactive,
    Onbusiness
  },
  data() {
    return {
      launchTypeBtn: [
        { name: '请假', componentName: 'Vacate' },
        { name: '补签', componentName: 'Retroactive' },
        { name: '公出', componentName: 'Onbusiness' },
        { name: '销假', componentName: '' },
        { name: '夜班', componentName: '' },
        { name: '打卡权限', componentName: '' }
      ],
      componentName: 'Vacate'
    }
  },
  methods: {
    launchTypeChange({ componentName }) {
      this.componentName = componentName
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

