<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 
 * @params: 
 * @Date: 2023-03-21 17:25:26
 * @LastEditTime: 2023-03-24 16:21:02
-->
<template>
  <div>
    <a-modal
      :width="900"
      :visible="visible"
      :maskClosable="false"
      title="选择审批人"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-divider orientation="left">
        PM/代PM
      </a-divider>
      <div class="btn-label">
        <div>指定审批人</div>
        <div v-if="JSON.stringify(currentSelectionUser) !== '{}'" class="pm-tag">
          {{ currentSelectionUser.realname }} ({{ currentSelectionUser.workNo }})
        </div>
        <a-button
          @click="
            () => {
              secondVisible = true
            }
          "
          >请选择</a-button
        >
      </div>
    </a-modal>
    <a-modal
      :width="900"
      :visible="secondVisible"
      :maskClosable="false"
      title="选择审批人"
      @ok="secondModalOk"
      @cancel="secondModalCancel"
    >
      <div class="second-modal-content">
        <div class="second-modal-left">
          <a-collapse :bordered="false" accordion v-model="activeKey">
            <a-collapse-panel key="1" header="全部审批人" :style="customStyle">
              <a-tree :tree-data="treeData" @select="allDepartSelect"></a-tree>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="推荐审批人" :disabled="false" :style="customStyle">
              <a-tree :tree-data="mytreeData" @select="myDepartSelect"></a-tree>
            </a-collapse-panel>
          </a-collapse>
        </div>
        <div class="second-modal-right">
          <div class="second-modal-right-top">
            <a-input-search style="width: 300px;" placeholder="请输入姓名" enter-button @search="onSearch" />
            <div class="depart-user-container">
              <div v-if="currentUserList.length !== 0">
                <a-tag
                  v-for="item in currentUserList"
                  style="height:30px;line-height: 28px;"
                  :class="currentSelectionUser.id === item.id ? 'tag-active' : ''"
                  @click="tagClick(item)"
                >
                  {{ item.realname }}({{ item.workNo }})</a-tag
                >
              </div>
              <a-empty v-else description="此部门暂无人员" />
            </div>
          </div>
          <div class="second-modal-right-bottom">
            <div class="selected-label">所选审批人</div>
            <a-tag
              v-if="JSON.stringify(currentSelectionUser) !== '{}'"
              style="height:30px;line-height: 28px;"
              closable
              @close="tagClose"
            >
              {{ currentSelectionUser.realname }} ({{ currentSelectionUser.workNo }})
            </a-tag>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getQueryTreeList, getUserByDepid, getQueryMyTreeList } from '@/api/myAttendance.js'
const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'

export default {
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      secondVisible: false, // 二级弹窗
      activeKey: ['1'], // 折叠面板当前key
      customStyle, // 公共样式
      treeData: [], // 全部审批人 树形数据
      mytreeData: [], // 我的部门审批人 树形数据
      currentUserList: [], // 当前选中部门，用户数据
      currentSelectionUser: {}, // 当前选中用户信息
      currentDepartId: '' // 当前选中部门id
    }
  },
  created() {
    this.getAllDepartTree()
    this.getMyDepartTree()
  },
  methods: {
    // 一级弹窗ok
    handleOk(e) {
      console.log(e)
      this.$emit('handleOk', { pmUser: this.currentSelectionUser })
    },
    // 一级弹窗cancel
    handleCancel() {
      this.$emit('handleCancel')
    },
    // 二级弹窗ok
    secondModalOk() {
      this.secondVisible = false
    },
    // 二级弹窗cancel
    secondModalCancel() {
      this.secondVisible = false
      this.currentSelectionUser = {}
    },
    // 获取全部部门树形数据
    async getAllDepartTree() {
      const res = await getQueryTreeList()
      console.log('获取部门树形数据', res)
      if (res.success) {
        this.treeData = res.result
        this.currentDepartId = res.result[0].id
      }
    },
    // 获取我的部门树形数据
    async getMyDepartTree() {
      const res = await getQueryMyTreeList()
      console.log('获取我的部门树形数据', res)
      if (res.success) {
        this.mytreeData = res.result
      }
    },

    // 全部部门审批人树选择回调
    allDepartSelect(selectedKeys) {
      console.log('当前选择得全部部门审批人 key', selectedKeys)
      this.currentDepartId = selectedKeys[0]
      this.getUserMethod(selectedKeys[0])
    },
    // 我的部门审批人树选择回调
    myDepartSelect(selectedKeys) {
      console.log('当前选择得我的部门审批人 key', selectedKeys)
      this.currentDepartId = selectedKeys[0]
      this.getUserMethod(selectedKeys[0])
    },
    onSearch(value) {
      this.getUserMethod(this.currentDepartId, { realname: value })
    },
    // 根据部门查询用户
    async getUserMethod(id, info = {}) {
      const { jobId = '', phone = '', realname = '' } = info
      const res = await getUserByDepid({ id, jobId, phone, realname })
      console.log('根据部门查询用户', res)
      if (res.success) {
        this.currentUserList = res.result
      }
    },
    // 标签点击回调
    tagClick(info) {
      this.currentSelectionUser = info
    },
    // 标签关闭回调
    tagClose() {
      this.currentSelectionUser = {}
    }
  }
}
</script>

<style lang="less" scope>
.btn-label {
  display: flex;
  align-items: center;
  & div:nth-child(1) {
    margin-right: 20px;
    margin-left: 100px;
  }
  .pm-tag {
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    box-sizing: border-box;
    border: 1px solid #1890ff;
    border-radius: 4px;
    margin-right: 15px;
    background-color: #f0f5ff;
    color: #619cf9;
  }
}
.second-modal-content {
  display: flex;
  .second-modal-left {
    border-right: 1px solid #ccc;
    min-width: 360px;
    padding-right: 24px;
    box-sizing: border-box;
  }
  .second-modal-right {
    width: 100%;
    min-height: 400px;
    .second-modal-right-top {
      height: calc(100% - 80px);
      padding: 0 0 24px 24px;
      .depart-user-container {
        padding: 15px 0;
        box-sizing: border-box;
      }
      .tag-active {
        border-color: #1890ff;
      }
    }
    .second-modal-right-bottom {
      height: 80px;
      width: 100%;
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
      padding-left: 24px;
      .selected-label {
        margin-right: 18px;
      }
    }
  }
}
</style>

