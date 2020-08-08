<template>
  <div>
    <Card style="min-height: 80vh;">
      <Row>
        <Col span="24">
          <Form ref="form" :model="form" inline label-position="left" :label-width="60">
            <FormItem label="手机号码" prop="mobile">
              <Input type="text" v-model="form.mobile" clearable placeholder="手机号码"></Input>
            </FormItem>
            <FormItem label="真实名称" prop="realname">
              <Input type="text" v-model="form.realname" clearable placeholder="真实名称"></Input>
            </FormItem>
            <FormItem label="用户状态" prop="status">
              <Select v-model="form.status" clearable style="width: 160px;">
                <Option value="1">正常</Option>
                <Option value="2">禁用</Option>
              </Select>
            </FormItem>
            <Button type="primary" @click="onSeach">查 询</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Button type="primary" style="float: right;" icon="ios-add" @click="add">新增用户</Button>
      </Row>

      <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="id">
          <span>{{ row.id }}</span>
        </template>
        <template slot-scope="{ row }" slot="username">
          <strong>{{ row.username }}</strong>
        </template>
        <template slot-scope="{ row }" slot="mobile">
          <span>{{ row.mobile }}</span>
        </template>
        <template slot-scope="{ row }" slot="realname">
          <span>{{ row.realname }}</span>
        </template>
        <template slot-scope="{ row }" slot="sex">
          <span>{{ row.sex == '1' ? '男' : row.sex == '2' ? '女' : '未填写' }}</span>
        </template>
        <template slot-scope="{ row }" slot="status">
          <span :style="{color: row.status == '1' ? '#19be6b' : '#ed4014'}">{{ row.status == '1' ? '启用' : '禁用' }}</span>
        </template>
        <template slot-scope="{ row }" slot="role_name">
          <span>{{ row.role_name }}</span>
        </template>
        <template slot-scope="{ row }" slot="create_time">
          <span>{{ row.create_time | getDateTime }}</span>
        </template>
        <!-- <template slot-scope="{ row }" slot="updateTime">
          <span>{{ row.updateTime | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="updatePerson">
          <span>{{ row.updatePerson }}</span>
        </template> -->
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, index)">修 改</Button>
          <Button type="primary" size="small" style="margin-right: 5px" @click="del(row, index)">删 除</Button>
          <Button type="primary" size="small" @click="resetPassword(row, index)">初始化密码</Button>
        </template>
      </Table>

      <div style="text-align: right; margin-top: 16px;">
        <Page
          :total="total"
          show-sizer
          show-elevator
          show-total
          :page-size-opts="pageSizeOpts"
          :page-size="form.limit"
          :current="form.page"
          @on-change="pageOnChange"
          @on-page-size-change="pageSizeOnChange" />
      </div>

      <Modal
        v-model="modal"
        :title="title"
        width="640"
        :mask-closable="false"
        :styles="{top: '20px'}"
        @on-cancel="closeModal('formValidate')"
        :footer-hide="true">
        <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="100">
          <Row>
            <Col span="12">
              <FormItem label="用户名" prop="username">
                <Input v-model="formData.username" placeholder="用户名(将做为登录账号使用)"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="选择角色" prop="role_id">
                <Select v-model="formData.role_id" placeholder="请选择角色">
                  <Option v-for="(val, index) in roleList" :key="index" :value="val.id">{{ val.role_name }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="手机号" prop="mobile">
                <Input v-model="formData.mobile" placeholder="手机号码"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="真实姓名" prop="realname">
                <Input v-model="formData.realname" placeholder="真实姓名"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="状态" prop="status">
                <RadioGroup v-model="formData.status">
                  <Radio label="1">正常</Radio>
                  <Radio label="2">禁用</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="性别" prop="sex">
                <RadioGroup v-model="formData.sex">
                  <Radio label="1">男</Radio>
                  <Radio label="2">女</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="邮箱" prop="email">
                <Input v-model="formData.email" placeholder="邮箱"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="设置密码" prop="password" v-if="title == '新增用户'">
                <Input v-model="formData.password" type="password" placeholder="设置密码"></Input>
              </FormItem>
            </Col>
          </Row>

          <FormItem label="备注" prop="remark">
            <Input v-model="formData.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 10 }" placeholder="remark"></Input>
          </FormItem>

          <FormItem>
            <Button type="primary" :loading="loading" v-if="title == '新增用户'" @click="handleSubmit('formValidate')">新 增</Button>
            <Button type="primary" :loading="loading" v-if="title == '修改用户'" @click="handleSubmit2('formValidate')">修 改</Button>
            <Button @click="closeModal('formValidate')" style="margin-left: 8px">关 闭</Button>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>

<script>
import Format from '@/libs/format.js' // 自定义验证
import {
  roleInfoPageQuery
} from '@/api/role'
import {
  userInfoPageQuery,
  insertUser,
  updateUser,
  deleteUserById,
  initializePassword,
  updatePassword
} from '@/api/users'
export default {
  name: 'user_page',
  data () {
    return {
      form: {
        mobile: '',
        realname: '',
        status: '',
        page: 1,
        limit: 10
      },
      modal: false,
      roleList: [],
      classList: [],
      columns: [
        {
          title: 'ID',
          slot: 'id',
          tooltip: true,
          align: 'center',
          minWidth: 60
        },
        {
          title: '用户名(账号)',
          slot: 'username',
          tooltip: true,
          align: 'center',
          minWidth: 120
        },
        {
          title: '手机号',
          slot: 'mobile',
          tooltip: true,
          align: 'center',
          minWidth: 120
        },
        {
          title: '真实姓名',
          slot: 'realname',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '性别',
          slot: 'sex',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '状态',
          slot: 'status',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '关联的角色名',
          slot: 'role_name',
          tooltip: true,
          minWidth: 150,
          align: 'center'
        },
        {
          title: '创建时间',
          slot: 'create_time',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '操作',
          slot: 'action',
          width: 230,
          align: 'center'
        }
      ],
      loading: false,
      title: '新增用户',
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      tableData: [],
      gameList: [],
      formData: {
        mobile: '',
        realname: '',
        username: '',
        status: '',
        role_id: '',
        sex: '',
        email: '',
        password: '',
        remark: ''
      },
      ruleValidate: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请为该用户设置密码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        role_id: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  created () {

  },
  mounted () {
    this.getList()
  },
  methods: {
    // 查询
    onSeach () {
      this.getList()
    },
    // 列表展示
    async getList () {
      let { data } = await userInfoPageQuery(this.form)
      if (data.code == '200') {
        this.tableData = data.data.data
        this.total = data.data.total
      } else {
        this.$Message.error(data.msg)
      }
    },
    // 获取角色列表
    async getRoleList () {
      let { data } = await roleInfoPageQuery({ limit: 1000, page: 1 })
      if (data.code == '200') {
        this.roleList = data.data.data
      }
    },
    // 新增
    async add () {
      this.title = '新增用户'
      this.getRoleList()
      this.modal = true
    },
    // 修改
    async edit (row, index) {
      this.getRoleList()
      this.title = '修改用户'
      let obj = Object.assign({}, row)
      this.formData.id = obj.id
      this.formData.mobile = obj.mobile
      this.formData.realname = obj.realname
      this.formData.username = obj.username
      this.formData.sex = obj.sex
      this.formData.status = obj.status
      this.formData.email = obj.email
      this.formData.remark = obj.remark
      this.formData.password = ''
      this.formData.role_id = obj.role_id
      this.modal = true
    },
    // 切换分页
    pageOnChange (val) {
      this.form.page = val
      this.getList()
    },
    // 切换条数
    pageSizeOnChange (val) {
      this.form.limit = val
      this.getList()
    },
    // 删除
    del (row, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认删除？</p>',
        onOk: async () => {
          let { data } = await deleteUserById({ id: row.id })
          if (data.code == '200') {
            this.$Message.success('删除成功!')
            this.getList()
          } else {
            this.$Message.error(data.msg)
          }
        }
      })
    },
    resetPassword (row, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认初始化该用户密码？</p>',
        onOk: async () => {
          let { data } = await initializePassword({ id: row.id })
          if (data.code == '200') {
            this.$Message.success('初始化成功，初始密码为 123456!')
            this.getList()
          } else {
            this.$Message.error(data.msg)
          }
        }
      })
    },
    // 关闭弹框
    closeModal (name) {
      this.handleReset(name)
      this.modal = false
    },
    // 新增保存
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let obj = Object.assign({}, this.formData)
          let { data } = await insertUser(obj)
          if (data.code == '200') {
            this.$Message.success('新增成功!')
            setTimeout(() => {
              this.loading = false
              this.closeModal('formValidate')
              this.getList()
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
    // 修改保存
    handleSubmit2 (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let obj = Object.assign({}, this.formData)
          let { data } = await updateUser(obj)
          if (data.code == '200') {
            this.$Message.success('修改成功!')
            setTimeout(() => {
              this.loading = false
              this.closeModal('formValidate')
              this.getList()
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
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="less">

</style>
