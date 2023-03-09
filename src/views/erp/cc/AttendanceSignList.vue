<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('attendance_sign')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text,record">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" :preview="record.id" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <attendance-sign-modal ref="modalForm" @ok="modalFormOk"></attendance-sign-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import AttendanceSignModal from './modules/AttendanceSignModal'

  export default {
    name: 'AttendanceSignList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      AttendanceSignModal
    },
    data () {
      return {
        description: 'attendance_sign管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'用户id',
            align:"center",
            dataIndex: 'userId'
          },
          {
            title:'用户名',
            align:"center",
            dataIndex: 'userName'
          },
          {
            title:'用户联系电话',
            align:"center",
            dataIndex: 'userPhone'
          },
          {
            title:'科室id',
            align:"center",
            dataIndex: 'officeId'
          },
          {
            title:'科室名称',
            align:"center",
            dataIndex: 'officeName'
          },
          {
            title:'部门名称',
            align:"center",
            dataIndex: 'applyDeptName'
          },
          {
            title:'部门ID',
            align:"center",
            dataIndex: 'applyDeptId'
          },
          {
            title:'签到时间',
            align:"center",
            dataIndex: 'signTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'签到类型',
            align:"center",
            dataIndex: 'signType'
          },
          {
            title:'创建人',
            align:"center",
            dataIndex: 'createdBy'
          },
          {
            title:'创建时间',
            align:"center",
            dataIndex: 'createdDate',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'修改人',
            align:"center",
            dataIndex: 'lastModifiedBy'
          },
          {
            title:'修改时间',
            align:"center",
            dataIndex: 'lastModifiedDate',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'是否删除',
            align:"center",
            dataIndex: 'deleted'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/sign/attendanceSign/list",
          delete: "/sign/attendanceSign/delete",
          deleteBatch: "/sign/attendanceSign/deleteBatch",
          exportXlsUrl: "/sign/attendanceSign/exportXls",
          importExcelUrl: "sign/attendanceSign/importExcel",
          
        },
        dictOptions:{},
        superFieldList:[],
      }
    },
    created() {
    this.getSuperFieldList();
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      initDictConfig(){
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'userId',text:'用户id'})
        fieldList.push({type:'string',value:'userName',text:'用户名'})
        fieldList.push({type:'string',value:'userPhone',text:'用户联系电话'})
        fieldList.push({type:'string',value:'officeId',text:'科室id'})
        fieldList.push({type:'string',value:'officeName',text:'科室名称'})
        fieldList.push({type:'string',value:'applyDeptName',text:'部门名称'})
        fieldList.push({type:'string',value:'applyDeptId',text:'部门ID'})
        fieldList.push({type:'date',value:'signTime',text:'签到时间'})
        fieldList.push({type:'string',value:'signType',text:'签到类型'})
        fieldList.push({type:'string',value:'createdBy',text:'创建人'})
        fieldList.push({type:'date',value:'createdDate',text:'创建时间'})
        fieldList.push({type:'string',value:'lastModifiedBy',text:'修改人'})
        fieldList.push({type:'date',value:'lastModifiedDate',text:'修改时间'})
        fieldList.push({type:'string',value:'deleted',text:'是否删除'})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>