<template>
  <div class="page-container addressEntry-container">
    <PageView></PageView>
    <div class="action">
      <div class="btn-tip">可添加多个地址</div>
      <a-button type="primary" icon="plus" @click="addClick">
        添加
      </a-button>
    </div>
    <a-table :columns="columns" :data-source="data" bordered>
      <template v-for="col in ['address', 'lng', 'lat', 'raduis']" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
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
      clickPoint: null, // 当前点击的点
      dataSource: [], // 搜索下拉的数据
      inputValue: '',
      currentPointInfo: {}, // 当前选点的信息
      isShowAddresslist: false,
      // 表头
      columns: [
        {
          title: '考勤地址',
          dataIndex: 'address',
          scopedSlots: { customRender: 'address' }
        },
        {
          title: '经度',
          dataIndex: 'lng',
          scopedSlots: { customRender: 'lng' }
        },
        {
          title: '纬度',
          dataIndex: 'lat',
          scopedSlots: { customRender: 'lat' }
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
      data,
      editingKey: '',
      formModalVisible: false
    }
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
    addClick() {
      this.formModalVisible = true
      this.$nextTick(() => {
        this.initMap()
      })
    },
    handleOk() {
      this.formModalVisible = false
    },
    handleCancel() {
      this.formModalVisible = false
      this.currentPointInfo = {}
      this.clickPoint = {}
    },
    handleChange(value, key, column) {},
    edit(key) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save(key) {},
    cancel(key) {}
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

