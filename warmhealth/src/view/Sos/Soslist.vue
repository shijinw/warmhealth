<template>
  <div>
    <Card>
       <Row>
        <Col span="24">
          <Form  inline label-position="right" :label-width="100">
            <FormItem label="电话号码" >
          <Input type="text" v-model="fromdata.mobile" clearable placeholder="	电话号码" style="width: 160px;margin-left: 20px;"></Input>
            </FormItem>
          <FormItem label="呼叫人姓名">
          <Input type="text" v-model="fromdata.realname" clearable placeholder="呼叫人姓名" style="width: 160px;margin-left: 20px;"></Input>
            </FormItem>
              <FormItem label="操作人" >
          <Input type="text" v-model="fromdata.username" clearable placeholder="操作人" style="width: 160px;margin-left: 20px;"></Input>
            </FormItem>
              <FormItem label="处理状态" >
 <Select v-model="fromdata.status" style="width: 160px;margin-left: 20px;" placeholder="处理状态">
           <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
         </FormItem>
            <FormItem label="呼叫开始时间" prop="start_time">
           <DatePicker v-model="fromdata.start_time" style="width:160px;margin-left:20px" type="date" placeholder="呼叫开始时间" ></DatePicker>
            </FormItem>
            <FormItem label="呼叫结束时间" prop="end_time">
           <DatePicker v-model="fromdata.end_time" style="width:160px;margin-left:20px" type="date" placeholder="呼叫结束时间" ></DatePicker>
            </FormItem>
               </Form>
        </Col>
      </Row>
       <div style="margin-bottom: 20px;">
        <Button type='primary' @click="lookchak" style="margin-left: 30px;">查询</Button>
       </div>

        <p slot="title">急救列表</p>
        <Table stripe size="small" :columns="columns" :data="data" ></Table>

         <div style="text-align: right; margin-top: 16px;">
        <Page
          :total="total"
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
           title="患者详细信息"
           :footer-hide="true">
      <div>
        <Form class="Fromlist" ref="projectForm"
              :model="projectForm"
              :label-width="80">
              <Row>
          <Col :span="12">
          <FormItem label="呼叫人">
            <Input v-model="projectForm.realname"  readonly ></Input>
          </FormItem>

          </Col>
          <Col :span="12">
          <FormItem label="电话号">
             <Input v-model="projectForm.mobile"  readonly ></Input>
          </FormItem>
          </Col>

        </Row>
               <Row>
          <Col :span="12">
          <FormItem label="性别">
             <Input v-model="projectForm.gender==1?'男':'女'"  readonly ></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="年龄">
            <Input v-model="projectForm.age"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>
          <Row>

          <Col :span="20">
          <FormItem label="既往病史">
            <Input v-model="projectForm.medical_history"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>
               <Row>
          <Col :span="12">
          <FormItem label="药物过敏史">
             <Input v-model="projectForm.allergy_history"  readonly ></Input>
          </FormItem>
          </Col>
           <Col :span="12">
          <FormItem label="呼叫时间">
            <Input v-model="projectForm.create_time" readonly ></Input>
          </FormItem>
          </Col>

        </Row>
            <Row>
          <Col :span="12">
          <FormItem label="医生姓名">
             <Input v-model="projectForm.doctor_name"  readonly ></Input>
          </FormItem>
          </Col>
           <Col :span="12">
          <FormItem label="医生电话号">
            <Input v-model="projectForm.doctor_mobile"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>
          <Row>
          <Col :span="12">
          <FormItem label="医院名称">
             <Input v-model="projectForm.hospital_name"  readonly ></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="医院科室名">
            <Input v-model="projectForm.department_name"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>

           <Row>
          <Col :span="12">
          <FormItem label="操作人员">
             <Input v-model="projectForm.username"  readonly ></Input>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="状态">
            <Input v-model="projectForm.status"  readonly ></Input>
          </FormItem>
          </Col>
        </Row>
          <Row>
             <Col :span="20">
          <FormItem label="联系地址">
             <Input v-model="projectForm.address"  readonly style="width:300px"></Input>
          </FormItem>
          </Col>
        </Row>

        </Form>
      </div>
 </Modal>
    <Modal v-model="modal2"  title="选择处理方式" :width="400"   @on-ok="ok"  @on-cancel="cancel">
      <Form>
       <FormItem label="处理方式">
           <Select v-model="operfrom.operator_type"  placeholder="选择处理方式">
           <Option v-for="item in operList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
          </FormItem>
           <FormItem label="处理状态">
           <Select v-model="operfrom.status"  placeholder="选择处理状态">
           <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
          </FormItem>
     <FormItem label="问题反馈">
            <Input v-model="operfrom.question" style="margin-top:20px" placeholder="输入问题反馈" type="textarea" :row="3" ></Input>
          </FormItem>
   </Form>
    </Modal>
     <Modal
        title="消息提醒"
        draggable
        v-model="messat"
        width="250"
        @on-ok="meaaage"
        :styles="{top: '20px'}">
        <p>你有一条未处理事件</p>
    </Modal>
  </div>
</template>
<script>
import { getSosCount  } from '@/api/hospital'

import { sosList,getSosUserDetails,putUserSos  } from '@/api/hospital'
import Fomat from '@/libs/format.js' // 自定义验证

export default {
  data () {
    return {
      data: [],
      modal:false,
     modal2:false,
     messat:false,
     total:0,
     operfrom:{
       id:'',
       operator_type:'',
       status:'',
       question:''
     },
     Audios:'',
      title:'',
      TagsList:[],
      projectForm:{
        hospital_name:'',
        hospital_number:'',
        address:'',
        introduction:'',
        department_id:'',
        department_name:''
      },
      operList:[
      {
      id:1,name:'电话回访'
      },
      {
      id:2,name:'上门回访'
      },
      {
      id:3,name:'加急处理'
      },

      ],
      cityList:[ {
      id:1,name:'呼叫'
      },
      {
      id:2,name:'处理中'
      },
      {
      id:3,name:'完成'
      }],

       pageSizeOpts: [10, 30, 50, 100],
      fromdata:{
        limit:10,
        page:1,
        mobile:'',
        realname:'',
        username:'',
        status:1,
        start_time:'',
        end_time:''
      },
       ruleProject: {
        hospital_name: [
          { required: true, message: '该项为必填字段', trigger: 'blur' }
        ],
        address: [ { required: true, message: '该项为必填字段', trigger: 'blur' }],
        hospital_number: [
           { required: true, message: '该项为必填字段', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '该项为必填字段', trigger: 'blur' }
        ],
      department_name: [
          { required: true, message: '该项为必填字段',}
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
          minWidth: 60,
          tooltip: true,
          align: 'center'
        },
               {
          title: ' 呼叫人',
          key: 'realname',
          minWidth: 100,
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
          title: '联系地址',
          key: 'address',
          minWidth: 110,
          tooltip: true,
          align: 'center'
        },
         {
          title: '呼叫时间',
          key: 'create_time',
          minWidth: 120,
          tooltip: true,
          align: 'center'
        },
         {
          title: '呼叫次数',
          key: 'call_count',
          minWidth: 70,
          tooltip: true,
          align: 'center'
        },
        //   {
        //   title: '状态',
        //   key: 'status',
        //   minWidth: 120,
        //   tooltip: true,
        //   align: 'center'
        // },

                   {
          title: '状态',
          minWidth: 80,
          tooltip: true,
          align: 'center',
            render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status == '呼叫中') {
              text = '呼叫中'
              color = 'red'
            } else if(params.row.status == '处理中'){
              text = '处理中'
              color = 'yellow'
            } else {
                text = '完成'
              color = 'blue'
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
          title: '操作人',
          key: 'door_handle_people',
          minWidth: 80,
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
              }, '详情'),

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
                    this.remove(params.row)
                  }
                }
              }, '处理'),
            ])
          }
        }
      ]
    }
  },
  methods: {
    lookchak(){
      this.getData(this.fromdata)
    },
    getData (obj) {
      sosList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total=rep.data.total
        }
      })
    },
 meaaage(){
      this.messat=false
    },
ok(){
if(this.operfrom.operator_type&&this.operfrom.question&&this.operfrom.status){
   putUserSos({id:this.operfrom.id,operator_type:this.operfrom.operator_type,question:this.operfrom.question,status:this.operfrom.status}).then(res=>{
               this.$Message.success('反馈成功!');
 this.getData(this.fromdata)
 })
}else{
  this.$Message.error('请填写反馈信息!');
}
},
cancel(){
this.modal2=false
},


  // 切换分页
    pageOnChange (val) {
      this.fromdata.page = val
         this.getData(this.fromdata)
    },
    // 切换条数
    pageSizeOnChange (val) {
      this.fromdata.limit = val
       this.getData(this.fromdata)
    },

    putKnow (row) {
        this.modal=true
        getSosUserDetails({id:row.id}).then(res=>{
          this.projectForm=res.data.data
        })
    },
    remove(row){
      this.modal2=true
      this.operfrom.id=row.id
      this.operfrom.operator_type=row.operator_type
      this.operfrom.question=row.question
    },
  },

  mounted () {
    this.getData(this.fromdata)

        getSosCount().then(res=>{
        this.messageUnreadCount=res.data.data.num
        if(res.data.data.num){
         this.messat=true
        }
    })
   let timer= setInterval(()=>{
         getSosCount().then(res=>{
        this.messageUnreadCount=res.data.data.num
        if(res.data.data.num){
         this.messat=true
        }
    })
    },30000)

  },

}
</script>
<style scoped>
  .Fromlist /deep/ .ivu-input{
      border: 1px solid #ffffff;
      color: #4f80eb
    }
</style>
