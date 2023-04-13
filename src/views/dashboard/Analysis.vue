<!-- <template>
  <div>
    <index-chart v-if="indexStyle==1"></index-chart>
    <index-bdc v-if="indexStyle==2"></index-bdc>
    <index-task v-if="indexStyle==3"></index-task>
    <div style="width: 100%;text-align: right;margin-top: 20px">
      请选择首页样式：
      <a-radio-group v-model="indexStyle">
        <a-radio :value="1">统计图表</a-radio>
        <a-radio :value="2">统计图表2</a-radio>
        <a-radio :value="3">任务表格</a-radio>
      </a-radio-group>
    </div>
  </div>
</template>

<script>
  import IndexChart from './IndexChart'
  import IndexTask from "./IndexTask"
  import IndexBdc from './IndexBdc'

  export default {
    name: "Analysis",
    components: {
      IndexChart,
      IndexTask,
      IndexBdc
    },
    data() {
      return {
        indexStyle:1
      }
    },
    created() {

    },
    methods: {

    }
  }
</script> -->

<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 工作台首页
 * @params: 
 * @Date: 2023-03-08 11:05:22
 * @LastEditTime: 2023-03-28 15:02:46
-->
<template>
  <div class="workpage-container">
    <div class="user-info">
      <div class="user-avatar">
        <a-avatar :size="120" :src="getAvatar()" />
      </div>
      <div class="user-name">{{ nickname() }}</div>
      <div class="user-branch">{{ realname() }}</div>
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
import { mapGetters } from 'vuex'
import { getFileAccessHttpUrl } from '@/api/manage'
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
          path: '/application'
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5eb37741f3abfd2123b245eb?a=1',
          navTitle: '审批',
          path: '/approval'
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5fb1db27bf009c0b9afe76e0?a=1',
          navTitle: '消息',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5fb1db27bf009c0b9afe76e0?a=1',
          navTitle: '班次',
          path: '/classes'
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5eb37005c17bbe3256abc277?a=1',
          navTitle: '发起延时工作/加班申请',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5fb47d3984a7400ce5c8223d?a=1',
          navTitle: '打卡地址',
          path: '/punchinAddress'
        },
        {
          iconUrl: 'https://s2.loli.net/2023/03/08/roIAlGpWfsj6eNV.png',
          navTitle: '员工补充',
          path: ''
        },
        {
          iconUrl: 'https://www.ctgpayroll.com/file/getfile/image/5eb37741da726721405e2850?a=1',
          navTitle: '假期池',
          path: '/holidayPool'
        }
      ]
    }
  },
  methods: {
    ...mapGetters(['nickname', 'avatar', 'realname']),
    getAvatar() {
      return getFileAccessHttpUrl(this.avatar())
    },
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
