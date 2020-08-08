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

          <FormItem label="性别"
                    prop="gender">
            <Select v-model="form.gender"
                    clearable
                    style="width: 160px;"
                    placeholder="请选择性别">
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </FormItem>
          <FormItem label="注册日期开始"
                    prop="start_time">
            <DatePicker type="datetime"
                        v-model="form.start_time"
                        @on-change="handleChange"
                        placeholder="注册日期开始"
                        style="width: 160px;"></DatePicker>
          </FormItem>
          <FormItem label="注册日期截止"
                    prop="end_time">
            <DatePicker type="datetime"
                        v-model="form.end_time"
                        @on-change="handleChange1"
                        placeholder="注册日期截止"
                        style="width: 160px;"></DatePicker>
          </FormItem>
        </Form>
        </Col>
      </Row>

      <Row>
        <Col span="24">
        <ButtonGroup style="margin-left:15px">
          <Button @click="importTemplate">导入</Button>
          <Button @click="exportTemplate">导出</Button>
          <Button @click="downTemplate">导入示例模板下载</Button>
          <Button style="margin-left:15px"
                  type="primary"
                  @click="onSeach">查 询</Button>
          <!-- <Button style="margin-left:15px" type="warning" @click="onclikload">下载网络听诊</Button> -->
        </ButtonGroup>
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
                  slot="doctor_name">
          <strong>{{ row.doctor_name }}</strong>
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
                  slot="age">
          <span>{{ row.age }}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="address">
          <span>{{ row.address }}</span>
        </template>

        <template slot-scope="{ row }"
                  slot="nickName">
          <span>{{ row.nickName }}</span>
        </template>

        <template slot-scope="{ row }"
                  slot="is_lung_device">
          <span>{{ row.is_lung_device==1?'绑定':'未绑定' }}</span>
        </template>

        <template slot-scope="{ row }"
                  slot="reg_time">
          <span>{{ row.reg_time }}</span>
        </template>
        <template slot-scope="{ row, index }"
                  slot="action">
          <Dropdown transfer>
            <Button type="primary">
              操作
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="putKnow(row)">添加听诊信息</DropdownItem>
              <DropdownItem @click.native="onclikload">下载网络听诊</DropdownItem>
              <DropdownItem v-if="row.is_lung_reg==2?true:false"
                            @click.native="putreg(1,row)">绑定用户</DropdownItem>
              <DropdownItem v-else
                            @click.native="putreg(2,row)">更改用户</DropdownItem>
              <DropdownItem v-if="row.is_lung_device==2?true:false"
                            @click.native="putdevice(1,row)">绑定肺功能仪器</DropdownItem>
              <DropdownItem v-else
                            @click.native="putdevice(2,row)">解除肺功能仪器</DropdownItem>

              <!-- <DropdownItem  @click.native="addevent(row)">强制绑定用户</DropdownItem> -->

              <DropdownItem @click.native="predicted(1,row)">UUID查询肺功能预计值</DropdownItem>
              <DropdownItem @click.native="predictedvalue(2,row)">信息查询的肺功能预计值</DropdownItem>

              <DropdownItem @click.native="FVCTest(row)">获取FVC测量数据</DropdownItem>
              <DropdownItem @click.native="FVCdaily(row)">获取FVC检查日报告</DropdownItem>

              <DropdownItem @click.native="lookvance(row)">查看患者详细信息</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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

      <Modal v-model="modal"
             title="患者信息导出"
             :loading="true"
             @on-ok="ok"
             @on-cancel="cancel">
        <Form ref="exportData"
              :model="exportData"
              label-position="right"
              :label-width="120">
          <FormItem label="注册日期开始"
                    prop="start_time">
            <DatePicker type="datetime"
                        v-model="exportData.start_time"
                        @on-change="handleChange22"
                        placeholder="注册日期开始"></DatePicker>
          </FormItem>
          <FormItem label="注册日期截止"
                    prop="end_time">
            <DatePicker type="datetime"
                        v-model="exportData.end_time"
                        :default-time="['23:59:59']"
                        @on-change="handleChange33"
                        placeholder="注册日期截止"></DatePicker>
          </FormItem>
        </Form>
      </Modal>

      <Modal v-model="modal2"
             title="患者信息导入"
             :loading="true"
             @on-ok="ok2"
             @on-cancel="cancel2">
        <Row>
          <Upload action=""
                  :before-upload="handleBeforeUpload"
                  accept=".xls, .xlsx">
            <Button icon="ios-cloud-upload-outline"
                    :loading="uploadLoading"
                    @click="handleUploadFile">上传文件</Button>
          </Upload>
        </Row>
        <Row>
          <div class="ivu-upload-list-file"
               v-if="file !== null">
            <Icon type="ios-stats"></Icon>
            {{ file.name }}
            <Icon v-show="showRemoveFile"
                  type="ios-close"
                  class="ivu-upload-list-remove"
                  @click.native="handleRemove()"></Icon>
          </div>
        </Row>
        <Row>
          <transition name="fade">
            <Progress v-if="showProgress"
                      :percent="progressPercent"
                      :stroke-width="2">
              <div v-if="progressPercent == 100">
                <Icon type="ios-checkmark-circle"></Icon>
                <span>成功</span>
              </div>
            </Progress>
          </transition>
        </Row>
      </Modal>
      <Modal v-model="vancemodel"
             title="选择处理方式"
             :width="300"
             @on-ok="vance">
        <RadioGroup v-model="vanceform.audit_status"
                    style="display:flex;justify-content: center;">
          <Radio label="1">通过</Radio>
          <Radio label="2">未通过</Radio>
        </RadioGroup>
      </Modal>
      <Modal v-model="promodel"
             title="患者详细信息"
             :footer-hide="true">
        <div>
          <Form class="Fromlist"
                ref="projectForm"
                :model="projectForm"
                :label-width="80">
            <Row>
              <Col :span="12">
              <FormItem label="真实姓名:">
                <Input v-model="projectForm.realname"
                       readonly></Input>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="电话号:">
                <Input v-model="projectForm.mobile"
                       readonly></Input>
              </FormItem>
              </Col>

            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="性别:">
                <Input v-model="projectForm.gender==1?'男':'女'"
                       readonly></Input>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="年龄:">
                <Input v-model="projectForm.age"
                       readonly></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="微信名称:">
                <Input v-model="projectForm.username"
                       readonly></Input>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="注册时间:">
                <Input v-model="projectForm.reg_time"
                       readonly></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="20">
              <FormItem label="联系地址:">
                <Input v-model="projectForm.address"
                       readonly></Input>
              </FormItem>
              </Col>

            </Row>
            <Row v-if="projectForm.user_type==1?true:false">
              <Col :span="12">
              <FormItem label="药物过敏史:">
                <Input v-model="projectForm.allergy_history"
                       readonly></Input>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="既往病史:">
                <Input v-model="projectForm.medical_history"
                       readonly></Input>
              </FormItem>
              </Col>
            </Row>

            <Row v-if="projectForm.user_type==1?false:true">
              <Col :span="12">
              <FormItem label="医院名称">
                <Input v-model="projectForm.hospital_name"
                       readonly></Input>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="医院科室名">
                <Input v-model="projectForm.department_name"
                       readonly></Input>
              </FormItem>
              </Col>
            </Row>

            <Row v-if="projectForm.user_type==1?false:true">
              <Col :span="12"
                   v-for="item in uploadList"
                   :key="item.name">
              <FormItem :label="item.name">
                <div class="demo-upload-list">
                  <template>
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline"
                            @click.native="handleView(item.url)"></Icon>
                    </div>
                  </template>
                </div>
              </FormItem>
              </Col>

            </Row>

          </Form>

        </div>
      </Modal>
      <Modal title="View Image"
             v-model="visible">
        <img :src="pageImages"
             v-if="visible"
             style="width: 100%">
      </Modal>
    </Card>
    <Modal :width="700"
           title="下载网络平台听诊"
           v-model="downshow"
           footer-hide>
      <Row>
        <Col :span="18">
        <Input placeholder="请输入参数，如120181011028_20190920110552_000021_010_L1.dat"
               style="width:500px"
               v-model="download.changeload"
               @on-blur="loadbulr" />
        </Col>
        <Col :span="6">
        <a v-if="download.changeload"
           :href="changeload"
           style="padding-left:30px">
          <Button type="info">下载听诊报告单</Button>
        </a>
        <Button style="padding-left:30px"
                v-else
                type="info"
                @click="onloads">下载听诊报告单</Button>
        </Col>

      </Row>
      <Row style="margin-top:40px">
        <Col :span="18">
        <Input placeholder="请输入参数，如120181011028_20190920110552_000021_010_L1.dat"
               style="width:500px"
               v-model="download.changedown"
               @on-blur="downbulr" />
        </Col>
        <Col :span="6">
        <a v-if="download.changedown"
           :href="changedown"
           style="padding-left:30px">
          <Button type="info">下载音频文件</Button>
        </a>
        <Button style="padding-left:30px"
                v-else
                type="info"
                @click="onloads">下载音频文件</Button>

        </Col>

      </Row>
    </Modal>
    <Modal v-model="modal6"
           :title="typetitle"
           footer-hide>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate">
        <FormItem label="仪器型号"
                  prop="device_type"
                  :label-width="120">
          <Input v-model="formValidate.device_type"
                 placeholder="仪器型号"></Input>
        </FormItem>
        <FormItem label="仪器序列号"
                  prop="device_sn"
                  :label-width="120">
          <Input v-model="formValidate.device_sn"
                 placeholder="仪器序列号"></Input>
        </FormItem>
        <FormItem style="text-align:center">
          <Button type="primary"
                  @click="handleSubmit('formValidate')">确认绑定</Button>
        </FormItem>
      </Form>

    </Modal>

    <Modal v-model="fvcshow"
           :title="fvctitle"
           footer-hide>
      <Form ref="fvcValidate"
            :model="fvcValidate"
            :rules="rulefvc">
        <FormItem label="选择时间">
          <Row>
            <Col span="8">
            <FormItem prop="start_date">
              <DatePicker type="date"
                          placeholder="开始时间"
                          v-model="fvcValidate.start_date"
                          @on-change="VCstartdate"></DatePicker>
            </FormItem>
            </Col>
            <Col span="2"
                 style="text-align: center">--</Col>
            <Col span="8">
            <FormItem prop="end_date">
              <DatePicker type="date"
                          placeholder="结束时间"
                          v-model="fvcValidate.end_date"
                          @on-change="VCenddate"></DatePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem style="text-align:center">
          <Button type="primary"
                  @click="fvcSubmit('fvcValidate')">确认获取</Button>
        </FormItem>
      </Form>

    </Modal>

  </div>
</template>

<script>
import Format from '@/libs/format.js' // 自定义验证
import excel from '@/libs/excel' // excel方法
import { mapMutations } from "vuex";

import {
  userList,
  userExport,
  leadUser,
  getUserDetalis,
  auditStatus,
  bindingRegister,
  putUserInfo,
  bindDevice,
  unbindDevice,
  predictedvalueOne,
  PredictedDetails,
  predictedvalueTow,
  getFVCTestData,
  getFVCdailyreport,
  forcebind,
} from '@/api/patient'
export default {
  name: 'patient_page',
  data () {
    return {
      downshow: false,
      modal6: false,
      fvcshow: false,
      fvctitle: '获取FVC测量数据',
      typetitle: '绑定肺功能仪器',
      formValidate: {
        device_sn: '',
        device_type: '',
        user_id: ''
      },

      fvcValidate: {
        start_date: '',
        end_date: '',
        user_id: ''
      },
      ruleValidate: {
        device_type: [
          { required: true, message: '请输入正确的字符', trigger: 'blur' }
        ],
        device_sn: [
          { required: true, message: '请输入正确的字符', trigger: 'blur' },
        ],

      },
      rulefvc: {
        start_date: [
          { required: true, message: '请输入正确的字符' }
        ],
        end_date: [
          { required: true, message: '请输入正确的字符' },
        ],
      },

      form: {
        mobile: '',
        realname: '',
        address: '',
        user_type: 1,
        gender: '',
        start_time: '',
        end_time: '',
        page: 1,
        limit: 10
      },
      vanceform: {
        id: '',
        audit_status: 1,
      },
      uploadList: [],
      pageImages: '',
      visible: false,
      vancemodel: false,
      projectForm: {},
      promodel: false,
      modal: false,
      exportLoading: false,
      modal2: false,
      importLoading: false,
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      download: {
        changeload: '',
        changedown: '',
      },
      changeload: '',
      changedown: '',
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
          title: '患者姓名',
          slot: 'realname',
          tooltip: true,
          align: 'center',
          minWidth: 90
        },
        {
          title: '医助姓名',
          slot: 'doctor_name',
          tooltip: true,
          align: 'center',
          minWidth: 90
        },
        {
          title: '手机号',
          slot: 'mobile',
          tooltip: true,
          align: 'center',
          minWidth: 110
        },
        {
          title: '性别',
          slot: 'gender',
          tooltip: true,
          align: 'center',
          minWidth: 60
        },
        {
          title: '年龄',
          slot: 'age',
          tooltip: true,
          align: 'center',
          minWidth: 60
        },
        {
          title: '联系地址',
          slot: 'address',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '微信名称',
          slot: 'nickName',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '绑定设备',
          slot: 'is_lung_device',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        //         {
        //   title: '用户类型',
        //   minWidth: 90,
        //   tooltip: true,
        //   align: 'center',
        //     render: (h, params) => {
        //     let text = ''
        //     let color = ''
        //     if (params.row.user_type == 1) {
        //       text = '患者'
        //       color = 'red'
        //     } else {
        //         text = '医生'
        //       color = 'blue'
        //     }
        //     return h('div', [
        //       h(
        //         'span',
        //         {
        //           style: {
        //             color: color
        //           }
        //         },
        //         text
        //       )
        //     ])
        //   }
        // },
        {
          title: '注册时间',
          slot: 'reg_time',
          tooltip: true,
          align: 'center',
          minWidth: 130
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 140,
          align: 'center',
          // render: (h, params) => {

          //   return h('div', [

          //     h('Button', {
          //       props: {
          //         type: 'success',
          //         size: 'small'

          //       },
          //       style: {
          //         marginRight: '10px'
          //       },
          //       on: {
          //         click: () => {
          //           this.putKnow(params.row)
          //         }
          //       }
          //     }, '添加听诊信息'),


          //     h('Button', {
          //       props: {
          //         type: 'primary',
          //         size: 'small'

          //       },
          //       style: {
          //         marginRight: '10px'
          //       },
          //       on: {
          //         click: () => {
          //           this.lookvance(params.row)
          //         }
          //       }
          //     }, '查看'),

          //   ])
          // }
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
    ...mapMutations(["addTag"]),

    downTemplate () {
      window.location.href = "https://api.warmhealth.com.cn/患者信息导入示例模板.xlsx"
    },
    onclikload () {
      this.downshow = true
    },
    loadbulr () {
      this.changeload = `http://www.luntech.net:7777/${this.download.changeload}?t1=HaiSong&t2=E10ADC3949BA59ABBE56E057F20F883E&t3=c1`
    },
    downbulr () {
      console.log(this.download.changedown);
      this.changedown = `http://www.luntech.net:7777/${this.download.changedown}?t1=HaiSong&t2=E10ADC3949BA59ABBE56E057F20F883E&t3=c2`
    },

    putreg (type, row) {
      if (type == 1) {
        bindingRegister({ user_id: row.id }).then(res => {
          if (res.data.code == 200) {
            this.$Message.success('绑定用户成功');
            this.getList()
          } else {
            this.$Message.error(`用户身份不全  ${res.data.data}`);
          }
        })
      } else {
        putUserInfo({ user_id: row.id }).then(res => {
          if (res.data.code == 200) {
            this.$Message.success('更新用户成功');
            this.getList()
          } else {
            this.$Message.error(`用户身份不全  ${res.data.data}`);
          }
        })
      }
    },
    addevent (row) {
      this.modal6 = true
      this.typetitle = '强制绑定用户'
      this.formValidate.user_id = row.id
      this.formValidate.device_type = ''
      this.formValidate.device_sn = ''
    },

    putdevice (type, row) {
      if (type == 1) {
        this.modal6 = true
        this.typetitle = '绑定肺功能仪器'
        this.formValidate.user_id = row.id
        this.formValidate.device_type = ''
        this.formValidate.device_sn = ''

      } else {
        this.modal6 = true
        this.typetitle = '修改肺功能仪器'
        this.formValidate.user_id = row.id
        this.formValidate.device_type = row.device_type
        this.formValidate.device_sn = row.device_sn
      }
    },

    VCstartdate (val) {

      this.fvcValidate.start_date = val
    },
    VCenddate (val) {
      this.fvcValidate.end_date = val

    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.typetitle == '绑定肺功能仪器') {
            bindDevice(this.formValidate).then(res => {
              if (res.data.code == 200) {
                this.$Message.success('绑定肺功能仪器成功');
                this.getList()
                this.modal6 = false
              } else {
                this.$Message.error(`${res.data.msg}`);
              }
            })

          } else if (this.typetitle == '强制绑定用户') {

            forcebind(this.formValidate).then(res => {
              if (res.data.code == 200) {
                this.$Message.success('绑定肺功能仪器成功');
                this.getList()
                this.modal6 = false
              } else {
                this.$Message.error(`${res.data.msg}`);
              }
            })

          }
          else {
            unbindDevice(this.formValidate).then(res => {
              if (res.data.code == 200) {
                this.$Message.success('解除肺功能仪器成功');
                this.getList()
                this.modal6 = false
              } else {
                this.$Message.error(`${res.data.msg}`);
              }
            })
          }
        }
      })
    },
    predicted (index, row) {
      predictedvalueOne({ user_id: row.id }).then(res => {
        if (res.data.code == 200) {
          this.$Message.success('您已成功获取肺功能预计值，请去肺功能模块查看');
        } else {
          this.$Message.error(`${res.data.msg}`);
        }
      })
    },
    predictedvalue (index, row) {
      predictedvalueTow({ user_id: row.id }).then(res => {
        if (res.data.code == 200) {
          this.$Message.success('您已成功获取肺功能预计值，请去肺功能模块查看');
        } else {
          this.$Message.error(`${res.data.msg}`);

        }
      })
    },
    FVCTest (row) {
      this.fvcValidate.start_date = ''
      this.fvcValidate.end_date = ''
      this.fvcValidate.user_id = row.id
      this.fvcshow = true

      this.fvctitle = '获取FVC测量数据'
    },
    FVCdaily (row) {
      this.fvcValidate.start_date = ''
      this.fvcValidate.end_date = ''
      this.fvcValidate.user_id = row.id
      this.fvcshow = true
      this.fvctitle = '获取FVC检查日报告'
    },

    fvcSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.fvctitle == '获取FVC测量数据') {
            getFVCTestData(this.fvcValidate).then(res => {
              if (res.data.code == 200) {
                if (res.data.data == '暂无数据') {
                  this.$Message.error('您选择的时间段暂无数据');
                } else {
                  this.$Message.success('成功获取FVC测量数据');
                  this.fvcshow = false
                }
              } else {
                this.$Message.error(`填写的参数不正确`);
              }

            })

          } else {
            getFVCdailyreport(this.fvcValidate).then(res => {
              if (res.data.code == 200) {
                if (res.data.data == '暂无数据') {
                  this.$Message.error('您选择的时间段暂无数据');
                } else {
                  this.$Message.success('成功获取FVC测量数据');
                  this.fvcshow = false
                }
              } else {
                this.$Message.error(`填写的参数不正确`);
              }

            })
          }
        }
      })
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
      let { data } = await userList(this.form)
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
    onloads () {
      this.$Message.info('请输入参数值！');
    },
    async ok () {
      if (this.exportData.start_time == '' || this.exportData.end_time == '') {
        this.$Message.info('请选择导出时间段！');
        return;
      }
      this.exportLoading = true
      let { data } = await userExport(this.exportData)
      if (data.code == '200') {
        let arr = data.data
        const params = {
          title: ['ID', '患者姓名', '手机号', '性别', '年龄', '联系地址', '微信名称', '注册时间'],
          key: ['id', 'realname', 'mobile', 'gender', 'age', 'address', 'nickName', 'reg_time'],
          data: arr,
          autoWidth: true,
          filename: '患者信息'
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
      let { data } = await leadUser(this.arrData)
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
    putKnow (row) {
      const route = {
        name: "addauscl",
        meta: {
          title: ` 添加听诊信息`
        },
        query: {
          id: row.id,
          name: row.nickName
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
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
    setvance (row) {
      this.vancemodel = true
      this.vanceform = row.id
    },
    vance (id) {
      auditStatus(this.vanceform).then(res => {
        this.$Message.success('审核信息成功')
        this.getList()
      })
    },
    lookvance (row) {
      this.promodel = true
      getUserDetalis({ user_id: row.id }).then(res => {
        this.projectForm = res.data.data
        this.uploadList = [{ name: '学历照片', url: res.data.data.edu_img },
        { name: '职业医师证', url: res.data.data.occ_physician_img },
        { name: '医师注册证', url: res.data.data.reg_img },
        { name: '签字照片', url: res.data.data.sign_img }]
      })
    },
    handleView (url) {
      this.visible = true
      this.pageImages = url
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
.Fromlist /deep/ .ivu-input {
  border: 1px solid #ffffff;
  color: blue;
}
</style>
