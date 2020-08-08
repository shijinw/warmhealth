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

            <FormItem label="医院" prop="hospital_name">
              <Input type="text" v-model="form.hospital_name" clearable placeholder="医院名" style="width: 160px;"></Input>
            </FormItem>
            <FormItem label="科室" prop="department_name">
              <Input type="text" v-model="form.department_name" clearable placeholder="科室名" style="width: 160px;"></Input>
            </FormItem>

            <FormItem label="审核状态" prop="audit_status">
              <Select v-model="form.audit_status" clearable style="width: 160px;" placeholder="审核状态">
                <Option value="1">处理中</Option>
                <Option value="2">通过</Option>
                <Option value="3">拒绝</Option>
              </Select>
            </FormItem>


          </Form>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <ButtonGroup style="margin-left:15px">

           <Button style="margin-left:15px" type="primary" @click="onSeach">查 询</Button>

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
        <template slot-scope="{ row }" slot="age">
          <span>{{ row.age }}</span>
        </template>
        <template slot-scope="{ row }" slot="address">
          <span>{{ row.address }}</span>
        </template>
        <template slot-scope="{ row }" slot="nickName">
          <span>{{ row.nickName }}</span>
        </template>
        <template slot-scope="{ row }" slot="reg_time">
          <span>{{ row.reg_time | getDateTime }}</span>
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
        title="医生信息导出"
        :loading="true"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="exportData" :model="exportData" label-position="right" :label-width="120">
          <FormItem label="注册日期开始" prop="start_time">
            <DatePicker type="datetime" v-model="exportData.start_time" @on-change="handleChange22" placeholder="注册日期开始"></DatePicker>
          </FormItem>
          <FormItem label="注册日期截止" prop="end_time">
            <DatePicker type="datetime" v-model="exportData.end_time" @on-change="handleChange33" placeholder="注册日期截止"></DatePicker>
          </FormItem>
        </Form>
      </Modal>

      <Modal
        v-model="modal2"
        title="医生信息导入"
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
         <Modal v-model="vancemodel"  title="选择处理方式" :width="400"   @on-ok="vance"  >
           <RadioGroup v-model="vanceform.audit_status"  style="display:flex;justify-content: center;">
             <Radio label="2">通过</Radio>
             <Radio label="3">未通过</Radio>
    </RadioGroup>
            <Input v-if="vanceform.audit_status==2?false:true" v-model="vanceform.reason" placeholder="请填写未通过原因" style="margin-top:15px" type="textarea" />
    </Modal>
    <Modal v-model="promodel"
           title="医生详细信息"
           :footer-hide="true">
      <div>
        <Form class="Fromlist" ref="projectForm"
              :model="projectForm"
              :label-width="80">
              <Row>
                 <Col :span="12">
          <FormItem label="真实姓名:">
            <Input v-model="projectForm.realname"  readonly ></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="电话号:">
             <Input v-model="projectForm.mobile" readonly ></Input>
          </FormItem>
          </Col>

        </Row>
               <Row>
          <Col :span="12">
          <FormItem label="性别:">
             <Input v-model="projectForm.gender==1?'男':'女'"  readonly ></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="年龄:">
            <Input v-model="projectForm.age"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>


               <Row v-if="projectForm.user_type==1?true:false">
          <Col :span="12">
          <FormItem label="药物过敏史:">
             <Input v-model="projectForm.allergy_history"  readonly ></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="既往病史:">
            <Input v-model="projectForm.medical_history"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>

          <Row v-if="projectForm.user_type==1?false:true">
          <Col :span="12">
            <FormItem label="注册时间:">
            <Input v-model="projectForm.reg_time"  readonly ></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="科室名:">
            <Input v-model="projectForm.department_name"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>
   <Row>
          <Col :span="12">
          <FormItem label="审核状态:">
             <Input v-model="projectForm.audit_status"  readonly ></Input>
          </FormItem>
          </Col>
  <Col :span="12">
          <FormItem label="拒绝原因:">
             <Input v-model="projectForm.reason"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>

            <Row v-if="projectForm.user_type==1?false:true">
           <Col :span="12" v-for="item in uploadList"  :key="item.name">
          <FormItem :label="item.name">
                 <div class="demo-upload-list" >
             <template v-if="item.url">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
            </div>
            </template>
         </div>
          </FormItem>
          </Col>

        </Row>

        </Form>


      </div>
 </Modal>
  <Modal title="View Image" v-model="visible">
        <img :src="pageImages" v-if="visible" style="width: 100%">
    </Modal>
    </Card>
  </div>
</template>

<script>
import Format from '@/libs/format.js' // 自定义验证
import excel from '@/libs/excel' // excel方法
import { mapMutations } from "vuex";

import {
  doctorList,
  userExport,
  leadUser,
  getDoctorDetalis,
  auditStatus
} from '@/api/patient'
export default {
  name: 'patient_page',
  data () {
    return {
      form: {
        mobile: '',
        realname: '',
        address: '',
        gender: '',
        hospital_name:'',
        department_name:'',
        audit_status :'',
        end_time: '',
        page: 1,
        limit: 10
      },
      vanceform:{
        id:'',
        audit_status:'1',
        vanceform:''
      },
      uploadList:[],
      pageImages:'',
      visible:false,
      vancemodel:false,
      projectForm:{},
      promodel:false,
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
          key: 'id',
          tooltip: true,
          align: 'center',
          minWidth: 50
        },
        {
          title: '真实姓名',
          key: 'realname',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '手机号',
          key: 'mobile',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '医院',
          key: 'hospital_name',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '科室',
          key: 'department_name',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
                 {
           title: '审核状态',
          key: 'audit_status',
          tooltip: true,
          align: 'center',
          minWidth: 100,
            render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.audit_status == '处理中') {
              text = '处理中'
              color = 'green'
            } else if(params.row.audit_status == '通过'){
                text = '通过'
              color = 'blue'
            }else{
              text = '拒绝'
              color = 'red'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ])
          }
        },


        {
          title: '微信名称',
          key: 'nickName',
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
          title: '操作',
          key: 'is_addkonw',
          minWidth: 280,
          align: 'center',
          render: (h, params) => {

            return h('div', [


              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.setvance(params.row)
                  }
                }
              }, '审核'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.lookvance(params.row)
                  }
                }
              }, '查看'),

            ])
          }
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
      window.location.href = "https://api.warmhealth.com.cn/医生信息导入示例模板.xlsx"
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
      let { data } = await doctorList(this.form)
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
      let { data } = await userExport(this.exportData)
      if (data.code == '200') {
        let arr = data.data
        const params = {
          title: ['ID', '真实姓名', '手机号', '性别', '年龄', '联系地址', '微信名称', '注册时间'],
          key: ['id', 'realname', 'mobile', 'gender', 'age', 'address', 'nickName', 'reg_time'],
          data: arr,
          autoWidth: true,
          filename: '医生信息'
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
    putKnow(row){
      console.log(row.nickName);
      const route = {
        name: "addauscl",
        meta: {
          title: `添加听诊信息`
        },
        query: {
          id: row.id,
          name:row.nickName
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
    setvance(row){
       this.vancemodel=true
       this.vanceform.user_id=row.id
    },
    vance(id){
      if(this.vanceform.audit_status==3){
        if(this.vanceform.reason){
        auditStatus(this.vanceform).then(res=>{
        this.$Message.success('已拒绝该审核')
        this.getList()

      })
        }else{
           this.$Message.error('您需要填写审核未通过原因！')
        }

      }else {
          auditStatus(this.vanceform).then(res=>{
        this.$Message.success('审核信息成功')
         this.getList()
      })
      }

    },
    lookvance(row){
      this.promodel=true
      getDoctorDetalis({user_id:row.id}).then(res=>{
          this.projectForm=res.data.data
          this.uploadList=[{name:'学历证',url:res.data.data.edu_img},
          {name:'执业证',url:res.data.data.occ_physician_img},
          {name:'注册证',url:res.data.data.reg_img},
          {name:'签字照片',url:res.data.data.sign_img}]
      })
    },
    handleView(url){
      this.visible=true
       this.pageImages=url
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
   .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

     .Fromlist /deep/ .ivu-input{
      border: 1px solid #ffffff;
      color: #4f80eb
    }
</style>
