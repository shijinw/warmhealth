<template>
  <div>
    <Row>
      <Col span="24">
        <Select v-model="form.levelId" disabled style="width:200px">
          <Option v-for="item in levelList" :value="item.id" :key="item.id">{{ item.levelName }}</Option>
        </Select>
        <Select v-model="form.moduleId" disabled style="width:200px; margin-left: 8px;">
          <Option v-for="item in moduleList" :value="item.id" :key="item.id">{{ item.moduleName }}</Option>
        </Select>
        <Select v-model="form.lessonId" disabled style="width:200px; margin-left: 8px;">
          <Option v-for="item in lessonList" :value="item.id" :key="item.id">{{ item.lessonName }}</Option>
        </Select>
        <Select v-model="form.gameId" disabled style="width:200px; margin-left: 8px;">
          <Option v-for="(val, index) in gameList" :key="index" :value="val.id">{{ val.gameName }}</Option>
        </Select>
        <Button type="primary" style="float: right;" icon="ios-add" @click="add">新增题目</Button>
      </Col>
    </Row>

    <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
      <template slot-scope="{ row }" slot="sort">
        <strong>{{ row.sort }}</strong>
      </template>
      <template slot-scope="{ row }" slot="type">
        <span>{{ row.type == '1' ? '听' : row.type == '2' ? '说' : '认读' }}</span>
      </template>
      <template slot-scope="{ row }" slot="isPublish">
        <span :style="{color: row.isPublish == '0' ? '#19be6b' : '#ed4014'}">{{ row.isPublish == '0' ? '上架' : '下架' }}</span>
      </template>
      <template slot-scope="{ row }" slot="content">
        <span>{{ row.content }}</span>
      </template>
      <!-- <template slot-scope="{ row }" slot="createTime">
        <span>{{ row.createTime | getDateTime }}</span>
      </template> -->
      <template slot-scope="{ row }" slot="updateTime">
        <span>{{ row.updateTime | getDateTime }}</span>
      </template>
      <template slot-scope="{ row }" slot="updatePerson">
        <span>{{ row.updatePerson }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, index)">修 改</Button>
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

    <Modal
      v-model="modal"
      :title="title"
      width="420"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-cancel="closeModal('formValidate')"
      :footer-hide="true">
        <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="100">
          <FormItem label="题目类型" prop="type">
            <Select v-model="formData.type" placeholder="请选择题目类型">
              <Option value="1">听</Option>
              <Option value="2">说</Option>
              <Option value="3">认读</Option>
            </Select>
          </FormItem>

          <FormItem label="状态" prop="type">
            <RadioGroup v-model="formData.isPublish">
              <Radio label="0">上架</Radio>
              <Radio label="1">下架</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="排序" prop="sort">
            <Input v-model="formData.sort" placeholder="排序"></Input>
          </FormItem>

          <FormItem label="内容" prop="content">
            <Input v-model="formData.content" type="textarea" :autosize="{ minRows: 3, maxRows: 10 }" placeholder="内容"></Input>
          </FormItem>

          <FormItem>
            <Button type="primary" :loading="loading" v-if="title == '新增题目'" @click="handleSubmit('formValidate')">新 增</Button>
            <Button type="primary" :loading="loading" v-if="title == '修改题目'" @click="handleSubmit2('formValidate')">修 改</Button>
            <Button @click="closeModal('formValidate')" style="margin-left: 8px">关 闭</Button>
          </FormItem>
        </Form>
      </Modal>

  </div>
</template>

<script>
import Format from "@/libs/format.js" // 自定义验证
import {
  queryListByLevel,
  querySelectItem,
  queryLessonList,
  queryListByLessonGame,
  insertLessonGame,
  queryGameList,
  updateLessonGame,
  deleteLessonGameById,
  queryQuestionByLessonIdAndGameId,
  insertQuestion,
  deleteQuestionById,
  updateQuestionById
} from '@/api/topic'
export default {
  name: 'topicList_page',
  data () {
    return {
      form: {
        levelId: '',
        moduleId: '',
        lessonId: '',
        gameId: '',
        pageNo: 1,
        pageSize: 10
      },
      modal: false,
      levelList: [],
      moduleList: [],
      lessonList: [],
      columns: [
        {
          title: '排序',
          slot: 'sort',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '类型',
          slot: 'type',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '状态',
          slot: 'isPublish',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '内容',
          slot: 'content',
          tooltip: true,
          minWidth: 360,
          align: 'center'
        },
        {
          title: '修改时间',
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
          minWidth: 135
        },
        {
          title: '操作',
          slot: 'action',
          width: 140,
          align: 'center'
        }
      ],
      loading: false,
      title: '新增题目',
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      tableData: [],
      gameList: [],
      formData: {
        gameId: '',
        sort: '',
        content: '',
        isPublish: '0',
        type: '',
        lessonId: '',
        moduleId: ''
      },
      ruleValidate: {
        content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        sort: [
            { required: true, validator: Format.FormValidate.Form().Num, trigger: 'blur' }
        ],
        isPublish: [
            { required: true, message: '请选择是否上架', trigger: 'change' }
        ],
        type: [
            { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
    }
  },
  created () {
    this.form.levelId = this.$route.query.levelId
    this.form.moduleId = this.$route.query.moduleId
    this.form.lessonId = this.$route.query.lessonId
    this.form.gameId = this.$route.query.gameId
  },
  mounted () {
    this.getSelectList()
  },
  methods: {
    // 查询
    onSeach () {
      this.getList()
    },
    // 列表展示
    async getList () {
      let { data } = await queryQuestionByLessonIdAndGameId(this.form)
      if (data.code == '200') {
        this.tableData = data.result.rows
        this.total = data.result.totalCount
      }
      else {
        this.$Message.error(data.error);
      }
    },
    // 新增
    async add () {
      this.title = '新增题目'
      this.modal = true
    },
    // 初始化下拉选择框
    async getSelectList () {
      let res = await queryListByLevel({ isPublish: this.form.isPublish })
      if (res.data.code == '200') {
        this.levelList = res.data.result
        this.form.levelId = this.$route.query.levelId
      }
      let res1 = await querySelectItem({ levelId: this.form.levelId })
      if (res1.data.code == '200') {
        this.moduleList = res1.data.result
        this.form.moduleId = this.$route.query.moduleId
      }
      let res2 = await queryLessonList({ moduleId: this.form.moduleId })
      if (res2.data.code == '200') {
        this.lessonList = res2.data.result
        this.form.lessonId = this.$route.query.lessonId
      }
      let res3 = await queryGameList()
      if (res3.data.code == '200') {
        this.gameList = res3.data.result
        this.form.gameId = this.$route.query.gameId
      }
      this.getList()
    },
    // 修改
    async edit (row, index) {
      this.title = '修改题目'
      this.formData.id = row.id
      this.formData.content = row.content
      this.formData.sort = row.sort.toString()
      this.formData.type = row.type
      this.formData.isPublish = row.isPublish
      this.modal = true
    },
    // 切换分页
    pageOnChange (val) {
      this.form.pageNo = val
      this.getList()
    },
    // 切换条数
    pageSizeOnChange (val) {
      this.form.pageSize = val
      this.getList()
    },
    // 删除
    del (row, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认删除？</p>',
        onOk: async () => {
          let { data } = await deleteQuestionById({ id: row.id, lessonId: this.form.lessonId, gameId: this.form.gameId, moduleId: this.form.moduleId })
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
    // 关闭弹框
    closeModal (name) {
      this.handleReset(name)
      this.formData.isPublish = '0'
      this.modal = false
    },
    // 新增保存
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.formData.gameId = this.form.gameId
          this.formData.lessonId = this.form.lessonId
          this.formData.moduleId = this.form.moduleId
          let { data } = await insertQuestion(this.formData)
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
          this.formData.gameId = this.form.gameId
          this.formData.lessonId = this.form.lessonId
          this.formData.moduleId = this.form.moduleId
          let { data } = await updateQuestionById(this.formData)
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

</style>
