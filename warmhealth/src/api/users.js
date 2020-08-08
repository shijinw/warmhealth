import axios from '@/libs/api.request'

// 资源管理  用户查询
export const userInfoPageQuery = (data) => {
  return axios.request({
    url: '/admin/User/userList',
    method: 'get',
    params: data
  })
}

// 资源管理  用户新增
export const insertUser = (data) => {
  return axios.request({
    url: '/admin/User/addUser',
    method: 'post',
    data
  })
}

// 资源管理  用户修改
export const updateUser = (data) => {
  return axios.request({
    url: '/admin/User/putUser',
    method: 'post',
    data
  })
}

// 资源管理  用户删除
export const deleteUserById = (data) => {
  return axios.request({
    url: '/admin/User/delUser',
    method: 'get',
    params: data
  })
}

// 资源管理  用户初始化密码
export const initializePassword = (data) => {
  return axios.request({
    url: '/admin/User/initPassword',
    method: 'get',
    params: data
  })
}

// 用户修改密码
export const updatePassword = (data) => {
  return axios.request({
    url: '/admin/User/changePassword',
    method: 'post',
    data
  })
}

// 资源管理  获取班级列表
// export const queryListByTClass = (data) => {
//   return axios.request({
//     url: '/ds-ips-web/tClass/v1/queryListByTClass',
//     method: 'post',
//     data
//   })
// }

// 登录
export const goLogin = (data) => {
  return axios.request({
    url: '/admin/Login/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return axios.request({
    url: '/admin/Login/getUserInfo',
    method: 'get'
  })
}

// 获取用户所拥有的菜单
export const getMenuListByUserId = () => {
  return axios.request({
    url: '/admin/Auth/userRuleList',
    method: 'get'
  })
}
