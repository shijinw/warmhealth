<template>
  <div>
    <Card>
       <div style="margin-bottom: 20px;">
          <Input type="text" v-model="fromdata.keyworld" clearable placeholder="名称、编号、地址" style="width: 160px;"></Input>
        <Button type='primary' @click="lookchak" style="margin-left: 20px;">查询</Button>
        <Button type='primary' @click="Addbooks" style="margin-left: 20px;">添加医院</Button>
       </div>

        <p slot="title">医院列表</p>
        <Table stripe size="small" :columns="columns" :data="data" ></Table>
    </Card>

     <Modal v-model="modal"
          mask
           :title="title"
           :footer-hide="true">
      <div>
        <Form ref="projectForm"
              :model="projectForm"
              :rules="ruleProject"
              :label-width="80">
          <FormItem label="医院名称"
                    prop="hospital_name">
            <Input v-model="projectForm.hospital_name"
                   placeholder="请输入医院名称"></Input>
          </FormItem>

         <FormItem label="医院编号"
                    prop="hospital_number">
            <Input v-model="projectForm.hospital_number"
                   placeholder="请输入医院编号"></Input>
          </FormItem>
                <FormItem label="选择科室" >
              <Input
                placeholder="科室名"
                v-model="projectForm.department_name"
                readonly
                style="width: 230px"
              />
              <Button type="info" @click="thers">选择</Button>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：选择科室</p>
            </FormItem>

          <FormItem label="地址">
            <Input type="text"
                   v-model="projectForm.address"
                   placeholder="地址 预留字段，可以不填"></Input>
          </FormItem>
          <FormItem label="简介">
            <Input type="textarea"
                   v-model="projectForm.introduction"
                   placeholder="简介 预留字段，可以不填"></Input>
          </FormItem>

          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset('projectForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
 </Modal>
    <Modal v-model="modal2"  title="选择科室" :width="800" :footer-hide="true">
      <div>
        <Table
          stripe
          size="small"
          :columns="columns1"
          :data="TagsList"
          @on-selection-change="selecs"
        ></Table>
      </div>
      <Button type="primary" @click="OK">确定选择</Button>
    </Modal>
  </div>
</template>
<script>
import { hospitalList, addhospital ,puthospital ,delHhospital ,departmentList ,getHospitalDetails   } from '@/api/hospital'
import Fomat from '@/libs/format.js' // 自定义验证

export default {
  data () {
    return {
      data: [],
      modal:false,
     modal2:false,
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
      fromdata:{
        limit:10,
        page:1,
        keyworld:''
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
          minWidth: 50,
          tooltip: true,
          align: 'center'
        },
        {
          title: '医院名称',
          key: 'hospital_name',
          minWidth: 110,
          tooltip: true,
          align: 'center'
        },

        {
          title: '编号',
          key: 'text',
          minWidth: 80,
          tooltip: true,
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'reg_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },

        {
          title: '医院编号',
          key: 'hospital_number',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },

        {
          title: '医院地址',
          key: 'address',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
            {
          title: '简介',
          key: 'introduction',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
        {
          title: '操作',
          key: 'is_addkonw',
          minWidth: 140,
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
                    this.putKnow(params.row)
                  }
                }
              }, '修改'),

              h('Button', {
                props: {
                  type: 'error',
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
              }, '删除'),
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
      hospitalList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
        }
      })
    },

    handleReset(name){
this.$refs[name].resetFields();
      this.$Message.success("重置成功，请重新输入");
    },
    handleSubmit(){
 if(this.title='添加医院'){
        this.$refs.projectForm.validate(valid => {
          addhospital(this.projectForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("添加成功，请核对信息");
              this.modal = false;
              this.getData(this.fromdata)
            }
          });
      });
 }else if(this.title='修改医院'){
     this.$refs.projectForm.validate(valid => {
          puthospital(this.projectForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("修改成功，请核对信息");
              this.modal = false;
              this.getData(this.fromdata)
            }
          });
      });
 }
    },
    thers() {
      this.modal2 = true;
    },
      selecs(e) {
      this.Audios = e;
    },
 OK() {
      this.modal2 = false;
      if (this.Audios.length !== 0) {
        let arr = [];
        let str = [];
        this.Audios.forEach(item => {
          arr.push(item.id);
          str.push(item.department_name);
        });
        this.projectForm.department_id = arr.join(",");
        this.projectForm.department_name = str.join(",");
      }

    },
    Addbooks () {
     this.modal=true
     this.title='添加医院'
     this.projectForm={}
    },
    putKnow (row) {
        this.modal=true
        this.title='修改医院'
       getHospitalDetails({id:row.id}).then(res=>{
              if(res.data.code==200){
                      this.projectForm=res.data.data
              }
       })


    },
    remove(row){
delHhospital({ id:row.id}).then(res=>{
   if(res.data.code === 200){
     this.$Message.error("操作成功，请核对信息");
     this.getData(this.fromdata)
   }
})
    },
  },

  mounted () {
    this.getData(this.fromdata)
    departmentList().then(res=>{
       if(res.data.code==200){
         this.TagsList=res.data.data
       }
    })
  }
}
</script>
