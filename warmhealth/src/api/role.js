import axios from '@/libs/api.request'

// 资源管理  角色查询分页
export const roleInfoPageQuery = (data) => {
  return axios.request({
    url: '/admin/Auth/roleList',
    method: 'get',
    params: data
  })
}

// 资源管理  角色查询全部
// export const queryListByRole = (data) => {
//   return axios.request({
//     url: '/ds-ips-web/role/v1/queryListByRole',
//     method: 'post',
//     data
//   })
// }


// 资源管理  角色新增
export const insertRole = (data) => {
  return axios.request({
    url: '/admin/Auth/addRole',
    method: 'post',
    data
  })
}

// 资源管理  角色修改
export const updateRole = (data) => {
  return axios.request({
    url: '/admin/Auth/putRole',
    method: 'post',
    data
  })
}

// 资源管理  角色删除
export const deleteRoleById = (data) => {
  return axios.request({
    url: '/admin/Auth/delRole',
    method: 'get',
    params: data
  })
}
