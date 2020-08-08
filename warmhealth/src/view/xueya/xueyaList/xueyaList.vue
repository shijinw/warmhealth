<template>
  <div>
    <Card style="min-height: 80vh;">
      <Row>
        <Col span="24">
          <Form ref="form" :model="form" inline label-position="right" :label-width="100">
            <FormItem label="手机号码" prop="mobile">
              <Input type="text" v-model="form.mobile" clearable placeholder="手机号码" style="width: 160px;"></Input>
            </FormItem>
            <FormItem label="真实名称" prop="realname">
              <Input type="text" v-model="form.realname" clearable placeholder="真实名称" style="width: 160px;"></Input>
            </FormItem>
            <FormItem label="所属地区" prop="address">
              <Input type="text" v-model="form.address" clearable placeholder="所属地区" style="width: 160px;"></Input>
            </FormItem>
            <FormItem label="性别" prop="gender">
              <Select v-model="form.gender" clearable style="width: 160px;">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </FormItem>
            <FormItem label="填表日期开始" prop="start_time">
              <DatePicker type="datetime" v-model="form.start_time" @on-change="handleChange" placeholder="注册日期开始" style="width: 160px;"></DatePicker>
            </FormItem>
            <FormItem label="填表日期截止" prop="end_time">
              <DatePicker type="datetime" v-model="form.end_time" @on-change="handleChange1" placeholder="注册日期截止" style="width: 160px;"></DatePicker>
            </FormItem>
            <Button type="primary" @click="onSeach">查 询</Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <ButtonGroup>
            <Button @click="importTemplate">导入</Button>
            <Button @click="exportTemplate">导出</Button>
            <Button @click="downTemplate">导入示例模板下载</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="id">
          <span>{{ row.id }}</span>
        </template>
        <template slot-scope="{ row }" slot="realname">
          <strong>{{ row.realname }}</strong>
        </template>
        <template slot-scope="{ row }" slot="mobile">
          <span>{{ row.mobile }}</span>
        </template>
        <template slot-scope="{ row }" slot="gender">
          <span>{{ row.gender == '1' ? '男' : row.gender == '2' ? '女' : '未填写'}}</span>
        </template>
        <template slot-scope="{ row }" slot="address">
          <span>{{ row.address }}</span>
        </template>
        <template slot-scope="{ row }" slot="days">
          <span>{{ row.days }}</span>
        </template>
        <template slot-scope="{ row }" slot="zao_low_blood">
          <span>{{ row.zao_low_blood ? row.zao_low_blood + 'mmHg' : '未填' }}</span>
        </template>
        <template slot-scope="{ row }" slot="zao_high_blood">
          <span>{{ row.zao_high_blood ? row.zao_high_blood + 'mmHg' : '未填' }}</span>
        </template>
        <template slot-scope="{ row }" slot="zhong_low_blood">
          <span>{{ row.zhong_low_blood ? row.zhong_low_blood + 'mmHg' : '未填' }}</span>
        </template>
        <template slot-scope="{ row }" slot="zhong_high_blood">
          <span>{{ row.zhong_high_blood ? row.zhong_high_blood + 'mmHg' : '未填' }}</span>
        </template>
        <template slot-scope="{ row }" slot="wan_low_blood">
          <span>{{ row.wan_low_blood ? row.wan_low_blood + 'mmHg' : '未填' }}</span>
        </template>
        <template slot-scope="{ row }" slot="wan_high_blood">
          <span>{{ row.wan_high_blood ? row.wan_high_blood + 'mmHg' : '未填' }}</span>
        </template>
        <!-- <template slot-scope="{ row }" slot="updateTime">
          <span>{{ row.updateTime | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="updatePerson">
          <span>{{ row.updatePerson }}</span>
        </template> -->
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
        title="患者血压信息导出"
        :loading="true"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="exportData" :model="exportData" label-position="right" :label-width="120">
          <FormItem label="填表日期开始" prop="start_time">
            <DatePicker type="datetime" v-model="exportData.start_time" @on-change="handleChange22" placeholder="填表日期开始"></DatePicker>
          </FormItem>
          <FormItem label="填表日期截止" prop="end_time">
            <DatePicker type="datetime" v-model="exportData.end_time" @on-change="handleChange33" placeholder="填表日期截止"></DatePicker>
          </FormItem>
        </Form>
      </Modal>

      <Modal
        v-model="modal2"
        title="患者血压信息导入"
        :loading="true"
        @on-ok="ok2"
        @on-cancel="cancel2">
        <Row>
          <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
            <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
          </Upload>
        </Row>
        <Row>
          <div class="ivu-upload-list-file" v-if="file !== null">
            <Icon type="ios-stats"></Icon>
              {{ file.name }}
            <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
          </div>
        </Row>
        <Row>
          <transition name="fade">
            <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
              <div v-if="progressPercent == 100">
                <Icon type="ios-checkmark-circle"></Icon>
                <span>成功</span>
              </div>
            </Progress>
          </transition>
        </Row>
      </Modal>
    </Card>
  </div>
</template>

<script>
import Format from '@/libs/format.js' // 自定义验证
import excel from '@/libs/excel' // excel方法
import {
  UserBloodList,
  UserBloodExport,
  leadBlood
} from '@/api/patient'
export default {
  name: 'xueyaList_page',
  data () {
    return {
      form: {
        mobile: '',
        realname: '',
        address: '',
        gender: '',
        start_time: '',
        end_time: '',
        page: 1,
        limit: 10
      },
      modal: false,
      exportLoading: false,
      modal2: false,
      importLoading: false,
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
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
          title: '住址',
          slot: 'address',
          tooltip: true,
          align: 'center',
          minWidth: 130
        },
        {
          title: '填表日期',
          slot: 'days',
          tooltip: true,
          align: 'center',
          minWidth: 120
        },
        {
          title: '早低压',
          slot: 'zao_low_blood',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '早高压',
          slot: 'zao_high_blood',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '午低压',
          slot: 'zhong_low_blood',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '午高压',
          slot: 'zhong_high_blood',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '晚低压',
          slot: 'wan_low_blood',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '晚高压',
          slot: 'wan_high_blood',
          tooltip: true,
          align: 'center',
          minWidth: 100
        }
      ],
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      tableData: [],
      exportData: {
        start_time: '',
        end_time: ''
      },
      arrData: [],
      title: []
    }
  },
  created () {

  },
  mounted () {
    this.getList()
  },
  methods: {
    downTemplate () {
      window.location.href = "https://api.warmhealth.com.cn/患者血压导入示例模板.xlsx"
    },
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
    handleChange22 (date) {
      this.exportData.start_time = date;
    },
    handleChange33 (date) {
     let Dates = date.replace(/00:00:00/g, ($0) => {
        return '23:59:59';
      })
      this.exportData.end_time = Dates;
    },
    // 列表展示
    async getList () {
      let { data } = await UserBloodList(this.form)
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
    },
    exportTemplate () {
      this.exportData.start_time = ''
      this.exportData.end_time = ''
      this.modal = true
    },
    importTemplate () {
      this.initUpload()
      this.modal2 = true
    },
    async ok () {
      if (this.exportData.start_time == '' || this.exportData.end_time == '') {
        this.$Message.info('请选择导出时间段！');
        return;
      }
      this.exportLoading = true
      let { data } = await UserBloodExport(this.exportData)
      if (data.code == '200') {
        let arr = data.data
        const params = {
          title: ['ID', '真实姓名', '手机号', '性别', '住址', '填表日期', '早低压(mmhg)', '早高压(mmhg)', '午低压(mmhg)', '午高压(mmhg)', '晚低压(mmhg)', '晚高压(mmhg)'],
          key: ['id', 'realname', 'mobile', 'gender', 'address', 'days', 'zao_low_blood', 'zao_high_blood', 'zhong_low_blood', 'zhong_high_blood', 'wan_low_blood', 'wan_high_blood' ],
          data: arr,
          autoWidth: true,
          filename: '患者血压表'
        }
        excel.export_array_to_excel(params)
        setTimeout(() => {
          this.exportLoading = false
          this.$Message.success('导出成功');
          this.modal = false
        }, 1500)
      } else {
        this.exportLoading = false
        this.$Message.error(data.msg)
      }
    },
    cancel () {
      this.$Message.info('已取消');
    },
    async ok2 () {
      if (this.arrData.length < 1) {
        this.$Message.info('文件数据为空或未上传！');
        return;
      }
      this.importLoading = true
      let { data } = await leadBlood(this.arrData)
      if (data.code == '200') {
        setTimeout(() => {
          this.importLoading = false
          this.$Message.success('导入成功');
          this.getList()
          this.modal2 = false
        }, 1500)
      } else {
        this.importLoading = false
        this.$Message.error(data.msg)
      }
    },
    cancel2 () {
      this.$Message.info('已取消');
    },
    initUpload () {
      this.file = null
      this.showProgress = false
      this.progressPercent = 0
      this.arrData = [],
      this.title = []
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleRemove () {
      this.initUpload()
      this.$Message.info('上传的文件已删除！')
    },
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
        this.showProgress = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round(e.loaded / e.total * 100)
      }
      reader.onerror = e => {
        this.$Message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$Message.info('文件读取成功')
        const data = e.target.result
        const { header, results } = excel.read(data, 'array')
        const tableTitle = header.map(item => { return { title: item, key: item } })
        this.arrData = results
        this.title = tableTitle
        this.uploadLoading = false
        this.showRemoveFile = true
      }
    }
  }
}
</script>

<style lang="less">

</style>
