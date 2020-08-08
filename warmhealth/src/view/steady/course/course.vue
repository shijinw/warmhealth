<template>
  <div>
    <Card style="min-height: 80vh;">
      <div class="bs-btns">
        <Button type="primary" icon="ios-add" @click="addShow">新增 Level</Button>
      </div>

      <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="levelName">
          <strong>{{ row.levelName }}</strong>
        </template>
        <template slot-scope="{ row }" slot="term">
          <span>{{ row.term == "1" ? "上学期" : "下学期" }}</span>
        </template>
        <template slot-scope="{ row }" slot="moduleNumber">
          <span>{{ row.moduleNumber }}</span>
        </template>
        <template slot-scope="{ row }" slot="lessonNumber">
          <span>{{ row.lessonNumber }}</span>
        </template>
        <template slot-scope="{ row }" slot="isPublish">
          <span :style="{color: row.isPublish == '0' ? '#19be6b' : '#ed4014'}">{{ row.isPublish == "0" ? "上架" : "下架" }}</span>
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
          <Button type="primary" size="small" style="margin-right: 8px;" @click="del(row, index)">删 除</Button>
          <Button type="primary" size="small" @click="toModule(row, index)">Module 管理</Button>
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
          <FormItem label="Level名称" prop="levelName">
            <Input v-model="formData.levelName" :maxlength="15" placeholder="level名称支持数字、下划线和字母"></Input>
          </FormItem>

          <FormItem label="状态" prop="isPublish">
            <RadioGroup v-model="formData.isPublish">
              <Radio label="0">上架</Radio>
              <Radio label="1">下架</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="学期" prop="term">
            <RadioGroup v-model="formData.term">
              <Radio label="1">上学期</Radio>
              <Radio label="2">下学期</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="排序" prop="sort">
            <Input v-model="formData.sort" :maxlength="15" placeholder="排序"></Input>
          </FormItem>

          <FormItem>
            <Button type="primary" :loading="loading" v-if="title == '新增 Level'" @click="handleSubmit('formValidate')">新 增</Button>
            <Button type="primary" :loading="loading" v-if="title == '修改 Level'" @click="handleSubmit2('formValidate')">修 改</Button>
            <Button @click="closeModal('formValidate')" style="margin-left: 8px">关 闭</Button>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { queryListByLevel, insertLevel, updateLevel, deleteLevelById } from '@/api/course'
import Format from "@/libs/format.js" // 自定义验证
export default {
  name: 'course_page',
  data () {
    return {
      modal: false,
      loading: false,
      title: '新增 Level',
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      form: {
        pageSize: 10,
        pageNo: 1
      },
      columns: [
        {
          title: 'Level名称',
          slot: 'levelName',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '学期',
          slot: 'term',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: 'module数',
          slot: 'moduleNumber',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: 'Lesson数',
          slot: 'lessonNumber',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '状态',
          slot: 'isPublish',
          tooltip: true,
          align: 'center',
          minWidth: 80
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
          width: 230,
          align: 'center'
        }
      ],
      tableData: [],
      formData: {
        levelName: '',
        sort: '',
        term: '',
        isPublish: ''
      },
      ruleValidate: {
        levelName: [
            { required: true, validator: Format.FormValidate.Form().InputType, trigger: 'blur' }
        ],
        sort: [
            { required: true, validator: Format.FormValidate.Form().Num, trigger: 'blur' }
        ],
        term: [
            { required: true, message: '请选择学期', trigger: 'change' }
        ],
        isPublish: [
            { required: true, message: '请选择Level状态', trigger: 'change' }
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
      let { data } = await queryListByLevel()
      if (data.code == '200') {
        this.tableData = data.result
      }
    },
    // 编辑
    edit (row, index) {
      this.title = '修改 Level'
      let obj = Object.assign({}, row)
      this.formData.levelName = obj.levelName
      this.formData.sort = obj.sort
      this.formData.term = obj.term
      this.formData.isPublish = obj.isPublish
      this.formData.id = obj.id
      this.modal = true
    },
    // 删除
    del (row, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认删除？</p>',
        onOk: async () => {
          let { data } = await deleteLevelById({ id: row.id })
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
    toModule (row, index) {
      this.$router.push({name: 'module_page', query: {levelId: row.id}})
    },
    // 切换分页
    // pageOnChange (val) {
    //   this.form.pageNo = val
    //   this.getList()
    // },
    // 切换条数
    // pageSizeOnChange (val) {
    //   this.form.pageSize = val
    //   this.getList()
    // },
    // 显示新增弹框
    addShow () {
      this.title = '新增 Level'
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
          let { data } = await insertLevel(this.formData)
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
          let { data } = await updateLevel(this.formData)
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
