import axios from '@/libs/api.request'

// 操作日志  列表查询
export const tLogInfoPageQuery = (data) => {
  return axios.request({
    url: '/admin/User/logList',
    method: 'get',
    params: data
  })
}

export const configList = (data) => {
  return axios.request({
    url: '/admin/System/configList',
    method: 'get',
    params: data
  })
}
export const putSystem = (data) => {
  return axios.request({
    url: '/admin/System/putSystem',
    method: 'post',
     data
  })
}
