import axios from '@/libs/api.request'

// level管理  列表查询
export const queryListByLevel = (data) => {
  return axios.request({
    url: '/ds-ips-web/level/v1/queryListByLevel',
    method: 'post',
    data
  })
}

// level 管理  新增
export const insertLevel = (data) => {
  return axios.request({
    url: '/ds-ips-web/level/v1/insertLevel',
    method: 'post',
    data
  })
}

// level 管理  修改
export const updateLevel = (data) => {
  return axios.request({
    url: '/ds-ips-web/level/v1/updateLevel',
    method: 'post',
    data
  })
}

// level 管理  删除
export const deleteLevelById = (data) => {
  return axios.request({
    url: '/ds-ips-web/level/v1/deleteLevelById',
    method: 'get',
    params: data
  })
}

// module管理  列表查询
export const queryModuleList = (data) => {
  return axios.request({
    url: '/ds-ips-web/module/v1/queryModuleList',
    method: 'post',
    data
  })
}

// module管理  新增
export const add = (data) => {
  return axios.request({
    url: '/ds-ips-web/module/v1/add',
    method: 'post',
    data
  })
}

// module管理  修改
export const update = (data) => {
  return axios.request({
    url: '/ds-ips-web/module/v1/update',
    method: 'post',
    data
  })
}

// module管理  删除
export const moduleDelete = (data) => {
  return axios.request({
    url: '/ds-ips-web/module/v1/delete',
    method: 'post',
    data
  })
}

// lesson管理  列表查询
export const queryLessonPage = (data) => {
  return axios.request({
    url: '/ds-ips-web/lesson/v1/queryLessonPage',
    method: 'post',
    data
  })
}

// lesson管理  新增
export const lessonAdd = (data) => {
  return axios.request({
    url: '/ds-ips-web/lesson/v1/add',
    method: 'post',
    data
  })
}

// lesson管理  修改
export const lessonUpdate = (data) => {
  return axios.request({
    url: '/ds-ips-web/lesson/v1/update',
    method: 'post',
    data
  })
}

// lesson管理  删除
export const lessonDelete = (data) => {
  return axios.request({
    url: '/ds-ips-web/lesson/v1/delete',
    method: 'get',
    params: data
  })
}
