<template>
  <div>
    <Card style="min-height: 80vh;">
      <Row>
  <col span="24">
    <div class="box">
      <span class="num">1</span>
      近1个月，晚上上床睡觉通常 {{ form.sleep_time }} 点钟。
    </div>
  </col>
</Row>
<Row>
  <col span="24">
    <div class="box">
      <span class="num">2</span>
      近1个月，从上床到入睡通常需要 {{ form.go_sleep_time }} 分钟。
    </div>
  </col>
</Row>
<div class="name1">上床到入睡得分：{{ fen_list.B2 }}</div>
<Row>
  <col span="24">
    <div class="box">
      <span class="num">3</span>
      近1个月，通常早上 {{ form.go_up_time }} 点起床。
    </div>
  </col>
</Row>

<Row>
  <col span="24">
    <div class="box">
      <span class="num">4</span>
      近1个月，每夜通常实际睡眠 {{ form.deep_sleep }} 小时。
      <div class="desc">(不等于卧床时间)</div>
    </div>
  </col>
</Row>
<div class="name1">睡眠时间得分：{{ fen_list.C }}</div>
<div class="name1">3、4、1 综合睡眠效率得分：{{ fen_list.D }}</div>
<Row>
  <col span="24">
    <div class="box" style="padding-bottom: 0;">
      <span class="num">5</span>
      近1个月 ，因下列情况影响睡眠而烦恼：
    </div>
  </col>
</Row>

<!-- <Row >
  <col span="24">
    <div class="name">(肺)自觉睡眠轻浅:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.fei_sleep_depth == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.fei_sleep_depth == '偶尔' ? 'select-item-on' : '']" data-text="偶尔">偶尔</div>
      <div class="select-item" :class="[form.fei_sleep_depth == '经常' ? 'select-item-on' : '']" data-text="经常">经常</div>
      <div class="select-item" :class="[form.fei_sleep_depth == '总是' ? 'select-item-on' : '']" data-text="总是">总是</div>
    </div>
  </col>
</Row>

<Row >
  <col span="24">
    <div class="name">(脾)自觉睡前思虑乱无法入睡:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.pi_sleep_depth == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.pi_sleep_depth == '偶尔' ? 'select-item-on' : '']" data-text="偶尔">偶尔</div>
      <div class="select-item" :class="[form.pi_sleep_depth == '经常' ? 'select-item-on' : '']" data-text="经常">经常</div>
      <div class="select-item" :class="[form.pi_sleep_depth == '总是' ? 'select-item-on' : '']" data-text="总是">总是</div>
    </div>
  </col>
</Row> -->

<Row >
  <col span="24">
    <div class="name">入睡困难(超过30分钟):</div>
    <div class="select-box">
      <div class="select-item" :class="[form.difficulty_sleep_time == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.difficulty_sleep_time == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.difficulty_sleep_time == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.difficulty_sleep_time == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">入睡困难得分：{{ fen_list.Ba }}</div>
<Row >
  <col span="24">
    <div class="name">夜间易醒或早醒:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.night_festless_sleep == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.night_festless_sleep == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.night_festless_sleep == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.night_festless_sleep == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Eb }}</div>
<Row >
  <col span="24">
    <div class="name">夜间去厕所:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.night_wc == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.night_wc == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.night_wc == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.night_wc == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Ec }}</div>
<Row >
  <col span="24">
    <div class="name">呼吸不畅:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.breathe_difficulty == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.breathe_difficulty == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.breathe_difficulty == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.breathe_difficulty == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Ed }}</div>
<Row >
  <col span="24">
    <div class="name">咳嗽或鼾声高:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.cough_num == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.cough_num == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.cough_num == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.cough_num == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Ee }}</div>

<Row >
  <col span="24">
    <div class="name1">感觉冷:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.feel_cold == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.feel_cold == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.feel_cold == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.feel_cold == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Ef }}</div>
<Row >
  <col span="24">
    <div class="name">感觉热:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.feel_hot == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.feel_hot == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.feel_hot == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.feel_hot == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Eg }}</div>
<Row >
  <col span="24">
    <div class="name">梦多(影响作息):</div>
    <div class="select-box">
      <div class="select-item" :class="[form.dream_num == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.dream_num == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.dream_num == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.dream_num == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Eh }}</div>
<Row >
  <col span="24">
    <div class="name">疼痛不适:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.is_pain == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.is_pain == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.is_pain == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.is_pain == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Ei }}</div>
<Row >
  <col span="24">
    <div class="name">其它影响睡眠的事情:</div>
    <div class="select-box">
      <div class="select-item" :class="[form.other_thing == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.other_thing == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.other_thing == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.other_thing == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.Ej }}</div>

<div class="name1">5综合睡眼障碍得分：{{ fen_list.E }}</div>
<Row>
  <col span="24">
    <div class="box" style="padding-bottom: 0;">
      <span class="num">6</span>
      近一个月，您用催眠药的情况：
    </div>
    <div class="select-box">
      <div class="select-item" :class="[form.hypnotic == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.hypnotic == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.hypnotic == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.hypnotic == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>

<Row>
  <col span="24">
    <div class="box" style="padding-bottom: 0;">
      <span class="num">7</span>
      近一个月，您感到困倦么？
    </div>
    <div class="select-box">
      <div class="select-item" :class="[form.tired == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.tired == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.tired == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.tired == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">睡眠药物得分：{{ fen_list.F }}</div>
<Row>
  <col span="24">
    <div class="box" style="padding-bottom: 0;">
      <span class="num">8</span>
      一个月，您感到乏力和做事精力不足么？
    </div>
    <div class="select-box">
      <div class="select-item" :class="[form.lacking == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.lacking == '1次/周' ? 'select-item-on' : '']" data-text="1次/周">1次/周</div>
      <div class="select-item" :class="[form.lacking == '1-2次/周' ? 'select-item-on' : '']" data-text="1-2次/周">1-2次/周</div>
      <div class="select-item" :class="[form.lacking == '≥3次/周' ? 'select-item-on' : '']" data-text="≥3次/周">≥3次/周</div>
    </div>
  </col>
</Row>
<div class="name1">得分：{{ fen_list.G8 }}</div>
<Row>
  <col span="24">
    <div class="box" style="padding-bottom: 0;">
      <span class="num">9</span>
      近一个月，您感觉您的睡眠质量怎么样？
    </div>
    <div class="select-box">
      <div class="select-item" :class="[form.sleep_quality == '很好' ? 'select-item-on' : '']" data-text="很好">很好</div>
      <div class="select-item" :class="[form.sleep_quality == '较好' ? 'select-item-on' : '']" data-text="较好">较好</div>
      <div class="select-item" :class="[form.sleep_quality == '较差' ? 'select-item-on' : '']" data-text="较差">较差</div>
      <div class="select-item" :class="[form.sleep_quality == '很差' ? 'select-item-on' : '']" data-text="很差">很差</div>
    </div>
  </col>
</Row>
<div class="name1">睡眠质量得分：{{ fen_list.A }}</div>

<div class="name1">8、9综合日间功能障碍得分：{{ fen_list.G }}</div>

<!-- <Row>
  <col span="24">
    <div class="box">
      <span class="num">10</span>
      若存在，您对失眠或睡眠不满 这种状况 有多久？ {{ form.dissatisfied }} 月。
    </div>
  </col>
</Row> -->

<div style="border-bottom: 1px solid #ccc;margin-top: 20px;"></div>

<Row>
  <div class="name">匹兹堡睡眠质评分结果如下：</div>
  <Col :span="24" style="padding: 12px 0 0 0;">
    <div class="name">睡眠分数和为：{{ fen_list.PSQI }}　　　结果：{{ feedback.feedback }}</div>
  </Col>
</Row>


    </Card>
  </div>
</template>

<script>
import {
  getQuesurvey,
  replyFeedback
} from '@/api/patient'
export default {
  name: 'fenshuziping_page',
  data () {
    return {
      form: {},
      feedback: {},
      loading: false,
      fen_list: {}
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
        this.feedback = data.data.feedback,
        this.fen_list = data.data.fen_list
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
      let { data } = await replyFeedback({id: this.form.id, feedback: this.feedback.feedback, type_id: 2})
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

<style scope>
.name {
  font-size: 16px;
  padding: 10px 0 0 16px;
}
.name1 {
  font-size: 16px;
  padding: 0 0 16px 16px;
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
.num {
  background: #B8E1D2;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -0.72px;
  text-align: center;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: inline-block;
}
.box {
  padding: 0 18px 15px 15px;
  line-height: 34px;
  font-size: 16px;
}
.ipt {
  width: 130px;
  display: inline-table;
  border-bottom: 1px solid #666;
  padding-left: 12px;
}
.desc {
  font-size: 13px;
  color: #ccc;
  padding-left: 34px;
}
</style>
