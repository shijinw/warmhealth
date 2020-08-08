<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <!-- <Avatar :src="userAvatar"/> -->
        <Avatar icon="ios-person" />
      </Badge>
      <div style="font-size: 14px; font-weight: 600; display: inline-block; line-height: 64px;padding: 0 0 0 5px;">{{ realName }}</div>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="edit">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <!-- 修改密码 -->
    <Modal
      v-model="modal"
      title="修改密码"
      width="420"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-cancel="closeModal('formValidate')"
      :footer-hide="true">
      <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="100">
        <FormItem label="旧密码" prop="old_password">
          <Input v-model="formData.old_password" type="password" placeholder="旧密码"></Input>
        </FormItem>

        <FormItem label="新密码" prop="password">
          <Input v-model="formData.password" type="password" placeholder="新密码"></Input>
        </FormItem>

        <FormItem label="确认密码" prop="pass">
          <Input v-model="formData.pass" type="password" placeholder="确认密码"></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit('formValidate')">确认修改</Button>
          <Button @click="closeModal('formValidate')" style="margin-left: 8px">关 闭</Button>
        </FormItem>
      </Form>
    </Modal>
      <Modal
        title="消息提醒"
        draggable
        v-model="messat"
        width="250"
        @on-ok="meaaage"
        :styles="{top: '20px'}">
        <p>你有一条未处理事件</p>
    </Modal>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import { updatePassword } from '@/api/users'

import Cookie from 'js-cookie'
import { setTimeout, setInterval } from 'timers';
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },

  },
  computed: {
    realName () {
      return this.$store.state.user.realname
    }
  },
  data () {
    return {
      messat:false,
      formData: {
        old_password: '',
        password: '',
        pass: '',
        id: this.$store.state.user.id
      },
      messageUnreadCount:0,
      timer:null,
      modal: false,
      loading: false,
      ruleValidate: {
        pass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        old_password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    // 关闭弹框
    closeModal (name) {
      this.handleReset(name)
      this.modal = false
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    // 修改保存
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          if (this.formData.password !== this.formData.pass) {
            this.$Message.error('两次密码输入不一致！')
            return
          }
          this.loading = true
          let { data } = await updatePassword(this.formData)
          if (data.code == '200') {
            this.$Message.success('修改成功，请重新登录!')
            setTimeout(() => {
              this.loading = false
              Cookie.remove('bsUserInfo')
              this.logout()
              this.closeModal('formValidate')
            }, 2000)
          } else {
            this.loading = false
            this.$Message.error(data.msg)
          }
        } else {
          this.$Message.error('表单信息不完整或不合法!')
        }
      })
    },
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
       if(this.$route.name=='Sos_list'){
      this.$router.push(0)
       }else{
            this.$router.push({
        name: 'Sos_list'
      })
       }
    },
    edit () {
      this.modal = true
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
        case 'edit': this.edit()
      }
    },
    meaaage(){
      this.$router.push({name:'Sos_list'})
      this.messat=false
     console.log(this.messat);

    },
  },

  mounted(){


  },

}
</script>
<style scoped>
.ivu-alert-close{
  top: 30px
}
</style>
