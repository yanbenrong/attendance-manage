<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 工作台首页
 * @params: 
 * @Date: 2023-03-08 11:05:22
 * @LastEditTime: 2023-03-08 16:44:09
-->
<template>
  <div class="workpage-container">
    <div class="user-info">
      <div class="user-avatar">
        <a-avatar :size="120" src="https://yihr.chinasoftinc.com:18010/static/img/icon/zrhead.png" />
      </div>
      <div class="user-name">王五</div>
      <div class="user-branch">中软国际</div>
    </div>
    <div class="quick-nav">
      <div v-for="item in navArr" class="nav-item" @click="historyPush(item.path)">
        <img class="nav-icon" :src="item.iconUrl" alt="导航图标" />
        <div class="nav-title">{{ item.navTitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navArr: [
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5eb37741c17bbe3256abc278?a=1',
          navTitle: '我的考勤',
          path: '/attendance'
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5eb380bcc17bbe3256abc27a?a=1',
          navTitle: '发起申请',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5eb37741f3abfd2123b245eb?a=1',
          navTitle: '审批',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5fb1db27bf009c0b9afe76e0?a=1',
          navTitle: '消息',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5fb1db27bf009c0b9afe76e0?a=1',
          navTitle: '班次',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5eb37005c17bbe3256abc277?a=1',
          navTitle: '发起延时工作/加班申请',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5fb47d3984a7400ce5c8223d?a=1',
          navTitle: '打卡地址',
          path: ''
        },
        {
          iconUrl: 'https://s2.loli.net/2023/03/08/roIAlGpWfsj6eNV.png',
          navTitle: '员工补充',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5eb37741da726721405e2850?a=1',
          navTitle: '假期池',
          path: ''
        }
      ]
    }
  },
  methods: {
    // 跳转页面
    historyPush(url) {
      if (url) {
        this.$router.push({ path: url })
      }
    }
  }
}
</script>

<style lang="less" scope>
.workpage-container {
  background-color: #eff5ff;
  display: flex;
  padding-bottom: 31px;

  .user-info {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 31px;
    .user-avatar {
      margin-bottom: 10px;
    }
    .user-name {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .user-branch {
      font-size: 14px;

      color: #9598a3;
    }
  }

  .quick-nav {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    .nav-item {
      width: 248px;
      height: 118px;
      background: #fff;
      border: 1px solid hsla(0, 0%, 100%, 0);
      border-radius: 6px;
      box-shadow: 0 0 6px 0 #d8d8d8;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 31px;
      margin-top: 31px;
      cursor: pointer;
      .nav-icon {
        width: 50px;
        height: 50px;
      }

      .nav-title {
        margin-top: 5px;
      }

      &:hover {
        width: 248px;
        height: 118px;
        background: #fff;
        -webkit-box-shadow: 0 0 6px 0 #4a8ef8;
        box-shadow: 0 0 6px 0 #4a8ef8;
        border-radius: 6px;
        border: 1px solid #4a8ef8;
      }
    }
  }
}
</style>
