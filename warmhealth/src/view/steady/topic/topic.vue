<template>
  <div>
    <Row>
      <Col span="24">
        <Select v-model="form.levelId" style="width:200px" @on-change="handleChangeLevel">
          <Option v-for="item in levelList" :value="item.id" :key="item.id">{{ item.levelName }}</Option>
        </Select>
        <Select v-model="form.moduleId" style="width:200px; margin-left: 8px;" @on-change="handleChangeModule">
          <Option v-for="item in moduleList" :value="item.id" :key="item.id">{{ item.moduleName }}</Option>
        </Select>
        <Select v-model="form.lessonId" style="width:200px; margin-left: 8px;">
          <Option v-for="item in lessonList" :value="item.id" :key="item.id">{{ item.lessonName }}</Option>
        </Select>
        <Button type="primary" style="margin-left: 8px;" @click="onSeach">查 询</Button>
        <Button type="primary" style="float: right;" icon="ios-add" @click="add">新增游戏</Button>
      </Col>
    </Row>

    <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
      <template slot-scope="{ row }" slot="gameName">
        <strong>{{ row.gameName }}</strong>
      </template>
      <template slot-scope="{ row }" slot="sort">
        <span>{{ row.sort }}</span>
      </template>
      <template slot-scope="{ row }" slot="questionNumber">
        <span>{{ row.questionNumber }}</span>
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
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, index)">修 改</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="toTopic(row, index)">题目管理</Button>
        <Button type="primary" size="small" @click="del(row, index)">删 除</Button>
      </template>
    </Table>

    <!-- <div style="text-align: right; margin-top: 16px;">
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
    </div> -->

    <Modal
      v-model="modal"
      :title="title"
      width="340"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-cancel="closeModal('formValidate')"
      :footer-hide="true">
        <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="100">
          <FormItem label="游戏名称" prop="gameId">
            <Select v-model="formData.gameId" placeholder="选择游戏">
              <Option v-for="(val, index) in gameList" :key="index" :value="val.id">{{ val.gameName }}</Option>
            </Select>
          </FormItem>

          <FormItem label="排序" prop="sort">
            <Input v-model="formData.sort" :maxlength="15" placeholder="排序"></Input>
          </FormItem>

          <FormItem>
            <Button type="primary" :loading="loading" v-if="title == '新增游戏'" @click="handleSubmit('formValidate')">新 增</Button>
            <Button type="primary" :loading="loading" v-if="title == '修改游戏'" @click="handleSubmit2('formValidate')">修 改</Button>
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
  deleteLessonGameById
} from '@/api/topic'
export default {
  name: 'topic_list',
  data () {
    return {
      form: {
        isPublish: '0',
        levelId: '',
        moduleId: '',
        lessonId: '',
        gameId: '',
        pageSize: 10,
        pageNo: 1
      },
      modal: false,
      levelList: [],
      moduleList: [],
      lessonList: [],
      columns: [
        {
          title: '游戏名称',
          slot: 'gameName',
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
          title: '创建时间',
          slot: 'createTime',
          tooltip: true,
          align: 'center',
          minWidth: 135
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
          minWidth: 80
        },
        {
          title: '操作',
          slot: 'action',
          width: 230,
          align: 'center'
        }
      ],
      loading: false,
      title: '新增游戏',
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      tableData: [],
      gameList: [],
      formData: {
        gameId: '',
        sort: ''
      },
      ruleValidate: {
        gameId: [
            { required: true, message: '请选择游戏名称', trigger: 'change' }
        ],
        sort: [
            { required: true, validator: Format.FormValidate.Form().Num, trigger: 'blur' }
        ]
      },
    }
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
      let { data } = await queryListByLessonGame(this.form)
      if (data.code == '200') this.tableData = data.result
      else {
        this.$Message.error(data.error);
      }
    },
    // 新增
    async add () {
      let { data } = await queryGameList()
      if (data.code == '200') this.gameList = data.result
      else {
        this.$Message.error(data.error);
        return
      }
      this.title = '新增游戏'
      this.modal = true
    },
    // 初始化下拉选择框
    async getSelectList () {
      let res = await queryListByLevel({ isPublish: this.form.isPublish })
      if (res.data.code == '200') {
        this.levelList = res.data.result
        this.levelList.length > 0 ? this.form.levelId = this.levelList[0].id : this.form.levelId = ''
      }
      let res1 = await querySelectItem({ levelId: this.form.levelId })
      if (res1.data.code == '200') {
        this.moduleList = res1.data.result
        this.moduleList.length > 0 ? this.form.moduleId = this.moduleList[0].id : this.form.moduleId = ''
      }
      let res2 = await queryLessonList({ moduleId: this.form.moduleId })
      if (res2.data.code == '200') {
        this.lessonList = res2.data.result
        this.lessonList.length > 0 ? this.form.lessonId = this.lessonList[0].id : this.form.lessonId = ''
      }
      this.getList()
    },
    // 切换 level
    async handleChangeLevel (id) {
      if (!id) return
      let res1 = await querySelectItem({ levelId: id })
      if (res1.data.code == '200') {
        this.moduleList = res1.data.result
        this.moduleList.length > 0 ? this.form.moduleId = this.moduleList[0].id : this.form.moduleId = ''
        let res2 = await queryLessonList({ moduleId: this.form.moduleId })
        if (res2.data.code == '200') {
          this.lessonList = res2.data.result
          this.lessonList.length > 0 ? this.form.lessonId = this.lessonList[0].id : this.form.lessonId = ''
        } else {
          this.lessonList = []
          this.form.lessonId = ''
        }
      }

    },
    // 切换 module
    async handleChangeModule (id) {
      if (!id) return
      let res2 = await queryLessonList({ moduleId: id })
      if (res2.data.code == '200') {
        this.lessonList = res2.data.result
        this.lessonList.length > 0 ? this.form.lessonId = this.lessonList[0].id : this.form.lessonId = ''
      }
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
    // 修改
    async edit (row, index) {
      let { data } = await queryGameList()
      if (data.code == '200') this.gameList = data.result
      else {
        this.$Message.error(data.error);
        return
      }
      this.title = '修改游戏'
      this.formData.id = row.id
      this.formData.gameId = row.gameId
      this.formData.sort = row.sort.toString()
      this.modal = true
    },
    // 题目管理
    toTopic (row, index) {
      this.$router.push({name: 'topicList_page', query: { levelId: this.form.levelId, moduleId: this.form.moduleId, lessonId: this.form.lessonId, gameId: row.gameId }})
    },
    // 删除
    del (row, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认删除？</p>',
        onOk: async () => {
          let { data } = await deleteLessonGameById({ id: row.id })
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
      this.modal = false
    },
    // 新增保存
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.formData.levelId = this.form.levelId
          this.formData.moduleId = this.form.moduleId
          this.formData.lessonId = this.form.lessonId
          let { data } = await insertLessonGame(this.formData)
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
          this.formData.levelId = this.form.levelId
          this.formData.moduleId = this.form.moduleId
          this.formData.lessonId = this.form.lessonId
          let { data } = await updateLessonGame(this.formData)
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
