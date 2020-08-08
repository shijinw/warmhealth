import axios from '@/libs/api.request'

// 资源管理  目录查询
export const queryListByMenu = (data) => {
  return axios.request({
    url: '/admin/Auth/ruleList',
    method: 'get'
  })
}


// 资源管理  目录新增
export const insertMenu = (data) => {
  return axios.request({
    url: '/admin/Auth/addMenuRule',
    method: 'post',
    data
  })
}

// 资源管理  目录修改
export const updateMenu = (data) => {
  return axios.request({
    url: '/admin/Auth/putMenuRule',
    method: 'post',
    data
  })
}

// 资源管理  目录删除
export const deleteMenuById = (data) => {
  return axios.request({
    url: '/admin/Auth/delMenuRule',
    method: 'get',
    params: data
  })
}
