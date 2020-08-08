import axios from '@/libs/api.request'

// 获取 level 列表
export const queryListByLevel = (data) => {
  return axios.request({
    url: '/ds-ips-web/level/v1/queryListByLevel',
    method: 'post',
    data
  })
}

// 根据 level Id 获取 module 列表
export const querySelectItem = (data) => {
  return axios.request({
    url: '/ds-ips-web/module/v1/querySelectItem',
    method: 'post',
    data
  })
}

// 根据 module Id 获取 lesson 列表
export const queryLessonList = (data) => {
  return axios.request({
    url: '/ds-ips-web/lesson/v1/queryLessonList',
    method: 'get',
    params: data
  })
}

// 获取 游戏库 列表
export const queryGameList = () => {
  return axios.request({
    url: '/ds-ips-web/game/v1/queryGameList',
    method: 'post'
  })
}

// 题目管理  新增游戏
export const insertLessonGame = (data) => {
  return axios.request({
    url: '/ds-ips-web/lessonGame/v1/insertLessonGame',
    method: 'post',
    data
  })
}

// 题目管理  游戏列表展示
export const queryListByLessonGame = (data) => {
  return axios.request({
    url: '/ds-ips-web/lessonGame/v1/queryListByLessonGame',
    method: 'post',
    params: data
  })
}

// 题目管理  游戏列表修改
export const updateLessonGame = (data) => {
  return axios.request({
    url: '/ds-ips-web/lessonGame/v1/updateLessonGame',
    method: 'post',
    data
  })
}

// 题目管理  游戏列表删除
export const deleteLessonGameById = (data) => {
  return axios.request({
    url: '/ds-ips-web/lessonGame/v1/deleteLessonGameById',
    method: 'post',
    data
  })
}

// 题目管理  题目列表
export const queryQuestionByLessonIdAndGameId = (data) => {
  return axios.request({
    url: '/ds-ips-web/question/v1/queryQuestionByLessonIdAndGameId',
    method: 'post',
    data
  })
}

// 题目管理  题目新增
export const insertQuestion = (data) => {
  return axios.request({
    url: '/ds-ips-web/question/v1/insertQuestion',
    method: 'post',
    data
  })
}


// 题目管理  题目删除
export const deleteQuestionById = (data) => {
  return axios.request({
    url: '/ds-ips-web/question/v1/deleteQuestionById',
    method: 'post',
    data
  })
}

// 题目管理  题目修改
export const updateQuestionById = (data) => {
  return axios.request({
    url: '/ds-ips-web/question/v1/updateQuestionById',
    method: 'post',
    data
  })
}

