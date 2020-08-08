<template>
  <div>
    <Card style="min-height: 80vh;">
      <Row>
        <Col span="24">
        <Form ref="form"
              :model="form"
              inline
              label-position="right"
              :label-width="100">
          <FormItem label="手机号码"
                    prop="mobile">
            <Input type="text"
                   v-model="form.mobile"
                   clearable
                   placeholder="手机号码"
                   style="width: 160px;"></Input>
          </FormItem>
          <FormItem label="真实名称"
                    prop="realname">
            <Input type="text"
                   v-model="form.realname"
                   clearable
                   placeholder="真实名称"
                   style="width: 160px;"></Input>
          </FormItem>
          <FormItem label="所属地区"
                    prop="address">
            <Input type="text"
                   v-model="form.address"
                   clearable
                   placeholder="所属地区"
                   style="width: 160px;"></Input>
          </FormItem>
          <FormItem label="信息状态"
                    prop="status">
            <Select v-model="form.status"
                    clearable
                    style="width: 160px;">
              <Option value="1">已反馈</Option>
              <Option value="2">未反馈</Option>
            </Select>
          </FormItem>
          <FormItem label="性别"
                    prop="gender">
            <Select v-model="form.gender"
                    clearable
                    style="width: 160px;">
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </FormItem>
          <FormItem label="提交日期开始"
                    prop="start_time">
            <DatePicker type="datetime"
                        v-model="form.start_time"
                        @on-change="handleChange"
                        placeholder="提交日期开始"
                        style="width: 160px;"></DatePicker>
          </FormItem>
          <FormItem label="提交日期截止"
                    prop="end_time">
            <DatePicker type="datetime"
                        v-model="form.end_time"
                        @on-change="handleChange1"
                        placeholder="提交日期截止"
                        style="width: 160px;"></DatePicker>
          </FormItem>
          <Button type="primary"
                  @click="onSeach">查 询</Button>
        </Form>
        </Col>
      </Row>

      <Table border
             :columns="columns"
             :data="tableData"
             style="margin-top: 16px">
        <template slot-scope="{ row }"
                  slot="id">
          <span>{{ row.id }}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="realname">
          <strong>{{ row.realname }}</strong>
        </template>
        <template slot-scope="{ row }"
                  slot="mobile">
          <span>{{ row.mobile }}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="gender">
          <span>{{ row.gender == '1' ? '男' : row.gender == '2' ? '女' : '未填写'}}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="status">
          <span :style="{color: row.status == '1' ? '#19be6b' : '#ed4014'}">{{ row.status == "1" ? "已反馈" : "未反馈" }}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="address">
          <span>{{ row.address }}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="admin_username">
          <span>{{ row.admin_username }}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="create_time">
          <span>{{ row.create_time | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="feed_time">
          <span>{{ row.feed_time | getDateTime }}</span>
        </template>
        <!-- <template slot-scope="{ row }" slot="updateTime">
          <span>{{ row.updateTime | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="updatePerson">
          <span>{{ row.updatePerson }}</span>
        </template> -->
        <template slot-scope="{ row, index }"
                  slot="action">
          <Button type="warning"
                  size="small"
                  v-if="row.status == '2'"
                  @click="feedBack(row, index)">反 馈</Button>
          <Button type="primary"
                  size="small"
                  v-else
                  @click="look(row, index)">查 看</Button>
        </template>
      </Table>

      <div style="text-align: right; margin-top: 16px;">
        <Page :total="total"
              show-sizer
              show-elevator
              show-total
              :page-size-opts="pageSizeOpts"
              :page-size="form.limit"
              :current="form.page"
              @on-change="pageOnChange"
              @on-page-size-change="pageSizeOnChange" />
      </div>

      <!-- 反馈  查看 -->
      <Modal v-model="modal"
             :title="title"
             width="420"
             :mask-closable="false"
             :styles="{top: '20px'}"
             :footer-hide="true">
        <Row>
          <Col :span="12"
               style="padding: 12px 0;">姓名：{{ row.realname }}</Col>
          <Col :span="12"
               style="padding: 12px 0;">性别：{{ row.gender == '1' ? '男' : row.gender == '2' ? '女' : '未填写' }}</Col>
        </Row>
        <Row>
          <Col :span="12"
               style="padding: 12px 0;">年龄：{{ row.age }}</Col>
          <Col :span="12"
               style="padding: 12px 0;">手机：{{ row.mobile }}</Col>
        </Row>
        <Row>
          <Col :span="24"
               style="padding: 12px 0;">问题：{{ row.question }}</Col>
        </Row>
        <Row>
          <Col :span="24"
               style="padding: 12px 0;">
          <div class="demo-upload-list"
               v-for="(item,key) in uploadList"
               :key="key"
               v-if="item.url">
            <template>
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline"
                      @click.native="handleView(item.url)"></Icon>
              </div>
            </template>
          </div>
          </Col>
        </Row>
        <Row>
          <Col :span="24"
               style="padding: 12px 0;">反馈：
          <Input v-model="row.feedback"
                 :disabled="row.status == '1'"
                 type="textarea"
                 :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="反馈内容"
                 style="width: 80%;" />
          </Col>
        </Row>
        <Row v-if="row.status == '2'">
          <Col :span="24"
               style="padding: 12px 0;text-align: center;">
          <Button type="warning"
                  :loading="loading"
                  @click="habdleClickSave">反 馈</Button>
          </Col>
        </Row>
      </Modal>
    </Card>
    <Modal title="View Image"
           v-model="visible">
      <img :src="Itemurl"
           v-if="visible"
           style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import Format from '@/libs/format.js' // 自定义验证
import {
  feedbackList,
  replyFeedback
} from '@/api/patient'
export default {
  name: 'symptom_page',
  data () {
    return {
      title: '反馈',
      modal: false,
      visible: false,
      uploadList: [],
      form: {
        mobile: '',
        realname: '',
        address: '',
        gender: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 1,
        limit: 10
      },
      row: {},
      loading: false,
      columns: [
        {
          title: 'ID',
          slot: 'id',
          tooltip: true,
          align: 'center',
          minWidth: 60
        },
        {
          title: '真实姓名',
          slot: 'realname',
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
          title: '性别',
          slot: 'gender',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '状态',
          slot: 'status',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '反馈人',
          slot: 'admin_username',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '联系地址',
          slot: 'address',
          tooltip: true,
          align: 'center',
          minWidth: 240
        },
        {
          title: '提交时间',
          slot: 'create_time',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '反馈时间',
          slot: 'feed_time',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '操作',
          slot: 'action',
          width: 120,
          align: 'center'
        }
      ],
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      tableData: []
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
    handleChange (date) {
      this.form.start_time = date;
    },
    handleChange1 (date) {
      this.form.end_time = date;
    },
    feedBack (row, index) {
      this.uploadList = []
      let obj = Object.assign({}, row)
      let arr = row.file_url.split(',')
      let strobj = {}
      arr.forEach((ele, key) => {
        this.uploadList.push({ name: key + '1', url: ele })
      });
      this.row = obj
      if (this.row.status == '1') this.title = '查看'
      else this.title = '反馈'
      this.modal = true
    },
    async habdleClickSave () {
      if (this.row.feedback == '') {
        this.$Message.error('请输入反馈内容！')
        return
      }
      this.loading = true
      let { data } = await replyFeedback({ id: this.row.id, feedback: this.row.feedback, type_id: 4 })
      if (data.code == '200') {
        this.$Message.success('反馈成功!');
        setTimeout(() => {
          this.loading = false
          this.modal = false
          this.getList()
        }, 2000)
        this.getList()
      } else {
        this.loading = false
        this.$Message.error(data.msg)
      }

    },
    handleView (url) {
      this.visible = true
      this.Itemurl = url
    },
    look (row, index) {
      let obj = Object.assign({}, row)
      this.row = obj
      if (this.row.status == '1') this.title = '查看'
      else this.title = '反馈'
      this.modal = true
    },
    // 列表展示
    async getList () {
      let { data } = await feedbackList(this.form)
      if (data.code == '200') {
        this.tableData = data.data.data
        this.total = data.data.total
      } else {
        this.$Message.error(data.msg)
      }
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
    }
  }
}
</script>

<style lang="less" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
