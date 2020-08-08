import axios from '@/libs/api.request'

// 患者列表
export const userList = (data) => {
  return axios.request({
    url: '/admin/Patient/userList',
    method: 'get',
    params: data
  })
}

// 反馈症状列表
export const feedbackList = (data) => {
  return axios.request({
    url: '/admin/Patient/feedbackList',
    method: 'get',
    params: data
  })
}

// 反馈症状列表
export const replyFeedback = (data) => {
  return axios.request({
    url: '/admin/Patient/replyFeedback',
    method: 'post',
    data
  })
}

// 问卷列表
export const quesurveyList = (data) => {
  return axios.request({
    url: '/admin/Quesurvey/quesurveyList',
    method: 'get',
    params: data
  })
}

// 删除问卷
export const delQuesurvey = (data) => {
  return axios.request({
    url: '/admin/Quesurvey/delQuesurvey',
    method: 'get',
    params: data
  })
}

// 问卷详情
export const getQuesurvey = (data) => {
  return axios.request({
    url: '/admin/Quesurvey/getQuesurvey',
    method: 'get',
    params: data
  })
}

// 患者血压列表/admin/Patient/UserBloodList
export const UserBloodList = (data) => {
  return axios.request({
    url: '/admin/Patient/UserBloodList',
    method: 'get',
    params: data
  })
}

// 患者导出
export const userExport = (data) => {
  return axios.request({
    url: '/admin/Patient/userExport',
    method: 'get',
    params: data
  })
}

// 患者导入
export const leadUser = (data) => {
  return axios.request({
    url: '/admin/Patient/leadUser',
    method: 'post',
    data
  })
}

// 问卷导出
export const quesurveyExport = (data) => {
  return axios.request({
    url: '/admin/Quesurvey/quesurveyExport',
    method: 'get',
    params: data
  })
}

// 问卷导入
export const leadQuesurvey = (data) => {
  return axios.request({
    url: '/admin/Quesurvey/leadQuesurvey',
    method: 'post',
    data
  })
}

// 患者血压导出
export const UserBloodExport = (data) => {
  return axios.request({
    url: '/admin/Patient/UserBloodExport',
    method: 'get',
    params: data
  })
}

// 患者血压导入
export const leadBlood = (data) => {
  return axios.request({
    url: '/admin/Patient/leadBlood',
    method: 'post',
    data
  })
}

export const hospitalList = (data) => {
  return axios.request({
    url: '/applet/Hospital/hospitalList',
    method: 'get',
    params: data
  })
}

export const addAuscultationOne = (data) => {
  return axios.request({
    url: '/admin/Auscultation/addAuscultationOne',
    method: 'post',
    data
  })
}

export const getUserDetalis = (data) => {
  return axios.request({
    url: '/admin/Patient/getUserDetalis',
    method: 'get',
    params: data
  })
}

export const auditStatus = (data) => {
  return axios.request({
    url: '/admin/Doctor/auditStatus',
    method: 'get',
    params: data
  })
}

export const doctorList = (data) => {
  return axios.request({
    url: '/admin/Doctor/doctorList',
    method: 'get',
    params: data
  })
}

export const getDoctorDetalis = (data) => {
  return axios.request({
    url: '/admin/Doctor/getDoctorDetalis',
    method: 'get',
    params: data
  })
}

export const bindingRegister = (data) => {
  return axios.request({
    url: '/admin/Lung/bindingRegister',
    method: 'get',
    params: data
  })
}


export const putUserInfo = (data) => {
  return axios.request({
    url: '/admin/Lung/putUserInfo',
    method: 'post',
    params: data
  })
}

export const bindDevice = (data) => {
  return axios.request({
    url: '/admin/Lung/bindDevice',
    method: 'post',
     data
  })
}

export const unbindDevice = (data) => {
  return axios.request({
    url: '/admin/Lung/unbindDevice',
    method: 'post',
   data
  })
}

export const predictedvalueOne = (data) => {
  return axios.request({
    url: '/admin/Lung/predictedvalueOne',
    method: 'get',
    params: data
  })
}

export const predictedvalueTow = (data) => {
  return axios.request({
    url: '/admin/Lung/predictedvalueTow',
    method: 'get',
    params: data
  })
}

export const getFVCTestData = (data) => {
  return axios.request({
    url: '/admin/Lung/getFVCTestData',
    method: 'get',
    params: data
  })
}


export const getFVCdailyreport = (data) => {
  return axios.request({
    url: '/admin/Lung/getFVCdailyreport',
    method: 'get',
    params: data
  })
}

export const PredictedDetails = (data) => {
  return axios.request({
    url: '/admin/Lung/PredictedDetails',
    method: 'get',
    params: data
  })
}

export const FVCTestLIst = (data) => {
  return axios.request({
    url: '/admin/Lung/FVCTestLIst',
    method: 'get',
    params: data
  })
}

export const FVCTestDetails = (data) => {
  return axios.request({
    url: '/admin/Lung/FVCTestDetails',
    method: 'get',
    params: data
  })
}

export const FVCReportList = (data) => {
  return axios.request({
    url: '/admin/Lung/FVCReportList',
    method: 'get',
    params: data
  })
}
export const FVCReportDetails = (data) => {
  return axios.request({
    url: '/admin/Lung/FVCReportDetails',
    method: 'get',
    params: data
  })
}

export const forcebind = (data) => {
  return axios.request({
    url: '/admin/Lung/forcebind',
    method: 'get',
    params: data
  })
}
