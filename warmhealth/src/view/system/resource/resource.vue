<template>
  <div>
    <Card>
      <Alert type="warning" show-icon>
        必要提示
        <template slot="desc">
          此页面提供给开发人员使用，其他人员请勿对此页面进行任何操作，请勿将此页面权限分配给除开发人员以外的用户！！！<br/>
          <span style="color: red;">*</span> 新增说明：不选目录新增根目录，否则在所选目录下新增子目录！！！
        </template>
      </Alert>
      <ButtonGroup>
        <Button type="primary" icon="ios-add" @click="add">新增</Button>
        <Button type="primary" icon="ios-create-outline" @click="edit">编辑</Button>
        <Button type="primary" icon="ios-trash-outline" @click="del">删除</Button>
      </ButtonGroup>
      <div class="resource-box">
        <div class="resource-box-left">
          <Tree :data="data" @on-select-change="handleTreeClick"></Tree>
        </div>
        <div class="resource-box-line"></div>
        <div class="resource-box-right">
          <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="150">
            <Row>
              <Col span="12">
                <FormItem label="路由编码" prop="name">
                  <Input v-model="formData.name" :disabled="disabled" placeholder="name字段，不可重复"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="路由地址" prop="path">
                  <Input v-model="formData.path" :disabled="disabled" placeholder="路由地址"></Input>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <FormItem label="组件地址" prop="componentsUrl">
                  <Input v-model="formData.componentsUrl" :disabled="disabled" placeholder="前端组件地址"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="标题" prop="title">
                  <Input v-model="formData.title" :disabled="disabled" placeholder="标题"></Input>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <FormItem label="父级节点" prop="pId">
                  <Input v-model="formData.pId" :disabled="true" placeholder="父级ID"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="图标" prop="icon">
                  <Input v-model="formData.icon" :disabled="disabled" placeholder="图标名"></Input>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <FormItem label="排序" prop="sort">
                  <Input v-model="formData.sort" :disabled="disabled" placeholder="数字"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="描述" prop="desc">
                  <Input v-model="formData.desc" :disabled="disabled" placeholder="描述备注"></Input>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <FormItem label="类型" prop="type">
                  <Select v-model="formData.type" :disabled="disabled">
                    <Option value="2">menu</Option>
                    <Option value="1">href</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="href地址" prop="hrefUrl">
                  <Input v-model="formData.hrefUrl" :disabled="disabled" placeholder="跳转地址"></Input>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <FormItem label="是否在面包屑中显示" prop="hideInBread">
                  <Select v-model="formData.hideInBread" :disabled="disabled">
                    <Option value="0">显示</Option>
                    <Option value="1">不显示</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="是否在左侧菜单显示" prop="hideInMenu">
                  <Select v-model="formData.hideInMenu" :disabled="disabled">
                    <Option value="0">显示</Option>
                    <Option value="1">不显示</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <FormItem label="是否对该页面缓存" prop="notCache">
                  <Select v-model="formData.notCache" :disabled="disabled">
                    <Option value="0">缓存</Option>
                    <Option value="1">不缓存</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="关闭标签的回调" prop="beforeCloseName">
                  <Input v-model="formData.beforeCloseName" :disabled="disabled" placeholder="关闭前的回调函数名"></Input>
                </FormItem>
              </Col>
            </Row>

            <FormItem>
                <Button type="primary" v-if="ctype == 1" @click="handleSubmit('formValidate')">新增保存</Button>
                <Button type="primary" v-if="ctype == 2" @click="handleSubmit2('formValidate')">编辑保存</Button>
                <Button style="margin-left: 8px" @click="getList">重置该页面</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Format from "@/libs/format.js" // 自定义验证
import { menuRefactoringTree } from '@/libs/business_util.js'
import { queryListByMenu, insertMenu, updateMenu, deleteMenuById } from "@/api/menu"
export default {
  name: 'resource_page',
  data () {
    return {
      data: [],
      selected: '',
      ctype: '',
      disabled: true,
      menuList: [],
      formData: {
        path: '', // 路由地址
        name: '', // 路由编码，不可重复
        componentsUrl: '', // 组件地址
        title: '', // 标题
        hideInBread: '', // 是否在面包屑中显示 1 不显示
        hideInMenu: '', // 是否在左侧菜单中显示 1 不显示
        notCache: '', // 是否在切换页后对该页面缓存 1 不缓存
        icon: '', // 图标
        beforeCloseName: '', // 关闭前的钩子函数
        pId: '', // 父级ID
        sort: '', // 排序
        desc: '', // 描述
        type: '', // 是目录还是跳转链接 1 跳转   2 目录
        hrefUrl: '' // type 为 href 的时候的跳转地址
      },
      ruleValidate: {
        path: [
            { required: true, message: '路由地址为必填字段', trigger: 'blur' }
        ],
        sort: [
            { required: true, validator: Format.FormValidate.Form().Num, trigger: 'blur' }
        ],
        name: [
            { required: true, message: '路由编码为必填字段且不可重复', trigger: 'blur' }
        ],
        componentsUrl: [
            { required: true, message: '组件地址为必填字段', trigger: 'blur' }
        ],
        title: [
            { required: true, message: '标题为必填字段', trigger: 'blur' }
        ],
        icon: [
            { required: true, message: '图标名称为必填字段', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '目录类型为必选字段', trigger: 'change' }
        ],
        hideInBread: [
            { required: true, message: '是否在面包屑中显示为必选字段', trigger: 'change' }
        ],
        hideInMenu: [
            { required: true, message: '是否在菜单中显示为必选字段', trigger: 'change' }
        ],
        notCache: [
            { required: true, message: '是否对该页面缓存为必选字段', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async del () {
      if (!this.selected) {
        this.$Message.error('请选择您要删除的目录！');
        return
      }
      if (this.selected.children && this.selected.children.length > 0) {
        this.$Message.error('当前目录下还有子目录，无法删除！');
      } else {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否确认删除该目录？</p>',
          onOk: async () => {
            let { data } = await deleteMenuById({ id: this.selected.id })
            if (data.code == '200') {
              this.$Message.success('删除成功!');
              this.getList()
            }
            else {
              this.$Message.error(data.error);
            }
          }
        });
      }
    },
    // 点击 tree
    handleTreeClick (arr, item) {
      this.disabled = true
      this.selected = item
      this.formData.path = item.path
      this.formData.name = item.name
      this.formData.componentsUrl = item.meta.componentsUrl
      this.formData.title = item.title
      this.formData.hideInBread = item.meta.hideInBread ? '1' : '0'
      this.formData.hideInMenu = item.meta.hideInMenu ? '1' : '0'
      this.formData.notCache = item.meta.notCache ? '1' : '0'
      this.formData.icon = item.meta.icon
      this.formData.beforeCloseName = item.meta.beforeCloseName
      this.formData.pId = item.meta.pId
      this.formData.sort = item.meta.sort.toString()
      this.formData.desc = item.meta.desc
      this.formData.type = item.meta.t
      this.formData.hrefUrl = item.meta.hrefUrl
      this.formData.id = item.id
    },
    // 修改
    edit () {
      if (!this.selected) {
        this.$Message.error('请选择您要编辑的目录！');
        return
      }
      this.ctype = 2
      this.disabled = false
    },
    // 新增
    add () {
      this.ctype = 1
      this.handleCancel('formValidate')
      if (this.selected) {
        this.formData.pId = this.selected.id
      } else {
        this.formData.pId = '-1'
      }
      this.disabled = false
    },
    // 查询
    async getList () {
      let { data } = await queryListByMenu()
      if (data.code == '200') {
        this.data = menuRefactoringTree(data.data, '-1')
        this.selected = ''
        this.ctype = ''
        this.handleCancel('formValidate')
      }
    },
    // 取消
    handleCancel (name) {
      this.handleReset(name)
      this.disabled = true
    },
    // 新增保存
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let { data } = await insertMenu(this.formData)
          if (data.code == '200') {
            this.$Message.success('新增成功!');
            setTimeout(() => {
              this.loading = false
              this.handleCancel('formValidate')
              this.getList()
            }, 2000)
          } else {
            this.loading = false
            this.$Message.error(data.error);
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
          let { data } = await updateMenu(this.formData)
          if (data.code == '200') {
            this.$Message.success('修改成功!');
            setTimeout(() => {
              this.loading = false
              this.handleCancel('formValidate')
              this.getList()
            }, 2000)
          } else {
            this.loading = false
            this.$Message.error(data.error);
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
.resource-box {
  display: flex;
  margin-top: 16px;
  position: relative;
  .resource-box-left {
    width: 240px;
    min-height: 65vh;
  }
  .resource-box-line {
    position: absolute;
    border-left: 1px solid #d1d1d1;
    top: 0;
    left: 240px;
    bottom: 0;
  }
  .resource-box-right {
    flex: 1;
  }
}
</style>
