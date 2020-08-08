<template>
  <div>
    <Card>
        <Row>
        <Col span="24">
          <Form  inline label-position="right" :label-width="100">
            <FormItem label="电话号码" >
          <Input type="text" v-model="fromdata.mobile" clearable placeholder="电话号码" style="width: 200px;margin-left:15px"></Input>
            </FormItem>
            <FormItem label="患者名" >
           <Input type="text" v-model="fromdata.realname" clearable placeholder="患者名" style="width: 200px;margin-left:15px"></Input>
            </FormItem>

            <FormItem label="测量开始时间" prop="start_time">
           <DatePicker v-model="fromdata.start_time" style="width:200px;margin-left:15px" type="date" placeholder="听诊开始时间" ></DatePicker>
            </FormItem>
            <FormItem label="测量结束时间" prop="end_time">
           <DatePicker v-model="fromdata.end_time" style="width:200px;margin-left:15px" type="date" placeholder="听诊结束时间" ></DatePicker>
            </FormItem>
              <FormItem label="设备号" >
           <Input type="text" v-model="fromdata.device_type" clearable placeholder="设备号" style="width: 200px;margin-left:15px"></Input>
            </FormItem>
            <FormItem label="设备序列号" >
          <Input type="text" v-model="fromdata.device_sn" clearable placeholder="设备序列号" style="width: 200px;margin-left:15px"></Input>
            </FormItem>
          </Form>
        </Col>
      </Row>
 <div style="margin-bottom: 20px;">
            <Button type='primary' @click="lookchak" style="margin-left: 30px;">查询</Button>
       </div>
        <p slot="title">FVC预计值列表</p>
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
           title="详细信息"
           width="800"
           :footer-hide="true">
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
             <Input v-model="projectForm.birthday"  readonly ></Input>
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


 </Form>

   <div style="display:flex;flex-wrap:wrap;justify-content:space-around">

          <div>
             <v-chart style="width:350px;height:250px;background:#333;margin-left:10px" :options="polar"/>
          </div>

           <div>
               <v-chart style="width:350px;height:250px;background:#333;margin-left:10px" :options="conmpolar"/>
           </div>

           <Table style="margin:50px 0;" stripe size="small" :columns="columndeatil" :data="datadetil" ></Table>
</div>
 </Modal>
  </div>
</template>
<script>
import { FVCTestLIst,FVCTestDetails  } from '@/api/patient'
import Fomat from '@/libs/format.js' // 自定义验证

export default {
  data () {

    return {
      data: [],
      modal:false,
      title:'',
     total:0,
     polar: {
       title:{
    text:'FT',
    textStyle:{
      color:'red'
    }
  },

    xAxis: {
       name: 'S',
        axisLine: {
          interval:0,
                     lineStyle: {
                         color: 'blue'
                     }
                 },
        type: 'category',

        data: []
    },
    yAxis: {
       name: 'L',
        type: 'value',
  axisLine: {
                     lineStyle: {
                         color: 'blue'
                     }
                 },


    },
    series: {
        data: [],
        type: 'line'
    },

    textStyle:{
      color:'red'
    }
      },

conmpolar:{
  title:{
    text:'Fv',
    textStyle:{
      color:'red'
    }
  },
    xAxis: {
       name: 'S',
        axisLine: {
                     lineStyle: {
                         color: 'blue'
                     }
                 },
        type: 'category',
        data: []
    },
    yAxis: {
       name: 'L',
        type: 'value',
  axisLine: {
                     lineStyle: {
                         color: 'blue'
                     }
                 },


    },
    series: {
        data: [],
        type: 'line'
    },

    textStyle:{
      color:'red'
    }
},


      projectForm:{
      },
       pageSizeOpts: [10, 30, 50, 100],
      fromdata:{
        limit:10,
        page:1,
        mobile:'',
         realname:'',
        start_time:'',
         end_time:'',
       device_type:'',
         device_sn:''
      },
       ruleProject: {
        department_name: [
          { required: true, message: '该项为必填字段', trigger: 'blur' }
        ],


      },
      datadetil:[],
       columndeatil: [

          {
          title: '参数',
          key: 'parameter',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
          {
          title: '数值',
          key: 'value',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
          {
          title: '单位',
          key: 'unit',
          minWidth: 70,
          tooltip: true,
          align: 'center'
        },
        //  {
        //   title: '百分比',
        //   key: 'percentage',
        //   minWidth: 70,
        //   tooltip: true,
        //   align: 'center'
        // },
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
          title: '真实姓名',
          key: 'realname',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
          {
          title: '电话号',
          key: 'mobile',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
          {
          title: '测量时间',
          key: 'test_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
          {
          title: '是否接受判定',
          key: 'acceptability',
          minWidth: 120,
          tooltip: true,
          align: 'center'
        },
           {
          title: '设备型号',
          key: 'device_type',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
   {
          title: '设备序列号',
          key: 'device_sn',
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
              }, '查看详细'),


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
      FVCTestLIst(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total=rep.data.total
        }
      })
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

//     handleReset(name){
// this.$refs[name].resetFields();
//       this.$Message.success("重置成功，请重新输入");
//     },
//     handleSubmit(){
//  if(this.title='添加科室'){
//         this.$refs.projectForm.validate(valid => {
//           addDepartment(this.projectForm).then(res => {
//             if (res.data.code === 200) {
//               this.$Message.success("添加成功，请核对信息");
//               this.modal = false;
//               this.getData(this.fromdata)
//             }
//           });
//       });
//  }else if(this.title='修改科室'){
//      this.$refs.projectForm.validate(valid => {
//           putDepartment(this.projectForm).then(res => {
//             if (res.data.code === 200) {
//               this.$Message.success("修改成功，请核对信息");
//               this.modal = false;
//               this.getData(this.fromdata)
//             }
//           });
//       });
//  }
//     },
//     Addbooks () {
//      this.modal=true
//      this.title='添加科室'
//      this.projectForm={}
//     },
    putKnow (row) {

        FVCTestDetails({id:row.id,user_id:row.user_id}).then(res=>{
          if(res.data.code === 200){
            this.projectForm=res.data.data.user_info
            this.datadetil=res.data.data.data
            this.polar.series.data=res.data.data.ft
            this.conmpolar.series.data=res.data.data.fv
            let Xdata=[]
            let comdata=[]
            if(res.data.data.ft.length<=100){
                 for (let index = 0; index < res.data.data.ft.length; index++) {
                    Xdata.push(`${index*20/1000}`)
                 }
        //         for(var i=0; i<Xdata.length; i++){
        //                 for(var j=i+1; j<Xdata.length; j++){
        //                if(Xdata[i]==Xdata[j]){
        //                  Xdata.splice(j,1,'');

        //         }
        //     }
        // }
            }else{
               for (let index = 0; index < res.data.data.ft.length; index++) {
                    Xdata.push(`${(index*40/1000)}`)
                 }
          //             for(var i=0; i<Xdata.length; i++){
          //               for(var j=i+1; j<Xdata.length; j++){
          //              if(Xdata[i]==Xdata[j]){
          //                Xdata.splice(j,1,'');

          //          }
          //      }
          //  }
            }

    if(res.data.data.fv.length<=100){
                 for (let index = 0; index < res.data.data.fv.length; index++) {
                    comdata.push(`${(index*20/1000)}`)
                 }
        //         for(var i=0; i<comdata.length; i++){
        //                 for(var j=i+1; j<comdata.length; j++){
        //                if(comdata[i]==comdata[j]){
        //                  comdata.splice(j,1,'');

        //         }
        //     }
        // }
            }else{
               for (let index = 0; index < res.data.data.fv.length; index++) {
                    comdata.push(`${(index*40/1000)}`)
                 }
          //             for(var i=0; i<comdata.length; i++){
          //               for(var j=i+1; j<comdata.length; j++){
          //              if(comdata[i]==comdata[j]){
          //                comdata.splice(j,1,'');

          //          }
          //      }
          //  }
            }
          console.log(comdata);
           this.conmpolar.xAxis.data=comdata
            this.polar.xAxis.data=Xdata
            }
        })

         this.modal=true
    },
//     remove(row){
// delHhospital({ id:row.id}).then(res=>{
//    if(res.data.code === 200){
//      this.$Message.error("操作成功，请核对信息");
//      this.getData(this.fromdata)
//    }
// })
//     },


  },

  mounted () {
    this.getData(this.fromdata)
  }
}
</script>
<style scoped>
  .Fromlist /deep/ .ivu-input{
      border: 1px solid #ffffff;
      color: #4f80eb
    }

  .echarts {
  width: 100%;
  height: 100%;
}
</style>
