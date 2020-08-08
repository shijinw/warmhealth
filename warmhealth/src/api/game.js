import axios from '@/libs/api.request'

// 游戏管理  列表查询
export const queryGameByWhere = (data) => {
  return axios.request({
    url: '/ds-ips-web/game/v1/queryGameByWhere',
    method: 'post',
    data
  })
}

// 游戏管理  新增
export const insertGame = (data) => {
  return axios.request({
    url: '/ds-ips-web/game/v1/insertGame',
    method: 'post',
    data
  })
}

// 游戏管理  修改
export const updateGameById = (data) => {
  return axios.request({
    url: '/ds-ips-web/game/v1/updateGameById',
    method: 'post',
    data
  })
}
