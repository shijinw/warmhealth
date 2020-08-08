<template>
  <div>
    <Card style="min-height: 80vh;">
      <Row>
        <Col span="24">
          <Form ref="form" :model="form" inline label-position="right" :label-width="100">
            <FormItem label="起始时间" prop="start_time">
              <DatePicker type="datetime" v-model="form.start_time" @on-change="handleChange" placeholder="答卷日期开始" style="width: 160px;"></DatePicker>
            </FormItem>
            <FormItem label="截止时间" prop="end_time">
              <DatePicker type="datetime" v-model="form.end_time" @on-change="handleChange1" placeholder="答卷日期截止" style="width: 160px;"></DatePicker>
            </FormItem>
            <Button type="primary" @click="onSeach">查 询</Button>
          </Form>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="create_time">
          <strong>{{ row.create_time | getDateTime }}</strong>
        </template>
        <template slot-scope="{ row }" slot="operation">
          <span>{{ row.operation }}</span>
        </template>
        <template slot-scope="{ row }" slot="details">
          <span>{{ row.details }}</span>
        </template>
        <template slot-scope="{ row }" slot="realname">
          <span>{{ row.realname }}</span>
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
    </Card>
  </div>
</template>

<script>
import { tLogInfoPageQuery } from '@/api/log'
export default {
  name: 'log_page',
  data () {
    return {
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      form: {
        start_time: '',
        end_time: '',
        limit: 10,
        page: 1
      },
      columns: [
        {
          title: '日期',
          slot: 'create_time',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '操作',
          slot: 'operation',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '日志内容',
          slot: 'details',
          tooltip: true,
          align: 'center',
          minWidth: 300
        },
        {
          title: '操作人',
          slot: 'realname',
          tooltip: true,
          align: 'center',
          minWidth: 150
        }
      ],
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (date) {
      this.form.start_time = date;
    },
    handleChange1 (date) {
      this.form.end_time = date;
    },
    // 查询
    onSeach () {
      this.getList()
    },
    // 获取列表
    async getList () {
      console.log(this.form);
      let { data } = await tLogInfoPageQuery(this.form)
      if (data.code == '200') {
        this.tableData = data.data.data
        this.total = data.data.total
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

<style lang="less">

</style>
