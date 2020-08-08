<template>
  <div>
    <Card style="min-height: 80vh;">
      <Row>
        <Col span="24">
          <Select v-model="form.levelId" style="width:320px" :disabled="true">
            <span slot="prefix" style="font-size: 12px">当前Level：</span>
            <Option v-for="item in levelList" :value="item.id" :key="item.id">{{ item.levelName }}</Option>
          </Select>
          <Select v-model="form.moduleId" style="width:320px; margin-left: 8px;" :disabled="true">
            <span slot="prefix" style="font-size: 12px">当前Module：</span>
            <Option v-for="item in moduleList" :value="item.id" :key="item.id">{{ item.moduleName }}</Option>
          </Select>
          <Button type="primary" style="float: right;" icon="ios-add" @click="addShow">新建课程</Button>
        </Col>
      </Row>

      <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="lessonName">
          <strong>{{ row.lessonName }}</strong>
        </template>
        <template slot-scope="{ row }" slot="sort">
          <span>{{ row.sort }}</span>
        </template>
        <template slot-scope="{ row }" slot="questionNumber">
          <span>{{ row.questionNumber }}</span>
        </template>
        <template slot-scope="{ row }" slot="gameNumber">
          <span>{{ row.gameNumber }}</span>
        </template>
        <template slot-scope="{ row }" slot="createTime">
          <span>{{ row.createTime | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="updateTime">
          <span>{{ row.updateTime | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="updatePerson">
          <span>{{ row.updatePerson }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 8px;" @click="edit(row, index)">修 改</Button>
          <Button type="primary" size="small" @click="del(row, index)">删 除</Button>
        </template>
      </Table>
      <div style="text-align: right; margin-top: 16px;">
        <Page
          :total="total"
          show-sizer
          show-elevator
          show-total
          :page-size-opts="pageSizeOpts"
          :page-size="form.pageSize"
          :current="form.pageNo"
          @on-change="pageOnChange"
          @on-page-size-change="pageSizeOnChange" />
      </div>

      <!-- 游戏新增 -->
      <Modal
        v-model="modal"
        :title="title"
        width="420"
        :mask-closable="false"
        :styles="{top: '20px'}"
        @on-cancel="closeModal('formValidate')"
        :footer-hide="true">
        <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="100">
          <FormItem label="所属Level" prop="levelId">
            <Select v-model="formData.levelId" placeholder="请选择Level" :disabled="true">
              <Option v-for="item in levelList" :value="item.id" :key="item.id">{{ item.levelName }}</Option>
            </Select>
          </FormItem>

          <FormItem label="所属Module" prop="moduleId">
            <Select v-model="formData.moduleId" placeholder="请选择Module" :disabled="true">
              <Option v-for="item in moduleList" :value="item.id" :key="item.id">{{ item.moduleName }}</Option>
            </Select>
          </FormItem>

          <FormItem label="课程名称" prop="lessonName">
            <Input v-model="formData.lessonName" :maxlength="15" placeholder="课程名称支持数字、下划线和字母"></Input>
          </FormItem>

          <FormItem label="排序" prop="sort">
            <Input v-model="formData.sort" :maxlength="15" placeholder="排序"></Input>
          </FormItem>

          <FormItem>
            <Button type="primary" :loading="loading" v-if="title == '新建课程'" @click="handleSubmit('formValidate')">新 增</Button>
            <Button type="primary" :loading="loading" v-if="title == '修改课程'" @click="handleSubmit2('formValidate')">修 改</Button>
            <Button @click="closeModal('formValidate')" style="margin-left: 8px">关 闭</Button>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { queryLessonPage, lessonAdd, lessonUpdate, lessonDelete } from '@/api/course'
import Format from "@/libs/format.js" // 自定义验证
import {
  queryListByLevel,
  querySelectItem
} from '@/api/topic'
export default {
  name: 'lesson_page',
  data () {
    return {
      modal: false,
      loading: false,
      title: '新增 Module',
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      form: {
        pageSize: 10,
        pageNo: 1,
        levelId: '',
        moduleId: ''
      },
      columns: [
        {
          title: '课程名称',
          slot: 'lessonName',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '排序',
          slot: 'sort',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '题目数',
          slot: 'questionNumber',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '游戏数',
          slot: 'gameNumber',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '创建时间',
          slot: 'createTime',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '更新时间',
          slot: 'updateTime',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '更新人',
          slot: 'updatePerson',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '操作',
          slot: 'action',
          width: 140,
          align: 'center'
        }
      ],
      tableData: [],
      levelList: [],
      moduleList: [],
      formData: {
        levelId: '',
        moduleId: '',
        lessonName: '',
        sort: ''
      },
      ruleValidate: {
        lessonName: [
            { required: true, validator: Format.FormValidate.Form().InputType, trigger: 'blur' }
        ],
        sort: [
            { required: true, validator: Format.FormValidate.Form().Num, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getSelectList()
  },
  methods: {
     // 初始化下拉选择框
    async getSelectList () {
      let res = await queryListByLevel()
      if (res.data.code == '200') {
        this.levelList = res.data.result
        this.form.levelId = this.$route.query.levelId
      }
      let res1 = await querySelectItem({levelId: this.$route.query.levelId})
      if (res1.data.code == '200') {
        this.moduleList = res1.data.result
        this.form.moduleId = this.$route.query.moduleId
      }
      this.getList()
    },
    // 获取列表
    async getList () {
      let { data } = await queryLessonPage(this.form)
      if (data.code == '200') {
        this.tableData = data.result.rows
        this.total = data.result.totalCount
      }
    },
    // 编辑
    edit (row, index) {
      this.title = '修改课程'
      let obj = Object.assign({}, row)
      this.formData.lessonName = obj.lessonName
      this.formData.sort = obj.sort
      this.formData.id = obj.id
      this.formData.levelId = obj.levelId
      this.formData.moduleId = obj.moduleId
      this.modal = true
    },
    // 删除
    del (row, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认删除？</p>',
        onOk: async () => {
          let { data } = await lessonDelete({ id: row.id })
          if (data.code == '200') {
            this.$Message.success('删除成功!');
            this.getList()
          }
          else {
            this.$Message.error(data.error);
          }
        }
      });
    },
    //切换分页
    pageOnChange (val) {
      this.form.pageNo = val
      this.getList()
    },
    //切换条数
    pageSizeOnChange (val) {
      this.form.pageSize = val
      this.getList()
    },
    // 显示新增弹框
    addShow () {
      this.title = '新建课程'
      this.formData.levelId = this.$route.query.levelId
      this.formData.moduleId = this.$route.query.moduleId
      this.modal = true
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
          let { data } = await lessonAdd(this.formData)
          if (data.code == '200') {
            this.$Message.success('新增成功!');
            setTimeout(() => {
              this.loading = false
              this.closeModal('formValidate')
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
          let { data } = await lessonUpdate(this.formData)
          if (data.code == '200') {
            this.$Message.success('修改成功!');
            setTimeout(() => {
              this.loading = false
              this.closeModal('formValidate')
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
.bs-btns {
  text-align: right;
}
</style>
