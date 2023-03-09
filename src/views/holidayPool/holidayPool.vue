<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 假期池
 * @params: 
 * @Date: 2023-03-09 11:06:41
 * @LastEditTime: 2023-03-09 11:34:22
-->
<template>
  <div class="holiday-container page-container">
    <div class="box-item">
      <div class="box-header flex-left">
        <img class="header-icon" src="@/assets/newyear.png" alt="" />
        <span class="header-title">剩余年假5天</span>
      </div>
      <div class="box-body">
        <p>去年结转：</p>
        <p>当前可休：</p>
      </div>
    </div>
    <div class="box-item">
      <div class="box-header flex-left">
        <img class="header-icon" src="@/assets/dayoff.png" alt="" />
        <span class="header-title">剩余年假5天</span>
      </div>
      <div class="box-body">
        <p>去年结转：</p>
        <p>当前可休：</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scope>
.holiday-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  div.box-item:first-of-type {
    border: 1px solid #f7e6bf;
    .box-header {
      background-color: #f7e6bf;
      .header-title {
        color: #85641b;
      }
    }
  }
  .box-item {
    width: 48%;
    height: 240px;
    border-radius: 10px;
    border: 1px solid #bee0db;

    .box-header {
      height: 50px;
      background-color: #bee0db;
      border-radius: 10px 10px 0 0;
      .header-icon {
        width: 25px;
        height: 22px;
        margin: 0 11px 0 18px;
      }
      .header-title {
        font-size: 19px;
        color: #1c6456;
      }
    }
    .box-body {
      padding: 20px;
      padding-left: 53px;
      box-sizing: border-box;
      font-size: 16px;
    }
  }
}
</style>

