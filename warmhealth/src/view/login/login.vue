<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="form-con">
        <login-form @on-success-valid="handleSubmit"></login-form>
        <p class="login-tip">为了您的用户体验，请使用最新版的浏览器</p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import Cookie from 'js-cookie'
export default {
  components: {
    LoginForm
  },
  mounted () {
    let bsUserInfo = Cookie.get('bsUserInfo')
    if (bsUserInfo) {
      this.handleSubmit(JSON.parse(bsUserInfo))
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'getRoutersConfig'
    ]),
    handleSubmit ({ username, password, single }) {
      this.handleLogin({ username, password }).then(res => {
        if (res.code == '200') {
          let status = { single }
          if (status.single) {
            let obj = { username, password }
            let objStr = JSON.stringify(obj)
            Cookie.set('bsUserInfo', objStr, { expires: 7 })
          }
          this.$Message.success('登录成功，正在跳转...')
          Promise.all([this.getRoutersConfig(), this.getUserInfo()]).then(res => {
            // 注册新路由配置
            this.$router.addRoutes(res[0])
            setTimeout(() => {
              this.$router.push({
                name: this.$config.homeName
              })
            }, 1000)
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
