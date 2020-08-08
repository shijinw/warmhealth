<template>
  <div>
    <Card>
       <div style="margin-bottom: 20px;">
        <Button type='primary' @click="Addbooks" style="margin-left: 20px;">添加科室</Button>
       </div>

        <p slot="title">科室列表</p>
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
          <FormItem label="科室"
                    prop="department_name">
            <Input v-model="projectForm.department_name"
                   placeholder="请输入科室"></Input>
          </FormItem>

          <FormItem>
            <div style="text-align: right;">

              <Button type="primary"
                      @click="handleSubmit">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
 </Modal>
  </div>
</template>
<script>
import { departmentList ,addDepartment ,putDepartment  } from '@/api/hospital'
import Fomat from '@/libs/format.js' // 自定义验证

export default {
  data () {
    return {
      data: [],
      modal:false,
      title:'',
      projectForm:{
       id:'',
       department_name:''
      },
      fromdata:{
        limit:10,
        page:1,
        keyworld:''
      },
       ruleProject: {
        department_name: [
          { required: true, message: '该项为必填字段', trigger: 'blur' }
        ],


      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 70,
          tooltip: true,
          align: 'center'
        },
        {
          title: '科室',
          key: 'department_name',
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
      departmentList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    },

    handleReset(name){
this.$refs[name].resetFields();
      this.$Message.success("重置成功，请重新输入");
    },
    handleSubmit(){
 if(this.title='添加科室'){
        this.$refs.projectForm.validate(valid => {
          addDepartment(this.projectForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("添加成功，请核对信息");
              this.modal = false;
              this.getData(this.fromdata)
            }
          });
      });
 }else if(this.title='修改科室'){
     this.$refs.projectForm.validate(valid => {
          putDepartment(this.projectForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("修改成功，请核对信息");
              this.modal = false;
              this.getData(this.fromdata)
            }
          });
      });
 }
    },
    Addbooks () {
     this.modal=true
     this.title='添加科室'
     this.projectForm={}
    },
    putKnow (row) {
        this.modal=true
        this.title='修改科室'
        this.projectForm.department_name=row.department_name
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
  }
}
</script>
