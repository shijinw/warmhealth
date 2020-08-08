<template>
  <div>
    <Card style="min-height: 80vh;">
      <div class="bs-btns">
        <Button type="primary" icon="ios-add" @click="addShow">新增游戏</Button>
      </div>

      <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="id">
          <span>{{ row.id }}</span>
        </template>
        <template slot-scope="{ row }" slot="gameName">
          <strong>{{ row.gameName }}</strong>
        </template>
        <template slot-scope="{ row }" slot="gameType">
          <span>{{ row.gameType == '1' ? '听' : row.gameType == '2' ? '说' : '认读' }}</span>
        </template>
        <template slot-scope="{ row }" slot="version">
          <span>{{ row.version }}</span>
        </template>
        <template slot-scope="{ row }" slot="isPublish">
          <span :style="{color: row.isPublish == '0' ? '#19be6b' : '#ed4014'}">{{ row.isPublish == "0" ? "上架" : "下架" }}</span>
        </template>
        <template slot-scope="{ row }" slot="updateTime">
          <span>{{ row.updateTime | getDateTime }}</span>
        </template>
        <template slot-scope="{ row }" slot="updatePerson">
          <span>{{ row.updatePerson }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="edit(row, index)">修 改</Button>
        </template>
      </Table>
      <div style="text-align: right; margin-top: 16px;">
        <Page
          :total="total"
          show-sizer
          show-elevator
          show-total
          :page-size-opts="pageSizeOpts"
          :page-size="form.pageSize"
          :current="form.pageNo"
          @on-change="pageOnChange"
          @on-page-size-change="pageSizeOnChange" />
      </div>
      <!-- 游戏新增 -->
      <Modal
        v-model="modal"
        :title="title"
        width="640"
        :mask-closable="false"
        :styles="{top: '20px'}"
        @on-cancel="closeModal('formValidate')"
        :footer-hide="true">
        <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="100">
          <Row>
            <Col span="12">
              <FormItem label="游戏名称" prop="gameName">
                <Input v-model="formData.gameName" :maxlength="15" placeholder="游戏名称"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="游戏类型" prop="gameType">
                <Select v-model="formData.gameType" placeholder="选择游戏类型">
                  <Option value="1">听</Option>
                  <Option value="2">说</Option>
                  <Option value="3">认读</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="游戏封面" prop="gameCoverUrl">
                <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :on-format-error="handleFormatError"
                  :before-upload="handleBeforeUpload"
                  :data="myData"
                  type="drag"
                  action="http://interface.xuexi8.net/jiekou2/index.php?c=FunLearning&a=uploadFileToAliOSS"
                  style="display: inline-block; width:58px;">
                  <div style="width: 58px; height:58px; line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Input v-model="formData.gameCoverUrl" style="display: none;"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="玩法介绍" prop="imgUrl">
                <div class="demo-upload-list" v-for="(item, index) in uploadList2" :key="index">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                <Upload
                  ref="upload2"
                  :show-upload-list="false"
                  :default-file-list="defaultList2"
                  :on-success="handleSuccess2"
                  :format="['jpg','jpeg','png']"
                  :on-format-error="handleFormatError"
                  :before-upload="handleBeforeUpload"
                  type="drag"
                  :data="myData"
                  action="http://interface.xuexi8.net/jiekou2/index.php?c=FunLearning&a=uploadFileToAliOSS"
                  style="display: inline-block; width:58px;">
                  <div style="width: 58px; height:58px; line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Input v-model="formData.imgUrl" style="display: none;"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="资源包上传" prop="resourcePath">
                <Input v-model="formData.resourcePath" style="display: none;"></Input>
                <Upload
                  ref="upload3"
                  type="drag"
                  :data="myData"
                  :default-file-list="defaultList3"
                  :show-upload-list="false"
                  :on-success="handleSuccess3"
                  :format="['zip']"
                  :on-format-error="handleFormatError3"
                  :before-upload="handleBeforeUpload"
                  action="http://interface.xuexi8.net/jiekou2/index.php?c=FunLearning&a=uploadFileToAliOSS">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击或拖拽上传ZIP格式的资源包</p>
                  </div>
                </Upload>
                <Alert type="info" v-if="uploadList3.length > 0" show-icon closable @on-close="handleRemove3" style="margin-top: 8px;">
                  当前已上传资源包
                  <span slot="desc">{{ uploadList3[0].name }}</span>
                </Alert>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="游戏状态" prop="isPublish">
                <RadioGroup v-model="formData.isPublish">
                  <Radio label="0">上架</Radio>
                  <Radio label="1">下架</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="12">
            </Col>
          </Row>

          <Row>
            <Col span="24">
              <FormItem label="游戏备注" prop="gameIntroduct">
                <Input v-model="formData.gameIntroduct" :maxlength="300" type="textarea" :autosize="{ minRows: 3, maxRows: 10 }" placeholder="填写游戏备注"></Input>
                <div style="color: #666; text-align: right;">{{ formData.gameIntroduct ? formData.gameIntroduct.length : 0 }} / 300</div>
              </FormItem>
            </Col>
          </Row>

          <FormItem>
            <Button type="primary" :loading="loading" v-if="title == '新增游戏'" @click="handleSubmit('formValidate')">新 增</Button>
            <Button type="primary" :loading="loading" v-if="title == '修改游戏'" @click="handleSubmit2('formValidate')">修 改</Button>
            <Button @click="closeModal('formValidate')" style="margin-left: 8px">关 闭</Button>
          </FormItem>
      </Form>
      </Modal>

      <!-- 图片预览 -->
      <Modal title="图片预览" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
    </Card>
  </div>
</template>

<script>
import { queryGameByWhere, insertGame, updateGameById } from '@/api/game'
export default {
  name: 'game_page',
  data () {
    return {
      modal: false,
      visible: false, // 图片预览状态
      imgUrl: '', // 预览图片的连接
      defaultList: [], // 游戏封面默认列表
      uploadList: [], // 游戏封面已上传列表
      defaultList2: [], // 游戏图片默认列表
      uploadList2: [], // 游戏图片已上传列表
      defaultList3: [], // 游戏资源包默认列表
      uploadList3: [], // 游戏资源包已上传列表
      loading: false,
      title: '新增游戏',
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      form: {
        pageSize: 10,
        pageNo: 1
      },
      columns: [
        {
          title: '游戏ID',
          slot: 'id',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '游戏名称',
          slot: 'gameName',
          tooltip: true,
          align: 'center',
          minWidth: 120
        },
        {
          title: '游戏类型',
          slot: 'gameType',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '版本号',
          slot: 'version',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '游戏状态',
          slot: 'isPublish',
          tooltip: true,
          align: 'center',
          minWidth: 100
        },
        {
          title: '更新时间',
          slot: 'updateTime',
          tooltip: true,
          align: 'center',
          minWidth: 135
        },
        {
          title: '更新人',
          slot: 'updatePerson',
          tooltip: true,
          align: 'center',
          minWidth: 80
        },
        {
          title: '操作',
          slot: 'action',
          width: 80,
          align: 'center'
        }
      ],
      tableData: [],
      formData: {
        gameName: '',
        gameType: '1',
        gameCoverUrl: '',
        imgUrl: '',
        resourcePath: '',
        isPublish: '0',
        gameIntroduct: ''
      },
      ruleValidate: {
        gameName: [
            { required: true, message: '请输入游戏名称', trigger: 'blur' }
        ],
        gameType: [
            { required: true, message: '请选择游戏类型', trigger: 'change' }
        ],
        gameCoverUrl: [
            { required: true, message: '请上传封面图片' }
        ],
        imgUrl: [
            { required: true, message: '请上传游戏图片' }
        ],
        resourcePath: [
            { required: true, message: '请上传游戏资源包' }
        ],
        isPublish: [
            { required: true, message: '请选择游戏状态', trigger: 'change' }
        ],
        gameIntroduct: [
            { required: true, message: '请填写游戏备注', trigger: 'blur' }
        ]
      },
      myData: {
        fileName: 'file',
        fileType: 1,
        fileSize: 0
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 预览图片
    handleView (url) {
      this.imgUrl = url;
      this.visible = true;
    },
    // 从上传列表中删除图片（游戏封面）
    handleRemove (file) {
      this.uploadList = []
      this.formData.gameCoverUrl = ''
    },
    // 上传成功回调函数（游戏封面）
    handleSuccess (res, file) {
      if (res.errorCode == '0') {
        this.uploadList = [{url: res.data.absolute_path, name: file.name, status: 'finished'}]
        this.formData.gameCoverUrl = res.data.absolute_path
      } else {
        this.$Notice.warning({
          title: '提示',
          desc: res.msg
        });
      }
    },
    // 上传验证函数（游戏封面 or 游戏图片）
    handleFormatError (file) {
      console.log(file)
      this.$Notice.warning({
        title: '提示',
        desc: file.name + ' 不是图片类型, 只能上传 jpg or png！'
      });
    },
    // 从上传列表中删除图片（游戏图片）
    handleRemove2 (file) {
      this.uploadList2 = []
      this.formData.imgUrl = ''
    },
    // 上传成功回调函数（游戏图片）
    handleSuccess2 (res, file) {
      if (res.errorCode == '0') {
        this.uploadList2 = [{url: res.data.absolute_path, name: file.name, status: 'finished'}]
        this.formData.imgUrl = res.data.absolute_path
      } else {
        this.$Notice.warning({
          title: '提示',
          desc: res.msg
        });
      }
    },
    // 从上传列表中删除（游戏资源包）
    handleRemove3 () {
      this.uploadList3 = []
      this.formData.resourcePath = ''
    },
    // 上传成功回调函数（游戏资源包）
    handleSuccess3 (res, file) {
      if (res.errorCode == '0') {
        this.uploadList3 = [{url: res.data.absolute_path, name: file.name, status: 'finished'}]
        this.formData.resourcePath = res.data.absolute_path
      } else {
        this.$Notice.warning({
          title: '提示',
          desc: res.msg
        });
      }
    },
    // 上传验证函数（游戏资源包）
    handleFormatError3 (file) {
      this.$Notice.warning({
        title: '提示',
        desc: file.name + ' 不是 zip 格式资源包, 只能上传 zip！'
      });
    },
    async handleBeforeUpload (file) {
      let fileType = file.name.split('.')[1]
      this.myData.fileSize = file.size
      if (fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg') {
        this.myData.fileType = 1
      } else if (fileType == 'mp3' || fileType == 'flac') {
        this.myData.fileType = 2
      } else if (fileType == 'mp4' || fileType == 'mkv') {
        this.myData.fileType = 3
      } else if (fileType == 'docx' || fileType == 'xlsx' || fileType == 'pdf' || fileType == 'zip') {
        this.myData.fileType = 4
      }
    },
    // 获取列表
    async getList () {
      let { data } = await queryGameByWhere(this.form)
      if (data.code == '200') {
        this.tableData = data.result.rows
        this.total = data.result.totalCount
      }
    },
    // 编辑
    edit (row, index) {
      this.title = '修改游戏'
      let obj = Object.assign({}, row)
      let imgArr =  obj.gameCoverUrl.split('/')
      this.uploadList = [{url: obj.gameCoverUrl, name: imgArr[imgArr.length - 1], status: 'finished'}]
      let imgArr2 =  obj.imgUrl.split('/')
      this.uploadList2 = [{url: obj.imgUrl, name: imgArr2[imgArr2.length - 1], status: 'finished'}]
      let imgArr3 =  obj.resourcePath.split('/')
      this.uploadList3 = [{url: obj.resourcePath, name: imgArr3[imgArr3.length - 1], status: 'finished'}]
      this.formData.gameName = obj.gameName
      this.formData.gameType = obj.gameType
      this.formData.gameCoverUrl = obj.gameCoverUrl
      this.formData.gameIntroduct = obj.gameIntroduct
      this.formData.imgUrl = obj.imgUrl
      this.formData.isPublish = obj.isPublish
      this.formData.resourcePath = obj.resourcePath
      this.formData.id = obj.id
      this.modal = true
    },
    // 切换分页
    pageOnChange (val) {
      this.form.pageNo = val
      this.getList()
    },
    // 切换条数
    pageSizeOnChange (val) {
      this.form.pageSize = val
      this.getList()
    },
    // 显示新增弹框
    addShow () {
      this.title = '新增游戏'
      this.modal = true
    },
    // 关闭弹框
    closeModal (name) {
      this.handleReset(name)
      this.formData.gameType = '1'
      this.formData.isPublish = '0'
      this.uploadList = []
      this.uploadList2 = []
      this.uploadList3 = []
      this.modal = false
    },
    // 新增保存
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let { data } = await insertGame(this.formData)
          if (data.code == '200') {
            this.$Message.success('新增成功!');
            setTimeout(() => {
              this.loading = false
              this.closeModal('formValidate')
              this.getList()
            }, 2000)
          } else {
            this.loading = false
            this.$Message.error(data.error);
          }
        } else {
          this.$Message.error('表单信息不完整或不合法!');
        }
      })
    },
    // 修改保存
    handleSubmit2 (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let { data } = await updateGameById(this.formData)
          if (data.code == '200') {
            this.$Message.success('修改成功!');
            setTimeout(() => {
              this.loading = false
              this.closeModal('formValidate')
              this.getList()
            }, 2000)
          } else {
            this.loading = false
            this.$Message.error(data.error);
          }
        } else {
          this.$Message.error('表单信息不完整或不合法!');
        }
      })
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style lang="less">
.bs-btns {
  text-align: right;
}
</style>
