// import {
//   login,
//   logout,
//   getUserInfo,
//   getMessage,
//   getContentByMsgId,
//   hasRead,
//   removeReaded,
//   restoreTrash,
//   getUnreadCount
// } from '@/api/users'
import { goLogin, getUserInfo, getMenuListByUserId } from '@/api/users'
import { setToken, getToken, routersConfigAssembly } from '@/libs/util'
import { menuRefactoring } from '@/libs/business_util'
import _ from 'lodash'

export default {
  state: {
    id: '',
    token: getToken(),
    status: '',
    sex: '',
    mobile: '',
    role_id: '',
    role_name: '',
    username: '',
    realname: ''
    // unreadCount: 0,
    // messageUnreadList: [],
    // messageReadedList: [],
    // messageTrashList: [],
    // messageContentStore: {}
  },
  mutations: {
    setId (state, id) {
      state.id = id
    },
    setStatus (state, t) {
      state.status = t
    },
    setSex (state, sex) {
      state.sex = sex
    },
    setMobile (state, tp) {
      state.mobile = tp
    },
    setRoleId (state, a) {
      state.role_id = a
    },
    setRoleName (state, role_name) {
      state.role_name = role_name
    },
    setUsername (state, username) {
      state.username = username
    },
    setRealname (state, realname) {
      state.realname = realname
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
    // setMessageCount (state, count) {
    //   state.unreadCount = count
    // },
    // setMessageUnreadList (state, list) {
    //   state.messageUnreadList = list
    // },
    // setMessageReadedList (state, list) {
    //   state.messageReadedList = list
    // },
    // setMessageTrashList (state, list) {
    //   state.messageTrashList = list
    // },
    // updateMessageContentStore (state, { msg_id, content }) {
    //   state.messageContentStore[msg_id] = content
    // },
    // moveMsg (state, { from, to, msg_id }) {
    //   const index = state[from].findIndex(_ => _.msg_id === msg_id)
    //   const msgItem = state[from].splice(index, 1)[0]
    //   msgItem.loading = false
    //   state[to].unshift(msgItem)
    // }
  },
  getters: {
    // messageUnreadCount: state => state.messageUnreadList.length,
    // messageReadedCount: state => state.messageReadedList.length,
    // messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        goLogin({
          username,
          password
        }).then(res => {
          const data = res.data
          if (data.code == '200') {
            commit('setToken', data.data.token)
          }
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setRoutersConfig', { newRouters: [], routersData: [] }) // 变为静态路由
        window.localStorage.clear() // 清理缓存
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setId', data.data.id)
            commit('setStatus', data.data.status)
            commit('setSex', data.data.sex)
            commit('setMobile', data.data.mobile)
            commit('setRoleId', data.data.role_id)
            commit('setRoleName', data.data.role_name)
            commit('setUsername', data.data.username)
            commit('setRealname', data.data.realname)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    // getUnreadMessageCount ({ state, commit }) {
    //   getUnreadCount().then(res => {
    //     const { data } = res
    //     commit('setMessageCount', data)
    //   })
    // },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    // getMessageList ({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     getMessage().then(res => {
    //       const { unread, readed, trash } = res.data
    //       commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       commit('setMessageReadedList', readed.map(_ => {
    //         _.loading = false
    //         return _
    //       }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       commit('setMessageTrashList', trash.map(_ => {
    //         _.loading = false
    //         return _
    //       }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 根据当前点击的消息的id获取内容
    // getContentByMsgId ({ state, commit }, { msg_id }) {
    //   return new Promise((resolve, reject) => {
    //     let contentItem = state.messageContentStore[msg_id]
    //     if (contentItem) {
    //       resolve(contentItem)
    //     } else {
    //       getContentByMsgId(msg_id).then(res => {
    //         const content = res.data
    //         commit('updateMessageContentStore', { msg_id, content })
    //         resolve(content)
    //       })
    //     }
    //   })
    // },
    // 把一个未读消息标记为已读
    // hasRead ({ state, commit }, { msg_id }) {
    //   return new Promise((resolve, reject) => {
    //     hasRead(msg_id).then(() => {
    //       commit('moveMsg', {
    //         from: 'messageUnreadList',
    //         to: 'messageReadedList',
    //         msg_id
    //       })
    //       commit('setMessageCount', state.unreadCount - 1)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 删除一个已读消息到回收站
    // removeReaded ({ commit }, { msg_id }) {
    //   return new Promise((resolve, reject) => {
    //     removeReaded(msg_id).then(() => {
    //       commit('moveMsg', {
    //         from: 'messageReadedList',
    //         to: 'messageTrashList',
    //         msg_id
    //       })
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 还原一个已删除消息到已读消息
    // restoreTrash ({ commit }, { msg_id }) {
    //   return new Promise((resolve, reject) => {
    //     restoreTrash(msg_id).then(() => {
    //       commit('moveMsg', {
    //         from: 'messageTrashList',
    //         to: 'messageReadedList',
    //         msg_id
    //       })
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }
    // 获取用户路由
    getRoutersConfig ({ state, commit }) {
      /* 有标准路由JOSN模式
     return getRouterReq().then((routersData) => {
        let routersConfig = _.cloneDeep(routersData.data)
        let newRoutersConfigObj = routersConfigAssembly(routersConfig)
        commit('setRoutersConfig', { newRouters: newRoutersConfigObj, routersData: routersData.data })
        return newRoutersConfigObj
      }) */

      /* 需要转换菜单JOSN为标准路由JOSN模式 */
      return getMenuListByUserId().then((routersData) => {
        //  console.log('获取到用户菜单：' + JSON.stringify(routersData.data))
        // 把菜单列表转为框架标准路由JSON格式
        console.log(routersData)
        let newRoutersData = menuRefactoring(routersData.data.data, '-1')
        //  console.log("转换路由："+JSON.stringify(newRoutersData))
        let routersConfig = _.cloneDeep(newRoutersData)
        let newRoutersConfigObj = routersConfigAssembly(routersConfig)
        commit('setRoutersConfig', { newRouters: newRoutersConfigObj, routersData: newRoutersData })
        return newRoutersConfigObj
      })
    }
  }
}
