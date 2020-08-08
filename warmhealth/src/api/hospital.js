import axios from '@/libs/api.request'

// 游戏管理  列表查询
export const addhospital = (data) => {
  return axios.request({
    url: '/admin/Hospital/addhospital',
    method: 'post',
    data
  })
}

export const puthospital = (data) => {
  return axios.request({
    url: '/admin/Hospital/puthospital',
    method: 'post',
    data
  })
}

export const hospitalList = (data) => {
  return axios.request({
    url: '/admin/Hospital/hospitalList',
    method: 'get',
    params: data
  })
}

export const delHhospital = (data) => {
  return axios.request({
    url: '/admin/Hospital/delHhospital',
    method: 'get',
    params: data
  })
}

export const departmentList = (data) => {
  return axios.request({
    url: '/admin/Hospital/departmentList',
    method: 'get',
    params: data
  })
}

export const addDepartment = (data) => {
  return axios.request({
    url: '/admin/Hospital/addDepartment',
    method: 'post',
    data
  })
}

export const putDepartment = (data) => {
  return axios.request({
    url: '/admin/Hospital/putDepartment',
    method: 'post',
    data
  })
}

export const sosList = (data) => {
  return axios.request({
    url: '/admin/Sos/sosList',
    method: 'get',
    params: data
  })
}

export const getSosUserDetails = (data) => {
  return axios.request({
    url: '/admin/Sos/getSosUserDetails',
    method: 'get',
    params: data
  })
}

export const putUserSos = (data) => {
  return axios.request({
    url: '/admin/Sos/putUserSos',
    method: 'post',
    data
  })
}

export const getSosCount = (data) => {
  return axios.request({
    url: '/admin/Sos/getSosCount',
    method: 'post',
    data
  })
}

export const auscultationList = (data) => {
  return axios.request({
    url: '/admin/Auscultation/auscultationList',
    method: 'get',
    params: data
  })
}

export const getAuscultationDeatils = (data) => {
  return axios.request({
    url: '/admin/Auscultation/getAuscultationDeatils',
    method: 'get',
    params: data
  })
}

export const addAuscultationOne = (data) => {
  return axios.request({
    url: '/admin/Auscultation/addAuscultationOne',
    method: 'get',
    params: data
  })
}

export const putAuscultationInfo = (data) => {
  return axios.request({
    url: '/admin/Auscultation/putAuscultationInfo',
    method: 'get',
    params: data
  })
}

export const getHospitalDetails = (data) => {
  return axios.request({
    url: '/admin/Hospital/getHospitalDetails',
    method: 'get',
    params: data
  })
}
