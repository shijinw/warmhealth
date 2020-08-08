<template>
  <div>
    <div class="page-account-top">医护小程序后台管理系统</div>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
      <FormItem prop="phone">
        <Input v-model="form.phone" prefix="ios-contact-outline" size="large" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="form.password" prefix="ios-lock-outline" size="large" placeholder="请输入密码"></Input>
      </FormItem>
      <div class="page-account-auto-login">
        <Checkbox v-model="form.single" size="large">7天免密自动登录</Checkbox>
      </div>
      <FormItem>
        <Button @click="handleSubmit" type="primary" long size="large">登 录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    phoneRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        phone: '',
        password: '',
        single: false
      }
    }
  },
  computed: {
    rules () {
      return {
        phone: this.phoneRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.phone,
            password: this.form.password,
            single: this.form.single
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.page-account-top {
    padding: 120px 0 32px;
    text-align: center;
    font-size: 32px;
    font-weight: 500;
}
.page-account-auto-login {
    margin-bottom: 24px;
    text-align: left;
    a {
      color: #2d8cf0;
      background: transparent;
      font-size: 14px;
      text-decoration: none;
      outline: none;
      cursor: pointer;
      transition: color .2s ease;
      float: right;
    }
}
</style>
