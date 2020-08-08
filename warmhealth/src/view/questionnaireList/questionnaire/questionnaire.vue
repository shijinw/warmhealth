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
             <FormItem label="问卷类型" prop="type_id">
              <Select v-model="form.type_id" clearable style="width: 160px;">
                <Option value="1">高血压患者自填表</Option>
                <Option value="2">匹兹堡睡眠质分数自评</Option>
                <Option value="3">中医证型问卷</Option>
              </Select>
            </FormItem>
            <FormItem label="性别" prop="gender">
              <Select v-model="form.gender" clearable style="width: 160px;">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </FormItem>
            <FormItem label="答卷日期开始" prop="start_time">
              <DatePicker type="datetime" v-model="form.start_time" @on-change="handleChange" placeholder="答卷日期开始" style="width: 160px;"></DatePicker>
            </FormItem>
            <FormItem label="答卷日期截止" prop="end_time">
              <DatePicker type="datetime" v-model="form.end_time" @on-change="handleChange1" placeholder="答卷日期截止" style="width: 160px;"></DatePicker>
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
          </ButtonGroup>
          <Dropdown placement="bottom-start" @on-click="downTemplate" style="margin-left: 12px;">
            <Button>导入示例模板下载</Button>
            <DropdownMenu slot="list">
              <DropdownItem name="1">高血压患者自填表示例模板</DropdownItem>
              <DropdownItem name="2">匹兹堡睡眠质分数自评示例模板</DropdownItem>
              <DropdownItem name="3">中医证型问卷示例模板</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
        <template slot-scope="{ row }" slot="type_id">
          <span>{{ row.type_id == "1" ? "高血压患者自填表" : row.type_id == "2" ? "匹兹堡睡眠质分数自评" : "中医证型问卷" }}</span>
        </template>
        <template slot-scope="{ row }" slot="create_time">
          <span>{{ row.create_time | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="nickName">
          <span>{{ row.nickName }}</span>
        </template>
        <!-- <template slot-scope="{ row }" slot="updateTime">
          <span>{{ row.updateTime | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="updatePerson">
          <span>{{ row.updatePerson }}</span>
        </template> -->
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 8px;" @click="look(row, index)">查 看</Button>
          <!-- <Button type="warning" size="small" style="margin-right: 8px;" @click="put(row, index)">修 改</Button> -->
          <Button type="error" size="small" @click="del(row, index)">删 除</Button>
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

      <!-- 查看 -->
      <Modal
        v-model="modal"
        :title="title"
        width="420"
        :mask-closable="false"
        :styles="{top: '20px'}"
        @on-cancel="closeModal('formValidate')"
        :footer-hide="true">
        <Row>
          <Col :span="12" style="padding: 12px 0;">姓名：{{ row.realname }}</Col>
          <Col :span="12" style="padding: 12px 0;">性别：{{ row.gender == '1' ? '男' : row.gender == '2' ? '女' : '未填写' }}</Col>
        </Row>
        <Row>
          <Col :span="12" style="padding: 12px 0;">年龄：{{ row.age }}</Col>
          <Col :span="12" style="padding: 12px 0;">手机：{{ row.mobile }}</Col>
        </Row>
        <Row>
          <Col :span="24" style="padding: 12px 0;">问题：{{ row.age }}</Col>
        </Row>
        <Row>
          <Col :span="24" style="padding: 12px 0;">反馈：
            <Input v-model="row.feedback" :disabled="row.status == '1'" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="反馈内容" style="width: 80%;" />
          </Col>
        </Row>
        <Row v-if="row.status == '2'">
          <Col :span="24" style="padding: 12px 0;text-align: center;">
             <Button type="warning" :loading="loading" @click="habdleClickSave">反 馈</Button>
          </Col>
        </Row>
      </Modal>

      <Modal
        v-model="modal2"
        title="问卷信息导出"
        :loading="true"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="exportData" :model="exportData" label-position="right" :label-width="120">
          <FormItem label="答卷日期开始" prop="start_time">
            <DatePicker type="datetime" v-model="exportData.start_time" @on-change="handleChange22" placeholder="答卷日期开始"></DatePicker>
          </FormItem>
          <FormItem label="答卷日期截止" prop="end_time">
            <DatePicker type="datetime" v-model="exportData.end_time" @on-change="handleChange33" placeholder="答卷日期截止"></DatePicker>
          </FormItem>
          <FormItem label="问卷类型" prop="type_id">
            <Select v-model="exportData.type_id" clearable>
              <Option value="1">高血压患者自填表</Option>
              <Option value="2">匹兹堡睡眠质分数自评</Option>
              <Option value="3">中医证型问卷</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>

      <Modal
        v-model="modal3"
        title="问卷信息导入"
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
  quesurveyList,
  delQuesurvey,
  quesurveyExport,
  leadQuesurvey
} from '@/api/patient'
export default {
  name: 'questionnaire_page',
  data () {
    return {
      title: '反馈',
      modal2: false,
      modal3: false,
      modal: false,
      importLoading: false,
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      form: {
        mobile: '',
        realname: '',
        address: '',
        gender: '',
        start_time: '',
        end_time: '',
        type_id: '',
        page: 1,
        limit: 10
      },
      row: {},
      loading: false,
      exportData: {
        start_time: '',
        end_time: ''
      },
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
          title: '地址',
          slot: 'address',
          tooltip: true,
          align: 'center',
          minWidth: 130
        },
        {
          title: '问卷类型',
          slot: 'type_id',
          tooltip: true,
          align: 'center',
          minWidth: 170
        },
        {
          title: '提交时间',
          slot: 'create_time',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '用户名',
          slot: 'nickName',
          tooltip: true,
          align: 'center',
          minWidth: 120
        },
        {
          title: '操作',
          slot: 'action',
          width: 160,
          align: 'center'
        }
      ],
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      tableData: [],
      exportLoading: false,
      arrData: [],
      titles: []
    }
  },
  created () {

  },
  mounted () {
    this.getList()
  },
  methods: {
    downTemplate (name) {
      if (name == '1') {
        window.location.href = "https://api.warmhealth.com.cn/高血压患者自填表导入示例模板.xlsx"
      } else if (name == '2') {
        window.location.href = "https://api.warmhealth.com.cn/匹兹堡睡眠质分数自评导入示例模板.xlsx"
      } else {
        window.location.href = "https://api.warmhealth.com.cn/中医证型问卷导入示例模板.xlsx"
      }
    },
    importTemplate () {
      this.initUpload()
      this.modal3 = true
    },
    exportTemplate () {
      this.exportData.start_time = ''
      this.exportData.end_time = ''
      this.exportData.type_id = ''
      this.modal2 = true
    },
    async ok () {
      if (this.exportData.start_time == '' || this.exportData.end_time == '' || this.exportData.type_id == '') {
        this.$Message.info('请选择导出时间段和类型！');
        return;
      }
      this.exportLoading = true
      let { data } = await quesurveyExport(this.exportData)
      if (data.code == '200') {
        let arr = data.data
        let params = {}
        if (this.exportData.type_id == '1') {
          params = {
            title: ['ID', '真实姓名', '手机号', '性别', '住址', '问卷类型', '用户名', '提交时间',
              '【问卷】姓名',
              '【问卷】性别',
              '【问卷】年龄',
              '【问卷】身高(cm)',
              '【问卷】体重(kg)',
              '【问卷】学历',
              '【问卷】职业',
              '【问卷】吸烟(根/每天)',
              '【问卷】吸烟(年)',
              '【问卷】是否饮酒',
              '【问卷】安眠药(名称)',
              '【问卷】安眠药(时间)',
              '【问卷】安眠药(剂量)',
              '【问卷】高血压家族史',
              '【问卷】是否初诊',
              '【问卷】高血压(分级)',
              '【问卷】高血压(年)',
              '【问卷】高血压用药(名称)',
              '【问卷】高血压用药(规律与否)',
              '【问卷】高血压用药(服用时间早)',
              '【问卷】高血压用药(服用时间晚)',
              '【问卷】颈动脉超声光滑与否',
              '【问卷】颈动脉超声(厚度mm)',
              '【问卷】粥样硬化斑块厚度(厚度mm)',
              '【问卷】EGFR',
              '【问卷】肌酐',
              '【问卷】胆固醇',
              '【问卷】(甘油三酯)',
              '【问卷】病史',
              '【问卷】低密度脂蛋',
              '【问卷】同型半胱氨',
              '【问卷】糖尿病分型',
              '【问卷】糖',
              '【问卷】糖化',
              '【问卷】是否午睡',
              '【问卷】午睡(时长)',
              '【问卷】午睡(频次/周)',
              '【问卷】咖啡(偶尔不记)',
              '【问卷】运动习惯(名称)',
              '【问卷】运动习惯(时长min)',
              '【问卷】运动习惯(频次/周)',
              '【问卷】运动习惯(时间段)',
              '【问卷】CPC检测(昨晚入睡时间)',
              '【问卷】CPC检测(今早起床时间)',
              '【问卷】CPC检测(醒来30分钟)',
              '【问卷】绝经与否',
              '【问卷】测量血压(第一次低压mmHg)',
              '【问卷】测量血压(第一次高压mmHg)',
              '【问卷】测量血压(第二次低压mmHg)',
              '【问卷】测量血压(第二次高压mmHg)'
            ],
            key: ['id', 'realname', 'mobile', 'gender', 'address', 'type_name', 'nickName', 'create_time',
              'username',
              'sex',
              'age',
              'height',
              'weight',
              'education',
              'occupation',
              'smoke_day',
              'smoke_year',
              'drink',
              'sleeping_name',
              'sleeping_time',
              'sleeping_measure',
              'high_blood',
              'is_chuzhen',
              'fenji',
              'case_year',
              'blood_name',
              'is_law',
              'blood_time_moring',
              'blood_time_night',
              'artery',
              'artery_thickness',
              'sclerosis_plaques',
              'EGFR',
              'creatinine',
              'cholesterol',
              'triglyceride',
              'medical_history',
              'LDL',
              'homocysteine',
              'diabetes_classification',
              'sugar',
              'saccharify',
              'siesta',
              'siesta_time',
              'siesta_week',
              'coffee',
              'sport_name',
              'sport_time',
              'sport_week',
              'sport_quantum',
              'last_night_time',
              'today_wake_time',
              'wake_minutes',
              'menopause',
              'first_low_blood',
              'first_high_blood',
              'tow_low_blood',
              'tow_high_blood'
            ],
            data: arr,
            autoWidth: true,
            filename: '高血压患者自填表'
          }
        } else if (this.exportData.type_id == '2') {
          params = {
            title: ['ID', '真实姓名', '手机号', '性别', '住址', '问卷类型', '用户名', '提交时间',
              '【问卷】近1个月，晚上上床睡觉通常几点',
              '【问卷】近1个月，从上床到入睡通常需要几分钟',
              '【问卷】近1个月，通常早上几点起床',
              '【问卷】近1个月，每夜通常实际睡眠几小时',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(入睡困难超过30分钟)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(夜间易醒或早醒)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(夜间去厕所)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(呼吸不畅)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(咳嗽或鼾声高)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(感觉冷)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(感觉热)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(梦多影响作息)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(疼痛不适)',
              '【问卷】近1个月，因下列情况影响睡眠而烦恼(其它影响睡眠的事情)',
              '【问卷】近一个月，您用催眠药的情况',
              '【问卷】近一个月，您感到困倦么',
              '【问卷】近一个月，您感到乏力和做事精力不足么',
              '【问卷】近一个月，您感觉您的睡眠质量怎么样'
            ],
            key: ['id', 'realname', 'mobile', 'gender', 'address', 'type_name', 'nickName', 'create_time',
              'sleep_time',
              'go_sleep_time',
              'go_up_time',
              'deep_sleep',
              'difficulty_sleep_time',
              'night_festless_sleep',
              'night_wc',
              'breathe_difficulty',
              'cough_num',
              'feel_cold',
              'feel_hot',
              'dream_num',
              'is_pain',
              'other_thing',
              'hypnotic',
              'tired',
              'lacking',
              'sleep_quality'
            ],
            data: arr,
            autoWidth: true,
            filename: '匹兹堡睡眠质分数自评'
          }
        } else if (this.exportData.type_id == '3') {
          params = {
            title: ['ID', '真实姓名', '手机号', '性别', '住址', '问卷类型', '用户名', '提交时间',
              '【问卷】主症(眩晕)',
              '【问卷】主症(头痛)',
              '【问卷】主症(急躁易怒)',
              '【问卷】主症(腰酸)',
              '【问卷】主症(腰软)',
              '【问卷】主症(五心烦热)',
              '【问卷】主症(头重如裹)',
              '【问卷】主症(胸闷)',
              '【问卷】主症(呕吐痰涎)',
              '【问卷】主症(畏寒肢冷)',
              '【问卷】次症(面赤)',
              '【问卷】次症(目赤)',
              '【问卷】次症(口干)',
              '【问卷】次症(口苦)',
              '【问卷】次症(便秘)',
              '【问卷】次症(溲赤)',
              '【问卷】次症(心悸)',
              '【问卷】次症(失眠)',
              '【问卷】次症(耳鸣)',
              '【问卷】次症(健忘)',
              '【问卷】次症(口淡)',
              '【问卷】次症(食少)',
              '【问卷】次症(气短)',
              '【问卷】次症(夜尿频)',
              '【问卷】次症(其他)',
              '【问卷】舌脉(舌质)',
              '【问卷】舌脉(舌苔)',
              '【问卷】舌脉(脉象)',
            ],
            key: ['id', 'realname', 'mobile', 'gender', 'address', 'type_name', 'nickName', 'create_time',
              'dizziness',
              'headache',
              'temper',
              'lumbago',
              'loinmild',
              'dysphoria',
              'head_weight',
              'chest',
              'Vomit',
              'coldchills',
              'flushing',
              'hot_eyes',
              'dry',
              'bitter',
              'constipation',
              'souchi',
              'palpitation',
              'insomnia',
              'tinnitus',
              'amnesia',
              'koudan',
              'reduced',
              'breathe',
              'night_urinate',
              'other',
              'tongue',
              'shetai',
              'pulse'
            ],
            data: arr,
            autoWidth: true,
            filename: '中医证型问卷'
          }
        }
        excel.export_array_to_excel(params)
        setTimeout(() => {
          this.exportLoading = false
          this.$Message.success('导出成功');
          this.modal2 = false
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
      let { data } = await leadQuesurvey(this.arrData)
      if (data.code == '200') {
        setTimeout(() => {
          this.importLoading = false
          this.$Message.success('导入成功');
          this.getList()
          this.modal3 = false
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
      this.titles = []
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
        console.log(header)
        console.log(results)
        const tableTitle = header.map(item => { return { title: item, key: item } })
        this.arrData = results
        this.titles = tableTitle
        this.uploadLoading = false
        this.showRemoveFile = true
      }
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
    feedBack (row, index) {
      let obj = Object.assign({}, row)
      this.row = obj
      if (this.row.status == '1') this.title = '查看'
      else this.title = '反馈'
      this.modal = true
    },
    async put () {
      // if (this.row.feedback == '') {
      //   this.$Message.error('请输入反馈内容！')
      //   return
      // }
      // this.loading = true
      // let { data } = await replyFeedback({id: this.row.id, feedback: this.row.feedback})
      // if (data.code == '200') {
      //    this.$Message.success('反馈成功!');
      //   setTimeout(() => {
      //     this.loading = false
      //     this.getList()
      //   }, 2000)
      //   this.getList()
      // } else {
      //   this.loading = false
      //   this.$Message.error(data.msg)
      // }
      this.$Message.error('小程序前台完成方可修改');
    },
    look (row, index) {
      let obj = Object.assign({}, row)
      if (obj.type_id == 1) {
        this.$router.push({path: 'gaoxueya_page', query: {id: obj.id}})
      } else if (obj.type_id == 2) {
        this.$router.push({path: 'fenshuziping_page', query: {id: obj.id}})
      } else {
        this.$router.push({path: 'zhongyiwenjuan_page', query: {id: obj.id}})
      }
    },
    del (row, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认删除？</p>',
        onOk: async () => {
          let { data } = await delQuesurvey({ id: row.id })
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
    // 列表展示
    async getList () {
      let { data } = await quesurveyList(this.form)
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

<style lang="less">

</style>
