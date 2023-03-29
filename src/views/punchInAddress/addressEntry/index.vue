<!--
 * @Author: YanBenrong
 * @LastEdit: YanBenrong
 * @LastEditors: YanBenrong
 * @Description: 
 * @params: 
 * @Date: 2023-03-27 14:45:55
 * @LastEditTime: 2023-03-29 18:44:04
-->
<template>
  <div class="page-container addressEntry-container">
    <PageView></PageView>
    <div class="action">
      <div class="btn-tip">可添加多个地址</div>
      <a-button type="primary" icon="plus" @click="addClick">
        添加
      </a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :rowKey="record => record.id" bordered>
      <template
        v-for="col in ['address', 'longitude', 'latitude', 'raduis']"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleTableChange(e.target.value, record.id, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id)">保存</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.id)">修改</a>
            <a :disabled="editingKey !== ''" @click="() => deleteRecord(record.id)">删除</a>
          </span>
        </div>
      </template>
    </a-table>

    <a-modal :width="900" v-model="formModalVisible" title="添加打卡地址" @ok="handleOk" @cancel="handleCancel">
      <div class="map-container">
        <div class="search">
          <a-input
            v-model="inputValue"
            placeholder="请输入"
            style="width: 300px;z-index: 100;height: 50px;"
            @change="handleChange"
            @focus="focus"
          >
          </a-input>
          <div v-if="isShowAddresslist" class="address-container">
            <div v-for="item in dataSource" class="address-item" @click="addressClick(item)">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div v-if="JSON.stringify(currentPointInfo) !== '{}'" class="info-card">
          <div class="address-name">
            <img src="@/assets/location.png" alt="" />
            <div class="name">{{ currentPointInfo.name || '' }}</div>
          </div>
          <div class="address-location">经度: {{ clickPoint.lng || '' }}</div>
          <div class="address-location">纬度: {{ clickPoint.lat || '' }}</div>
        </div>
        <div id="container"></div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import PageView from '@/components/layouts/PageView'
import STable from '@/components/table/'

import { getLocationSuggestion, getLocationSearch } from '@/api/bmap.js'
import { getSignAddressList, postAddAddress, editAddress, deleteAddress } from '@/api/myAttendance.js'

const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    key: i.toString(),
    raduis: '500米',
    lng: 32.2232323,
    lat: 122.489745654,
    address: `London Park no. ${i}`
  })
}
export default {
  components: { PageView, STable },
  data() {
    return {
      map: null,
      clickPoint: null, // 当前选点的点的经纬度信息
      dataSource: [], // 搜索下拉的数据
      inputValue: '',
      currentPointInfo: {}, // 当前选点的信息
      isShowAddresslist: false, // 地点检索提示
      // 表头
      columns: [
        {
          title: '考勤地址',
          dataIndex: 'address',
          scopedSlots: { customRender: 'address' }
        },
        {
          title: '经度',
          dataIndex: 'longitude',
          scopedSlots: { customRender: 'longitude' }
        },
        {
          title: '纬度',
          dataIndex: 'latitude',
          scopedSlots: { customRender: 'latitude' }
        },
        {
          title: '有效范围',
          dataIndex: 'raduis',
          scopedSlots: { customRender: 'raduis' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [], // table数据
      cacheData: [], // 缓存数据
      editingKey: '',
      formModalVisible: false // 添加打卡地址弹窗
    }
  },
  created() {
    this.getAddressList()
  },
  mounted() {
    // this.initMap()
  },
  watch: {
    clickPoint(newVal) {
      this.addPointMarker(newVal)
    }
  },
  methods: {
    // 初始化地图
    async initMap() {
      this.map = new BMapGL.Map('container')
      this.map.centerAndZoom(new BMapGL.Point(113.364873, 23.115797), 17)
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      this.mapAddClick()
      let p = await this.getLocationSdk()
      this.panTo({ lng: p.lng, lat: p.lat })
    },
    // sdk辅助定位
    getLocationSdk() {
      return new Promise(resolve => {
        const geolocation = new BMapGL.Geolocation()
        // 开启SDK辅助定位
        geolocation.enableSDKLocation()
        geolocation.getCurrentPosition(function(r) {
          resolve({ lng: r.point.lng, lat: r.point.lat })
        })
      })
    },
    // 创建marker ({lng: string,lat: string})
    addPointMarker({ lng, lat }) {
      this.map.clearOverlays()
      const marker = new BMapGL.Marker(new BMapGL.Point(lng, lat))
      this.map.addOverlay(marker)
    },
    // 创建圆形区域 ({lng: string,lat: string})
    addCircleOverlay({ lng, lat }) {
      this.map.clearOverlays()
      const P = new BMapGL.Point(lng, lat)
      // 创建圆
      const circle = new BMapGL.Circle(P, 250, {
        strokeColor: 'blue',
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: '#5896ec',
        fillOpacity: 0.3,
        strokeStyle: 'dashed'
      })
      this.map.addOverlay(circle) // 增加圆
    },
    // 移动地图中心
    panTo({ lng, lat }) {
      const point = new BMapGL.Point(lng, lat)
      this.map.panTo(point)
    },
    // 地图添加点击事件
    mapAddClick() {
      this.map.addEventListener('click', ({ latlng }) => {
        let pointObj = { lng: latlng.lng, lat: latlng.lat }
        this.clickPoint = pointObj
        this.queryAddressByLocation(pointObj)
      })
    },
    // 获取打卡地址分页列表
    async getAddressList() {
      const res = await getSignAddressList()
      console.log('获取打卡地址分页列表', res)
      if (res.code === 200) {
        this.data = res.result.records
        this.cacheData = res.result.records.map(item => ({ ...item }))
      }
    },
    async queryAddressByLocation(location) {
      const pois = [
        '房地产',
        '美食',
        '酒店',
        '生活服务',
        '旅游景点',
        '公司企业',
        '运动健身',
        '教育培训',
        '医疗',
        '休闲娱乐',
        '政府机构',
        '行政地标'
      ]
      let res = await getLocationSearch({
        location: `${location.lat},${location.lng}`,
        ak: 'gZei3MqT07iaHGD6ykCsx2ImGtBez4h0',
        radius: 100,
        output: `json`,
        extensions_poi: 1,
        query: pois.join('$'),
        pageSize: 1
      })
      if (res.data.results.length !== 0) {
        console.log('地点检索', res)
        this.currentPointInfo = res.data.results[0]
      }
    },
    async queryAddressBySuggestion(query) {
      let res = await getLocationSuggestion({
        q: query,
        region: '长沙市',
        output: 'json',
        ak: 'gZei3MqT07iaHGD6ykCsx2ImGtBez4h0'
      })
      console.log('地点提示请求结果', res)
      if (res.data.result.length !== 0) {
        this.dataSource = res.data.result
        this.isShowAddresslist = true
      }
    },
    handleSearch(e) {
      console.log('handleSearch', e.target)
    },
    // 输入框change
    handleChange(e) {
      console.log('handleChange', e.target.value)
      this.queryAddressBySuggestion(e.target.value)
    },
    // 搜索下拉点击回调
    addressClick(info) {
      this.inputValue = info.name
      this.isShowAddresslist = false
      this.currentPointInfo = info
      let pointObj = { lng: info.location.lng, lat: info.location.lat }
      this.clickPoint = pointObj
      this.panTo(pointObj)
      this.addPointMarker(pointObj)
    },
    focus() {
      this.isShowAddresslist = true
    },
    // 点击添加按钮
    addClick() {
      this.formModalVisible = true
      this.$nextTick(() => {
        this.initMap()
      })
    },
    // model ok
    async handleOk() {
      this.formModalVisible = false
      const params = {
        address: this.currentPointInfo.name,
        latitude: this.clickPoint.lat,
        longitude: this.clickPoint.lng,
        raduis: 250
      }
      const res = await postAddAddress(params)
      console.log('添加考勤地点', res)
      if (res.code === 200) {
        this.$message.success('添加成功')
        this.getAddressList()
      }
    },
    // model cancel
    handleCancel() {
      this.formModalVisible = false
      this.currentPointInfo = {}
      this.clickPoint = {}
    },

    edit(id) {
      const newData = [...this.data]
      const target = newData.find(item => id === item.id)
      this.editingKey = id
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    // 删除
    async deleteRecord(id) {
      const params = {
        id
      }
      const res = await deleteAddress(params)
      console.log('删除地址', res)

      if (res.code === 200) {
        this.$message.success('删除成功')
        this.getAddressList()
      }
    },
    // 列表编辑输入框change
    handleTableChange(value, id, column) {
      console.log('列表编辑输入框change', value, id, column)
      const newData = [...this.data]
      const target = newData.find(item => id === item.id)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    async save(id) {
      const newData = [...this.data]
      // const newCacheData = [...this.cacheData]
      const target = newData.find(item => id === item.id)
      console.log('保存target', target)
      const params = {
        id: target.id,
        latitude: Number(target.latitude),
        longitude: Number(target.longitude),
        raduis: Number(target.raduis),
        address: target.address
      }
      const res = await editAddress(params)
      console.log('保存res', res)
      if (res.code === 200) {
        this.$message.success('修改成功')
        this.getAddressList()
      }
      // const targetCache = newCacheData.find(item => key === item.key)
      // if (target && targetCache) {
      //   delete target.editable
      //   this.data = newData
      //   Object.assign(targetCache, target)
      //   this.cacheData = newCacheData
      // }
      this.editingKey = ''
    },
    cancel(id) {
      const newData = [...this.data]
      const target = newData.find(item => id === item.id)
      this.editingKey = ''
      if (target) {
        Object.assign(
          target,
          this.cacheData.find(item => id === item.id)
        )
        delete target.editable
        this.data = newData
      }
    }
  }
}
</script>

<style lang="less" scope>
.action {
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 10px;
  .btn-tip {
    color: #aaa9ab;
    font-size: 15px;
    margin-right: 20px;
  }
}
.map-container {
  position: relative;

  #container {
    height: 500px;
    width: 100%;
  }
  .info-card {
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 100;
    .address-name {
      display: flex;
      align-items: center;
      font-size: 17px;
      font-weight: 600;
      img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
    .address-location {
      padding-left: 35px;
    }
  }
  .search {
    width: 300px;
    position: absolute;
    top: 50px;
    left: 50px;
    .address-container {
      position: absolute;
      z-index: 100;
      .address-item {
        width: 300px;
        background-color: #fff;
        padding: 5px 10px;
        box-sizing: border-box;
        cursor: pointer;
        p {
          margin-bottom: 0;
        }
      }
    }
  }
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>

