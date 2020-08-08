<template>
  <div>
    <Card style="min-height: 80vh;">
      <div class="bs-btns">
        <Button type="primary" icon="ios-add" @click="addShow">新增角色</Button>
      </div>

      <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="id">
          <span>{{ row.id }}</span>
        </template>
        <template slot-scope="{ row }" slot="role_name">
          <strong>{{ row.role_name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="remark">
          <span>{{ row.remark }}</span>
        </template>
        <template slot-scope="{ row }" slot="create_time">
          <span>{{ row.create_time | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="up_time">
          <span>{{ row.up_time | getDateTime }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 8px;" @click="edit(row, index)">修 改</Button>
          <Button type="primary" size="small" style="margin-right: 8px;" @click="del(row, index)">删 除</Button>
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

      <!-- 游戏新增 -->
      <Modal
        v-model="modal"
        :title="title"
        width="640"
        :mask-closable="false"
        :styles="{top: '20px'}"
        @on-cancel="closeModal('formValidate')"
        :footer-hide="true">
        <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="120">
          <FormItem label="角色名称" prop="role_name">
            <Input v-model="formData.role_name" placeholder="角色名称"></Input>
          </FormItem>

          <FormItem label="角色备注" prop="remark">
            <Input v-model="formData.remark" :maxlength="150" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="角色备注"></Input>
            <div style="color: #666; text-align: right;">{{ formData.remark ? formData.remark.length : 0 }} / 150</div>
          </FormItem>

          <FormItem label="角色分配" prop="rules_id">
            <CheckboxGroup v-model="formData.rules_id">
              <Row v-for="(val, index) in menuList" :key="index">
                <Checkbox :label="val.id">{{ val.title }}</Checkbox>
                <Row style="padding-left: 30px;" v-if="val.children && val.children.length">
                  <Checkbox v-for="(item, index) in val.children" :key="index" :label="item.id">{{ item.title }}</Checkbox>
                </Row>
              </Row>

            </CheckboxGroup>
          </FormItem>

          <FormItem>
            <Button type="primary" :loading="loading" v-if="title == '新增角色'" @click="handleSubmit('formValidate')">新 增</Button>
            <Button type="primary" :loading="loading" v-if="title == '修改角色'" @click="handleSubmit2('formValidate')">修 改</Button>
            <Button @click="closeModal('formValidate')" style="margin-left: 8px">关 闭</Button>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { roleInfoPageQuery, insertRole, updateRole, deleteRoleById } from '@/api/role'
import Format from "@/libs/format.js" // 自定义验证
import { queryListByMenu } from "@/api/menu"
import { menuRefactoringTree } from '@/libs/business_util.js'
export default {
  name: 'role_page',
  data () {
    return {
      modal: false,
      loading: false,
      title: '新增角色',
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      form: {
        limit: 10,
        page: 1
      },
      columns: [
        {
          title: 'ID',
          slot: 'id',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '角色名称',
          slot: 'role_name',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '备注',
          slot: 'remark',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '创建时间',
          slot: 'create_time',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '更新时间',
          slot: 'up_time',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '操作',
          slot: 'action',
          width: 140,
          align: 'center'
        }
      ],
      tableData: [],
      formData: {
        role_name: '',
        rules_id: [],
        remark: ''
      },
      menuList: [],
      ruleValidate: {
        role_name: [
            { required: true, message: '请填写角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取列表
    async getList () {
      let { data } = await roleInfoPageQuery(this.form)
      if (data.code == '200') {
        this.tableData = data.data.data
        this.total = data.data.total
      }
    },
    // 编辑
    async edit (row, index) {
      this.title = '修改角色'
      let { data } = await queryListByMenu()
      if (data.code == '200') {
        this.menuList = menuRefactoringTree(data.data, '-1')
        console.log(this.menuList)
      } else {
        this.$Message.error(data.msg);
      }
      let obj = Object.assign({}, row)
      this.formData.role_name = obj.role_name
      this.formData.remark = obj.remark
      obj.rules_id ? this.formData.rules_id = obj.rules_id.split(',') : this.formData.rules_id = []
      this.formData.id = obj.id
      this.modal = true
    },
    // 删除
    del (row, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认删除？</p>',
        onOk: async () => {
          let { data } = await deleteRoleById({ id: row.id })
          if (data.code == '200') {
            this.$Message.success('删除成功!');
            this.getList()
          }
          else {
            this.$Message.error(data.msg);
          }
        }
      });
    },
    //切换分页
    pageOnChange (val) {
      this.form.page = val
      this.getList()
    },
    //切换条数
    pageSizeOnChange (val) {
      this.form.limit = val
      this.getList()
    },
    // 显示新增弹框
    async addShow () {
      this.title = '新增角色'
      let { data } = await queryListByMenu()
      if (data.code == '200') {
        this.menuList = menuRefactoringTree(data.data, '-1')
      } else {
        this.$Message.error(data.msg);
      }
      this.modal = true
    },
    // 关闭弹框
    closeModal (name) {
      this.handleReset(name)
      this.formData.rules_id = []
      this.modal = false
    },
    // 新增保存
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let obj = Object.assign({}, this.formData)
          obj.rules_id.length > 0 ? obj.rules_id = obj.rules_id.join(',') : obj.rules_id = ''
          let { data } = await insertRole(obj)
          if (data.code == '200') {
            this.$Message.success('新增成功!');
            setTimeout(() => {
              this.loading = false
              this.closeModal('formValidate')
              this.getList()
            }, 2000)
          } else {
            this.loading = false
            this.$Message.error(data.msg);
          }
        } else {
          this.$Message.error('表单信息不完整或不合法!');
        }
      })
    },
    // 修改保存
    handleSubmit2 (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let obj = Object.assign({}, this.formData)
          obj.rules_id.length > 0 ? obj.rules_id = obj.rules_id.join(',') : obj.rules_id = ''
          let { data } = await updateRole(obj)
          if (data.code == '200') {
            this.$Message.success('修改成功!');
            setTimeout(() => {
              this.loading = false
              this.closeModal('formValidate')
              this.getList()
            }, 2000)
          } else {
            this.loading = false
            this.$Message.error(data.msg);
          }
        } else {
          this.$Message.error('表单信息不完整或不合法!');
        }
      })
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style lang="less">
.bs-btns {
  text-align: right;
}
</style>
