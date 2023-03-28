import { getAction } from '@/api/manage'
import axios from 'axios'

// 地点输入提示
export const getLocationSuggestion = params => {
  return axios({
    url: '/baiduMap/place/v2/suggestion',
    method: 'get',
    params: params
  })
}

// 地点检索
export const getLocationSearch = params => {
  return axios({
    url: '/baiduMap/place/v2/search',
    method: 'get',
    params: params
  })
}

