<template>
  <div>
    <Card style="min-height: 80vh;">
      <Row>
        <Col span="24">
          <div class="name">姓名: {{ form.username }}</div>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div class="name">性别</div>
          <div class="select-box">
            <div class="select-item" :class="[form.sex == '男' ? 'select-item-on' : '']" data-text="男">男</div>
            <div class="select-item" :class="[form.sex == '女' ? 'select-item-on' : '']" data-text="女">女</div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col span="24">
        <div class="name">年龄: {{ form.age }}　　　身高: {{ form.height }}　　　体重: {{ form.weight }}</div>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <div class="name">学历</div>
          <div class="select-box">
            <div class="select-item" :class="[form.education == '初中及以下' ? 'select-item-on' : '']" data-text="初中及以下">初中及以下</div>
            <div class="select-item" :class="[form.education == '高中' ? 'select-item-on' : '']" data-text="高中">高中</div>
            <div class="select-item" :class="[form.education == '大学' ? 'select-item-on' : '']" data-text="大学">大学</div>
            <div class="select-item" :class="[form.education == '研究生及以上' ? 'select-item-on' : '']" data-text="研究生及以上">研究生及以上</div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <div class="name">职业</div>
          <div class="select-box">
            <div class="select-item" :class="[form.occupation == '教育科研' ? 'select-item-on' : '']" data-text="教育科研">教育科研</div>
            <div class="select-item" :class="[form.occupation == '商业' ? 'select-item-on' : '']" data-text="商业">商业</div>
            <div class="select-item" :class="[form.occupation == '金融' ? 'select-item-on' : '']" data-text="金融">金融</div>
            <div class="select-item" :class="[form.occupation == '专业技术人员' ? 'select-item-on' : '']" data-text="专业技术人员">专业技术人员</div>
            <div class="select-item" :class="[form.occupation == '企业高管' ? 'select-item-on' : '']" data-text="企业高管">企业高管</div>
            <div class="select-item" :class="[form.occupation == '其他' ? 'select-item-on' : '']" data-text="其他">其他</div>
          </div>
        </Col>
      </Row>

<Row>
  <Col span="24">
    <div class="name">吸烟　　　{{ form.smoke_day }} <span style="color: #999;">根/每天</span>　　　{{ form.smoke_year }} <span style="color: #999;">年</span></div>
  </Col>
</Row>

<Row>
  <col span="24">
    <div class="name">是否饮酒</div>
    <div class="select-box">
      <div class="select-item" :class="[form.drink == '是' ? 'select-item-on' : '']" data-text="是">是</div>
      <div class="select-item" :class="[form.drink == '否' ? 'select-item-on' : '']" data-text="否">否</div>
    </div>
  </col>
</Row>

<Row>
  <Col span="24">
    <div class="name">安眠药</div>
    <Row>
      <Col span="24">
      <div class="name">名称: {{ form.sleeping_name }}</div>
      </Col>
    </Row>
    <Row>
      <Col span="24" >
      <div class="name">时间: {{ form.sleeping_time }}　　　剂量: {{ form.sleeping_measure }}</div>
      </Col>
    </Row>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">高血压家族史</div>
    <div class="select-box">
      <div class="select-item" :class="[form.high_blood == '有' ? 'select-item-on' : '']" data-text="有">有</div>
      <div class="select-item" :class="[form.high_blood == '无' ? 'select-item-on' : '']" data-text="无">无</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">是否初诊</div>
    <div class="select-box">
      <div class="select-item" :class="[form.is_chuzhen == '是' ? 'select-item-on' : '']" data-text="是">是</div>
      <div class="select-item" :class="[form.is_chuzhen == '否' ? 'select-item-on' : '']" data-text="否">否</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">分级: {{ form.fenji }}　　　{{ form.case_year }} <span style="color: #999;">年</span></div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">高血压用药</div>
    <Row>
      <Col span="24">
      <div class="name">名称: {{ form.blood_name }}</div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <div class="name">规律与否</div>
        <div class="select-box">
          <div class="select-item" :class="[form.is_law == '是' ? 'select-item-on' : '']" data-text="是">是</div>
          <div class="select-item" :class="[form.is_law == '否' ? 'select-item-on' : '']" data-text="否">否</div>
        </div>
      </Col>
    </Row>
  </Col>
</Row>

<Row>
  <col span="24" >
    <div class="name">服用时间早: {{ form.blood_time_moring }}　　　服用时间晚: {{ form.blood_time_night }}</div>
  </col>
</Row>

<Row>
  <Col span="24">
    <div class="name">靶器官损害及合并症</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">颈动脉超声光滑与否</div>
    <div class="select-box">
      <div class="select-item" :class="[form.artery == '是' ? 'select-item-on' : '']" data-text="是">是</div>
      <div class="select-item" :class="[form.artery == '否' ? 'select-item-on' : '']" data-text="否">否</div>
    </div>
  </Col>
</Row>
<Row>
  <Col span="24">
    <div class="name">厚度: {{ form.artery_thickness }} <span style="color: #999;">(mm)</span></div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">粥样硬化斑块厚度: {{ form.sclerosis_plaques }} <span style="color: #999;">(mm)</span></div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">EGFR　 　: {{ form.EGFR }}　　　肌酐　　　: {{ form.creatinine }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">胆固醇　　: {{ form.cholesterol }}　　　甘油三酯　: {{ form.triglyceride }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">病史　　　: {{ form.medical_history }}　　　低密度脂蛋: {{ form.LDL }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">同型半胱氨: {{ form.homocysteine }}　　　糖尿病分型: {{ form.diabetes_classification }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">糖: {{ form.sugar }}　　　糖化: {{ form.saccharify }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">是否午睡</div>
    <div class="select-box">
      <div class="select-item" :class="[form.siesta == '是' ? 'select-item-on' : '']" data-text="是">是</div>
      <div class="select-item" :class="[form.siesta == '否' ? 'select-item-on' : '']" data-text="否">否</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">时长: {{ form.siesta_time }}　　　频次/周: {{ form.siesta_week }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">咖啡(偶尔不记)</div>
    <div class="select-box">
      <div class="select-item" :class="[form.coffee == '是' ? 'select-item-on' : '']" data-text="是">是</div>
      <div class="select-item" :class="[form.coffee == '否' ? 'select-item-on' : '']" data-text="否">否</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">运动习惯</div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">名称: {{ form.sport_name }}</div>
  </Col>
</Row>

<Row>
  <Col span="12" >
   <div class="name">时长: {{ form.sport_time }} <span style="color: #999;">(min)</span>　　　频次/周: {{ form.sport_week }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">时间段</div>
    <div class="select-box">
      <div v-for="(val, index) in form.sport_quantum" :key="index" class="select-item" :class="[val.val == 2 ? 'select-item-on' : '']">{{val.name}}</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">CPC检测</div>
  </Col>
</Row>


<Row>
  <Col span="24">
  <div class="name">昨晚入睡时间: {{ form.last_night_time }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">今早起床时间: {{ form.today_wake_time }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">醒来30分钟: {{ form.wake_minutes }}</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">绝经与否</div>
    <div class="select-box">
      <div class="select-item" :class="[form.menopause == '是' ? 'select-item-on' : '']" data-text="是">是</div>
      <div class="select-item" :class="[form.menopause == '否' ? 'select-item-on' : '']" data-text="否">否</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name">测量血压</div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name" style="padding-bottom: 10px;">第一次</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">低压: {{ form.first_low_blood }} mmHg　　　高压: {{ form.first_high_blood }} mmHg</div>
  </Col>
</Row>

<Row>
  <Col span="24">
  <div class="name" style="padding-bottom: 10px;">第二次</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">低压: {{ form.tow_low_blood }} mmHg　　　高压: {{ form.tow_high_blood }} mmHg</div>
  </Col>
</Row>

<div style="border-bottom: 1px solid #ccc;margin-top: 20px;"></div>


<Row>
  <div class="name">高血压诊断结果如下：</div>
  <Col :span="24" style="padding: 12px 0 0 0;">
    <div class="name">{{ feedback.feedback }}</div>
  </Col>
</Row>

<!-- <Row>
  <Col :span="24" style="padding: 12px 0 0 16px;">
      <Button type="warning" :loading="loading" @click="habdleClickSave">反 馈</Button>
  </Col>
</Row> -->

    </Card>
  </div>
</template>

<script>
import {
  getQuesurvey,
  replyFeedback
} from '@/api/patient'
export default {
  name: 'gaoxueya_page',
  data () {
    return {
      form: {},
      feedback: {},
      loading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let { data } = await getQuesurvey({id: this.$route.query.id})
      if (data.code == '200') {
        this.form = data.data.data
        this.feedback = data.data.feedback
      } else {
        this.$Message.error(data.msg)
      }
    },
    async habdleClickSave () {
      if (this.feedback.feedback == '') {
        this.$Message.error('请输入反馈内容！')
        return
      }
      this.loading = true
      let { data } = await replyFeedback({id: this.form.id, feedback: this.feedback.feedback, type_id: 1})
      if (data.code == '200') {
         this.$Message.success('反馈成功!');
        setTimeout(() => {
          this.loading = false
          this.getList()
        }, 2000)
      } else {
        this.loading = false
        this.$Message.error(data.msg)
      }

    },
  }
}
</script>

<style>
.name {
  font-size: 16px;
  padding: 10px 0 0 16px;
}
.select-box {
  padding-bottom: 10px;
}
.select-item {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  background: #F6F6FB;
  border-radius: 22px;
  display: inline-block;
  margin: 10px 0 0 16px;
  padding: 10px 28px;
}
.select-item-on {
  background: #5FD0A7;
  color: #fff;
}
.sty {
  border-bottom: 1px solid #f1f1f1;
}
.sty2 {
  border-left: 1px solid #f1f1f1;
}
.btn {
  padding: 150px 30px 50px 30px;
}
</style>
