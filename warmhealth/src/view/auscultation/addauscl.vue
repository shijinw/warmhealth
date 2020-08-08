<template>
  <div>
    <Card style="width: 100%;">
      <p slot="title">添加听诊信息--{{$route.query.name}} </p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <!-- <Row>
          <Col :span="12">
               <FormItem label="接诊类型" prop="types">
          <Select v-model="formValidate.types" style="width:300px" clearable>
            <Option v-for="item in typelist" :value="item.id" :key="item.id">{{ item.title }}</Option>
          </Select>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择接诊类型</p>
          </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="医院科室" props="uploadList" >
                <Cascader :data="docData" v-model="formValidate.uploadList" style="width:300px"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：医院科室联动</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
               <FormItem label="发病日期" prop="case_date">
             <DatePicker type="date"  format="yyyy-MM-dd HH:mm" @on-change="changeval" placeholder="发病日期" style="width: 300px"></DatePicker>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：发病日期</p>
          </FormItem>
         </Col>
          <Col :span="12">
          <FormItem label="主 诉" prop="case_title">
              <Input v-model="formValidate.case_title" style="width:300px" placeholder="主诉"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：可以主诉信息</p>
        </FormItem>
           </Col>
        </Row> -->
     <Row>
          <Col :span="12">
            <FormItem label="记录人" >
                        <Input v-model="formValidate.record_personnel" style="width:300px" placeholder="记录人"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：填写记录人</p>
          </FormItem>
         </Col>
          <Col :span="12">
          <FormItem label="审核人">
              <Input v-model="formValidate.auditor" style="width:300px" placeholder="审核人"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：填写审核人</p>
        </FormItem>
           </Col>
        </Row>

         <Row>
          <Col :span="12">
            <FormItem label="报告人" >
                        <Input v-model="formValidate.reporter" style="width:300px" placeholder="报告人"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：填写报告人</p>
          </FormItem>
         </Col>

        </Row>

        <FormItem label="诊断详情" >
          <Input v-model="formValidate.medical_info" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="诊断详情"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：可以填写诊断详情</p>
        </FormItem>
        <FormItem label="	诊断信息" >
          <Input v-model="formValidate.diagnosis" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="诊断信息"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：可以填写诊断信息</p>
        </FormItem>
          <Row>
          <Col :span="12">
            <FormItem label="设备号" prop="device_num">
                        <Input v-model="formValidate.device_num" style="width:300px" placeholder="设备号"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入设备号</p>
          </FormItem>
         </Col>
          <Col :span="12">
          <FormItem label="文件夹" prop="folder">
              <Input v-model="formValidate.folder" style="width:300px" placeholder="文件夹"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入文件夹</p>
        </FormItem>
           </Col>
        </Row>
          <FormItem label="上传音频听诊信息" :label-width="120">
                <Upload
                  ref="upmp3"
                 multiple
                  :action="uplodapath"
                  :on-format-error="handleFormatError"
                  :on-success="handleSu"
                   :format="['dat','mp3']">
        <Button icon="ios-cloud-upload-outline">上传音频听诊信息</Button>
    </Upload>
            <div  class="upaudio"  v-for="(val,key) in clalist" :key="key" >
              <p style="font-size:15px;font-weight: 600;color: #e76d6d;">{{val.auscultation_position}}</p>
              <audio :src="val.t_file_url" controls></audio>
              <Row>
          <Col :span="10">
              <FormItem >
              <Input  type="textarea" :autosize="{minRows: 2,maxRows: 10}" v-model="val.case_result" style="width:400px" placeholder="诊断信息"></Input>
               </FormItem>
              </Col>
           <Col :span="14" style="display: flex;justify-content: center;">
     <div  class="demo-upload-list" v-for="item in val.t_image_url" :key="item.url">
        <template>
            <img :src="item.url" >
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
            </div>
        </template>

    </div>

    <Upload
        ref="upload"
        :format="['jpg','jpeg','png']"
        :action="uplodImage"
      :show-upload-list="false"
      :data="{id:key}"
      :on-format-error="handleFormatError"
         :on-success="handleSuccess"
        type="drag"
        name='image'
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
      </Col>
      </Row>
           </div>
        </FormItem>
        <FormItem>
          <div style="text-align: center;">
            <Button @click="handleReset('formValidate')">重置</Button>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">添加信息</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
     <Modal title="查看图片" v-model="visible">
        <img :src="pageImages" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import { userList   } from '@/api/patient'
import { hospitalList ,addAuscultationOne  } from '@/api/patient'

import config from '@/config'
export default {
  data () {
    return {
      uplodapath: '/upload/Index/uploadFile',
      uplodImage:'',
      visible: false,
      pageImages:'',
      titleList: [],
      docData:[],
      clalist:[],
      imgUrl: '',
      editorSetting: { // 配置富文本编辑器高
        height: 500,
        width: 600
      },
      formValidate: {
         user_id:'',
        hospital_id:'',
       doctor_id:'',
        department_id:'',
        types:'',
         case_date:'',
        case_title:'',
         summary_info:'',
         medical_info:'',
         diagnosis:'',
         record_personnel:'',
         device_num:'',
         folder:'',
         auditor:'',
         reporter:'',
         auscultation_str:'',
      },
         uploadList:[],

        typelist:[
        {id:1,title:'出诊'},
        {id:2,title:'复诊'},
        {id:3,title:'急诊'}
      ],
      ruleValidate: {

        device_num: [
          { required: true, message: '该项不能填空，请注意',  }
        ],
        folder: [
          { required: true, message: '该项不能填空，请注意', }
        ],

        doctor_id: [
          { required: true, message: '该项不能填空，请注意',  }
        ],
        uploadList: [
          { required: true, message: '该项不能填空，请注意', }
        ],
        types: [
          { required: true, message: '该项不能填空，请注意' }
        ],
           case_date: [
          { required: true, message: '该项不能填空，请注意', }
        ],
        case_title: [
          { required: true, message: '该项不能填空，请注意' }
        ],

        summary_info: [
          { required: true, message: '该项不能填空，请注意', }
        ],
        medical_info: [
          { required: true, message: '该项不能填空，请注意',  }
        ],
        diagnosis: [
          { required: true, message: '该项不能填空，请注意' }
        ],
          record_personnel: [
          { required: true, message: '该项不能填空，请注意', }
        ],
        auditor: [
          { required: true, message: '该项不能填空，请注意', }
        ],
        reporter: [
          { required: true, message: '该项不能填空，请注意' }
        ],
          auscultation_str: [
          { required: true, message: '该项不能填空，请注意' }
        ]
      }
    }
  },

  watch: {

  },
  methods: {


    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式验证',
        desc: '文件 “' + file.name + '” 格式错误, 请上传 dat格式.'
      })
    },

    handleView(val){
      this.visible=true
       this.pageImages=val
    },

 handleSu (res, file) {

   let obj={}
   obj.t_image_url=[]
   obj.auscultation_position=res.data.auscultation_position
   obj.case_result=''
   obj.t_file_url=res.data.file_url
     this.clalist.push(obj)
     },
 handleSuccess (res, file,fileList,key) {
               let obj={}
               obj.name='1'
               obj.url=res.data.image_url
       this.clalist[res.data.id].t_image_url.push(obj)
            },


    handleSubmit (name) {
     this.formValidate.user_id=this.$route.query.id
     let arr=[]
     this.clalist.forEach(e=>{

         let obj={}
         obj.case_result=e.case_result
         obj.t_file_url=e.t_file_url
         obj.t_image_url= e.t_image_url[0]?e.t_image_url[0].url:''
         arr.push(obj)
     })


        if(arr[0]){
             this.formValidate.auscultation_str=JSON.stringify(arr)
              this.$refs[name].validate((valid) => {
                    if (valid) {
          addAuscultationOne(this.formValidate).then(res=>{
              this.$Message.success('听诊信息添加成功!')
              this.$router.push({name:'patient_page'})
          })
         }
            })
        }else {
                   this.$Message.error('请上传听诊信息!');
            }

    },



    getuserList(){
     userList({limit:999,page:1}).then(res=>{
        let rep=res.data
        this.titleList=rep.data.data
     })
    },
    changeval(val){
     this.formValidate.case_date=val
    },
     gethospital(){
     hospitalList({limit:999,page:1}).then(res=>{
        let rep=res.data
        this.docData=rep.data.data
     })
    },

  },
  mounted () {
    this.getuserList()
    this.gethospital()
    this.uplodapath = 'https://wmcapi.warmhealth.com.cn/upload/Index/uploadFile'
     this.uplodImage = 'https://wmcapi.warmhealth.com.cn/upload/Index/tzUploadImage'
  }
}
</script>

<style lang="less">
.demo-upload-list{
    display: inline-block;
    width: 80px;
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

.upaudio{
  width: 100%;
  height: 11rem;

}

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
</style>
