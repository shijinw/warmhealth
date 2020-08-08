<template>
  <div>
    <Card>
      <Row>
        <Col span="24">
        <Form inline
              label-position="right"
              :label-width="100">
          <FormItem label="电话号码">
            <Input type="text"
                   v-model="fromdata.mobile"
                   clearable
                   placeholder="电话号码"
                   style="width: 200px;margin-left:15px"></Input>
          </FormItem>
          <FormItem label="患者名">
            <Input type="text"
                   v-model="fromdata.realname"
                   clearable
                   placeholder="患者名"
                   style="width: 200px;margin-left:15px"></Input>
          </FormItem>
          <FormItem label="操作人">
            <Input type="text"
                   v-model="fromdata.username"
                   clearable
                   placeholder="操作人"
                   style="width: 200px;margin-left:15px"></Input>
          </FormItem>
          <!-- <FormItem label="处理方式" prop="user_type">
               <Select v-model="fromdata.status" style="width:200px;margin-left:15px" placeholder="请选择处理方式"  >
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
       </Select>
            </FormItem> -->

          <FormItem label="听诊开始时间"
                    prop="start_time">
            <DatePicker v-model="fromdata.start_time"
                        style="width:200px;margin-left:15px"
                        type="date"
                        placeholder="听诊开始时间"></DatePicker>
          </FormItem>
          <FormItem label="听诊结束时间"
                    prop="end_time">
            <DatePicker v-model="fromdata.end_time"
                        style="width:200px;margin-left:15px"
                        type="date"
                        placeholder="听诊结束时间"></DatePicker>
          </FormItem>
          <FormItem label="设备号">
            <Input type="text"
                   v-model="fromdata.device_num"
                   clearable
                   placeholder="设备号"
                   style="width: 200px;margin-left:15px"></Input>
          </FormItem>
          <FormItem label="文件夹号">
            <Input type="text"
                   v-model="fromdata.folder"
                   clearable
                   placeholder="文件夹号"
                   style="width: 200px;margin-left:15px"></Input>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <div style="margin-bottom: 20px;">
        <Button type='primary'
                @click="lookchak"
                style="margin-left: 30px;">查询</Button>
      </div>

      <p slot="title">数字听诊列表</p>
      <Table stripe
             size="small"
             :columns="columns"
             :data="data"></Table>

      <div style="text-align: right; margin-top: 16px;">
        <Page :total="total"
              show-sizer
              show-elevator
              show-total
              :page-size-opts="pageSizeOpts"
              :page-size="fromdata.limit"
              :current="fromdata.page"
              @on-change="pageOnChange"
              @on-page-size-change="pageSizeOnChange" />
      </div>

    </Card>

    <Modal v-model="modal"
           mask
           title="查看详细信息"
           width="800"
           :footer-hide="true">
      <Form class="Fromlist"
            ref="projectForm"
            :model="projectForm"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="患者姓名">
            <Input v-model="projectForm.realname"
                   readonly></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="电话号">
            <Input v-model="projectForm.mobile"
                   readonly></Input>
          </FormItem>
          </Col>

        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="创建时间">
            <Input v-model="projectForm.create_time"
                   readonly></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="报告人">
            <Input v-model="projectForm.reporter"
                   readonly></Input>
          </FormItem>
          </Col>

        </Row>

        <Row>
          <Col :span="12">
          <FormItem label="听诊详情">
            <Input v-model="projectForm.medical_info"
                   readonly></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="听诊结果">
            <Input v-model="projectForm.case_result"
                   readonly></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="记录人名">
            <Input v-model="projectForm.record_personnel"
                   readonly></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="审核人">
            <Input v-model="projectForm.auditor"
                   readonly></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <!-- <Col :span="12">
          <FormItem label="医院科室">
             <Input v-model="projectForm.department_name"  readonly ></Input>
          </FormItem>
          </Col> -->

        </Row>

      </Form>
      <Card>
        <List header="听诊音频数据"
              border
              size="small"
              item-layout="vertical">
          <ListItem v-for="(item,key) in auscultation_info"
                    :key="key"
                    :title="item.auscultation_code">
            <ListItemMeta :title="item.auscultation_position" />
            <div style="width:100%;height:100%;">
              <div v-show="!item.Cshow"
                   v-for="(valn,label) in item.children"
                   :key="label"
                   style="margin-top:10px;display:flex">
                <div style="flex:2;position: relative;">
                  <audio controls="controls"
                         :src="valn.auscultation_href"></audio>
                  <p style="text-indent: 15px;color: #d78b8b;">
                    <span style="color:#555">听诊报告:</span> {{valn.case_result}}</p>
                  <div class="demo-upload-list"
                       style=" position: absolute; top: 0px;right: 80px;"
                       v-if="valn.auscultation_img">
                    <template>
                      <img :src="valn.auscultation_img">
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline"
                              @click.native="handleView(valn.auscultation_img)"></Icon>
                      </div>
                    </template>

                  </div>
                  <Upload ref="upload"
                          :show-upload-list="false"
                          :data="{id:key}"
                          :action="uplodImage"
                          :on-success="handleSuccess"
                          type="drag"
                          name='image'
                          style="width:58px;position:absolute;top:0;right:10px">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="ios-camera"
                            size="20"></Icon>
                    </div>
                  </Upload>
                </div>
                <div style="display:flex;align-items: center;justify-content:center;flex:1">
                  <div style="color:#d13b42;cursor: pointer;"
                       @click="changeval(valn,key)">回复</div>
                  <div style="color:blue;cursor: pointer;"
                       @click="changes(item,key)">更多</div>
                </div>

              </div>
              <div v-show="item.Cshow"
                   style="margin-top:10px;display:flex">
                <div style="flex:2;position: relative;">
                  <audio controls="controls"
                         :src="item.children[0].auscultation_href"
                         style="flex:2"></audio>
                  <p style="text-indent: 15px;color: #d78b8b;">
                    <span style="color:#555">听诊报告:</span> {{item.children[0].case_result}}</p>

                  <div class="demo-upload-list"
                       style=" position: absolute; top: 0px;right: 80px;"
                       v-if="item.children[0].auscultation_img">
                    <template>
                      <img :src="item.children[0].auscultation_img">
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline"
                              @click.native="handleView(item.children[0].auscultation_img)"></Icon>
                      </div>
                    </template>

                  </div>
                  <Upload ref="upload"
                          :show-upload-list="false"
                          :data="{id:key}"
                          :on-success="handleSu"
                          :action="uplodImage"
                          type="drag"
                          name='image'
                          style="position:absolute;top:0;right:10px;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="ios-camera"
                            size="20"></Icon>
                    </div>
                  </Upload>
                </div>
                <div style="display:flex;align-items: center;justify-content: center;flex:1">
                  <div style="color:#d13b42;cursor: pointer;"
                       @click="changeval(item.children[0],key)">回复</div>
                  <div style="color:blue;cursor: pointer;margin-left:15px"
                       @click="changes(item,key)">更多</div>
                </div>
              </div>

            </div>
          </ListItem>
        </List>
      </Card>
    </Modal>
    <Modal v-model="ausuen"
           mask
           title="听诊音频回复"
           width="500"
           @on-ok="ausculta">
      <Input v-model="auscultation.case_result"
             placeholder="输入听诊信息"
             :rows="3"
             type="textarea" />

    </Modal>
    <Modal title="查看图片"
           v-model="visible">
      <img :src="Itemurl"
           v-if="visible"
           style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import { auscultationList, getAuscultationDeatils, puthospital, delHhospital, departmentList, putAuscultationInfo } from '@/api/hospital'

export default {
  data () {
    return {
      data: [],
      modal: false,
      modal2: false,
      visible: false,
      total: 0,
      Shows: true,
      ausuen: false,
      auscultation: {
        auscultation_info_id: '',
        case_result: '',
        auscultation_img: ''
      },
      uplodImage: '',
      Audios: '',
      title: '',
      auscultation_info: [],
      TagsList: [],
      projectForm: {
      },
      cityList: [
        { id: 1, name: '急救' },
        { id: 2, name: '处理' },
        { id: 3, name: '完成' },
      ],
      fromdata: {
        limit: 10,
        page: 1,
        mobile: '',
        realname: '',
        username: '',
        status: '',
        start_time: '',
        end_time: '',
      },
      pageSizeOpts: [10, 30, 50, 100],
      ruleProject: {
        hospital_name: [
          { required: true, message: '该项为必填字段', trigger: 'blur' }
        ],
        address: [{ required: true, message: '该项为必填字段', trigger: 'blur' }],
        hospital_number: [
          { required: true, message: '该项为必填字段', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '该项为必填字段', trigger: 'blur' }
        ],
        department_name: [
          { required: true, message: '该项为必填字段', }
        ],
      },
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id"
        },
        {
          title: "科室名",
          key: "department_name"
        },

      ],
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 70,
          tooltip: true,
          align: 'center'
        },
        {
          title: '患者名',
          key: 'realname',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mobile',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
        {
          title: '设备号',
          key: 'device_num',
          minWidth: 70,
          tooltip: true,
          align: 'center'
        },
        {
          title: '文件夹号',
          key: 'folder',
          minWidth: 110,
          tooltip: true,
          align: 'center'
        },

        {
          title: '听诊时间',
          key: 'create_time',
          minWidth: 110,
          tooltip: true,
          align: 'center'
        },
        {
          title: '操作人员',
          key: 'username',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '操作',
          key: 'is_addkonw',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {

            return h('div', [

              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.putKnow(params.row)
                  }
                }
              }, '查看'),


            ])
          }
        }
      ]
    }
  },
  methods: {
    lookchak () {
      this.getData(this.fromdata)
    },
    changeval (row, key) {
      this.auscultation.case_result = ''
      this.ausuen = true
      this.auscultation.auscultation_info_id = row.auscultation_info_id
      this.auscultation.auscultation_img = this.auscultation_info[key].children[0].auscultation_img
    },
    ausculta () {


      putAuscultationInfo(this.auscultation).then(res => {
        this.$Message.success('修改听诊数据成功');
        this.putKnow(this.projectForm)
      })
    },
    handleSuccess (res, file, fileList) {

      this.auscultation_info[res.data.id].children.forEach(e => {
        e.auscultation_img = res.data.image_url
      })
      this.auscultation.auscultation_img = res.data.image_url
      this.auscultation.auscultation_info_id = res.data.id
      putAuscultationInfo(this.auscultation).then(res => {
        this.$Message.success('修改听诊数据成功');
      })
    },
    handleSu (res, file, fileList) {
      this.auscultation_info[res.data.id].children.forEach(e => {
        e.auscultation_img = res.data.image_url
      })
      this.auscultation.auscultation_info_id = res.data.id
      this.auscultation.auscultation_img = res.data.image_url
      putAuscultationInfo(this.auscultation).then(res => {
        this.$Message.success('修改听诊数据成功');
      })
    },

    handleView (url) {
      this.Itemurl = url
      this.visible = true
    },
    pageOnChange (val) {
      this.fromdata.page = val
      this.getData(this.fromdata)
    },
    // 切换条数
    pageSizeOnChange (val) {
      this.fromdata.limit = val
      this.getData(this.fromdata)
    },

    getData (obj) {
      auscultationList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    },

    changes (item, key) {
      item.Cshow = !item.Cshow
      this.$set(this.auscultation_info, key, item)
    },
    putKnow (row) {
      this.modal = true
      getAuscultationDeatils({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code == 200) {
          this.projectForm = rep.data
          rep.data.auscultation_info.forEach(e => {
            e.Cshow = true
          });
          this.auscultation_info = Array.from(rep.data.auscultation_info)
        }
      })
    },

  },

  mounted () {
    this.getData(this.fromdata)
    this.uplodImage = 'https://wmcapi.warmhealth.com.cn/upload/Index/tzUploadImage'
  }
}
</script>
<style scoped>
.ivu-list-item-extra {
  width: 100px !important;
}

.Fromlist /deep/ .ivu-input {
  border: 1px solid #ffffff;
  color: #4f80eb;
}
</style>
