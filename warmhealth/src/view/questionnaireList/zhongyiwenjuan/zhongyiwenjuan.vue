<template>
  <div>
    <Card style="min-height: 80vh;">
      <Row>
  <Col span="24">
    <div class="name">高血压病中医辨证分型</div>
  </Col>
</Row>
<Row custom-class="sty">
  <Col span="24">
    <div class="name" style="font-weight: bold;">主症</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">眩晕</div>
    <div class="select-box">
      <div class="select-item" :class="[form.dizziness == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.dizziness == '头晕眼花，时作时止' ? 'select-item-on' : '']" data-text="头晕眼花，时作时止">头晕眼花，时作时止</div>
      <div class="select-item" :class="[form.dizziness == '视物旋转，不能行走' ? 'select-item-on' : '']" data-text="视物旋转，不能行走">视物旋转，不能行走</div>
      <div class="select-item" :class="[form.dizziness == '眩晕欲仆，不能站立' ? 'select-item-on' : '']" data-text="眩晕欲仆，不能站立">眩晕欲仆，不能站立</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">头痛</div>
    <div class="select-box">
      <div class="select-item" :class="[form.headache == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.headache == '头晕眼花，时作时止' ? 'select-item-on' : '']" data-text="头晕眼花，时作时止">头晕眼花，时作时止</div>
      <div class="select-item" :class="[form.headache == '头痛可忍，持续不止' ? 'select-item-on' : '']" data-text="头痛可忍，持续不止">头痛可忍，持续不止</div>
      <div class="select-item" :class="[form.headache == '头痛难忍，上冲癫顶' ? 'select-item-on' : '']" data-text="头痛难忍，上冲癫顶">头痛难忍，上冲癫顶</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">急躁易怒</div>
    <div class="select-box">
      <div class="select-item" :class="[form.temper == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.temper == '心烦偶燥' ? 'select-item-on' : '']" data-text="心烦偶燥">心烦偶燥</div>
      <div class="select-item" :class="[form.temper == '心烦急躁，遇事易怒' ? 'select-item-on' : '']" data-text="心烦急躁，遇事易怒">心烦急躁，遇事易怒</div>
      <div class="select-item" :class="[form.temper == '烦躁易怒，不能自止' ? 'select-item-on' : '']" data-text="烦躁易怒，不能自止">烦躁易怒，不能自止</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">腰酸</div>
    <div class="select-box">
      <div class="select-item" :class="[form.lumbago == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.lumbago == '晨起腰酸，捶打可止' ? 'select-item-on' : '']" data-text="晨起腰酸，捶打可止">晨起腰酸，捶打可止</div>
      <div class="select-item" :class="[form.lumbago == '持续腰酸，劳作加重' ? 'select-item-on' : '']" data-text="持续腰酸，劳作加重">持续腰酸，劳作加重</div>
      <div class="select-item" :class="[form.lumbago == '腰痛如折，休息不止' ? 'select-item-on' : '']" data-text="腰痛如折，休息不止">腰痛如折，休息不止</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">腰软</div>
    <div class="select-box">
      <div class="select-item" :class="[form.loinmild == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.loinmild == '轻微' ? 'select-item-on' : '']" data-text="轻微">轻微</div>
      <div class="select-item" :class="[form.loinmild == '不任重物' ? 'select-item-on' : '']" data-text="不任重物">不任重物</div>
      <div class="select-item" :class="[form.loinmild == '不欲行走' ? 'select-item-on' : '']" data-text="不欲行走">不欲行走</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">五心烦热</div>
    <div class="select-box">
      <div class="select-item" :class="[form.dysphoria == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.dysphoria == '晚间手足心热' ? 'select-item-on' : '']" data-text="晚间手足心热">晚间手足心热</div>
      <div class="select-item" :class="[form.dysphoria == '心烦手足心热' ? 'select-item-on' : '']" data-text="心烦手足心热">心烦手足心热</div>
      <div class="select-item" :class="[form.dysphoria == '烦热不欲衣被' ? 'select-item-on' : '']" data-text="烦热不欲衣被">烦热不欲衣被</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">头重如裹</div>
    <div class="select-box">
      <div class="select-item" :class="[form.head_weight == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.head_weight == '微觉头沉' ? 'select-item-on' : '']" data-text="微觉头沉">微觉头沉</div>
      <div class="select-item" :class="[form.head_weight == '头重似蒙布' ? 'select-item-on' : '']" data-text="头重似蒙布">头重似蒙布</div>
      <div class="select-item" :class="[form.head_weight == '头重如戴帽' ? 'select-item-on' : '']" data-text="头重如戴帽">头重如戴帽</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">胸闷</div>
    <div class="select-box">
      <div class="select-item" :class="[form.chest == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.chest == '轻微胸闷' ? 'select-item-on' : '']" data-text="轻微胸闷">轻微胸闷</div>
      <div class="select-item" :class="[form.chest == '胸闷明显，时见太息' ? 'select-item-on' : '']" data-text="胸闷明显，时见太息">胸闷明显，时见太息</div>
      <div class="select-item" :class="[form.chest == '胸闷如窒' ? 'select-item-on' : '']" data-text="胸闷如窒">胸闷如窒</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">呕吐痰涎</div>
    <div class="select-box">
      <div class="select-item" :class="[form.Vomit == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.Vomit == '偶见痰涎清稀' ? 'select-item-on' : '']" data-text="偶见痰涎清稀">偶见痰涎清稀</div>
      <div class="select-item" :class="[form.Vomit == '常见' ? 'select-item-on' : '']" data-text="常见">常见</div>
      <div class="select-item" :class="[form.Vomit == '痰涎量多' ? 'select-item-on' : '']" data-text="痰涎量多">痰涎量多</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">畏寒肢冷</div>
    <div class="select-box">
      <div class="select-item" :class="[form.coldchills == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.coldchills == '微畏寒' ? 'select-item-on' : '']" data-text="微畏寒">微畏寒</div>
      <div class="select-item" :class="[form.coldchills == '畏寒肢冷明显' ? 'select-item-on' : '']" data-text="畏寒肢冷明显">畏寒肢冷明显</div>
      <div class="select-item" :class="[form.coldchills == '畏寒肢冷严重' ? 'select-item-on' : '']" data-text="畏寒肢冷严重">畏寒肢冷严重</div>
    </div>
  </Col>
</Row>

<Row custom-class="sty">
  <Col span="24">
    <div class="name" style="font-weight: bold;">次症</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">面赤</div>
    <div class="select-box">
      <div class="select-item" :class="[form.flushing == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.flushing == '轻微面赤' ? 'select-item-on' : '']" data-text="轻微面赤">轻微面赤</div>
      <div class="select-item" :class="[form.flushing == '面赤明显' ? 'select-item-on' : '']" data-text="面赤明显">面赤明显</div>
      <div class="select-item" :class="[form.flushing == '面赤如妆' ? 'select-item-on' : '']" data-text="面赤如妆">面赤如妆</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">目赤</div>
    <div class="select-box">
      <div class="select-item" :class="[form.hot_eyes == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.hot_eyes == '轻微目赤' ? 'select-item-on' : '']" data-text="轻微目赤">轻微目赤</div>
      <div class="select-item" :class="[form.hot_eyes == '目赤明显' ? 'select-item-on' : '']" data-text="目赤明显">目赤明显</div>
      <div class="select-item" :class="[form.hot_eyes == '目赤如鸿眼' ? 'select-item-on' : '']" data-text="目赤如鸿眼">目赤如鸿眼</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">口干</div>
    <div class="select-box">
      <div class="select-item" :class="[form.dry == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.dry == '口微干' ? 'select-item-on' : '']" data-text="口微干">口微干</div>
      <div class="select-item" :class="[form.dry == '口干少津' ? 'select-item-on' : '']" data-text="口干少津">口干少津</div>
      <div class="select-item" :class="[form.dry == '口干欲饮水' ? 'select-item-on' : '']" data-text="口干欲饮水">口干欲饮水</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">口苦</div>
    <div class="select-box">
      <div class="select-item" :class="[form.bitter == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.bitter == '晨起苦' ? 'select-item-on' : '']" data-text="晨起苦">晨起苦</div>
      <div class="select-item" :class="[form.bitter == '食不知味' ? 'select-item-on' : '']" data-text="食不知味">食不知味</div>
      <div class="select-item" :class="[form.bitter == '口苦而涩' ? 'select-item-on' : '']" data-text="口苦而涩">口苦而涩</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">便秘</div>
    <div class="select-box">
      <div class="select-item" :class="[form.constipation == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.constipation == '便干，日一行' ? 'select-item-on' : '']" data-text="便干，日一行">便干，日一行</div>
      <div class="select-item" :class="[form.constipation == '秘结，两日一行' ? 'select-item-on' : '']" data-text="秘结，两日一行">秘结，两日一行</div>
      <div class="select-item" :class="[form.constipation == '艰难，数日一行' ? 'select-item-on' : '']" data-text="艰难，数日一行">艰难，数日一行</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">溲赤</div>
    <div class="select-box">
      <div class="select-item" :class="[form.souchi == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.souchi == '稍黄' ? 'select-item-on' : '']" data-text="稍黄">稍黄</div>
      <div class="select-item" :class="[form.souchi == '黄而少' ? 'select-item-on' : '']" data-text="黄而少">黄而少</div>
      <div class="select-item" :class="[form.souchi == '黄赤不利' ? 'select-item-on' : '']" data-text="黄赤不利">黄赤不利</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">心悸</div>
    <div class="select-box">
      <div class="select-item" :class="[form.palpitation == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.palpitation == '偶见轻微心悸' ? 'select-item-on' : '']" data-text="偶见轻微心悸">偶见轻微心悸</div>
      <div class="select-item" :class="[form.palpitation == '心悸阵作' ? 'select-item-on' : '']" data-text="心悸阵作">心悸阵作</div>
      <div class="select-item" :class="[form.palpitation == '心悸怔忡' ? 'select-item-on' : '']" data-text="心悸怔忡">心悸怔忡</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">失眠</div>
    <div class="select-box">
      <div class="select-item" :class="[form.insomnia == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.insomnia == '睡眠稍有减少' ? 'select-item-on' : '']" data-text="睡眠稍有减少">睡眠稍有减少</div>
      <div class="select-item" :class="[form.insomnia == '时见失眠' ? 'select-item-on' : '']" data-text="时见失眠">时见失眠</div>
      <div class="select-item" :class="[form.insomnia == '不能入睡' ? 'select-item-on' : '']" data-text="不能入睡">不能入睡</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">耳鸣</div>
    <div class="select-box">
      <div class="select-item" :class="[form.tinnitus == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.tinnitus == '轻微' ? 'select-item-on' : '']" data-text="轻微">轻微</div>
      <div class="select-item" :class="[form.tinnitus == '时作时止' ? 'select-item-on' : '']" data-text="时作时止">时作时止</div>
      <div class="select-item" :class="[form.tinnitus == '耳鸣不止' ? 'select-item-on' : '']" data-text="耳鸣不止">耳鸣不止</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">健忘</div>
    <div class="select-box">
      <div class="select-item" :class="[form.amnesia == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.amnesia == '偶有，可记起' ? 'select-item-on' : '']" data-text="偶有，可记起">偶有，可记起</div>
      <div class="select-item" :class="[form.amnesia == '时健忘，不易想起' ? 'select-item-on' : '']" data-text="时健忘，不易想起">时健忘，不易想起</div>
      <div class="select-item" :class="[form.amnesia == '转身即忘' ? 'select-item-on' : '']" data-text="转身即忘">转身即忘</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">口淡</div>
    <div class="select-box">
      <div class="select-item" :class="[form.koudan == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.koudan == '轻微无味' ? 'select-item-on' : '']" data-text="轻微无味">轻微无味</div>
      <div class="select-item" :class="[form.koudan == '较重' ? 'select-item-on' : '']" data-text="较重">较重</div>
      <div class="select-item" :class="[form.koudan == '不欲饮食' ? 'select-item-on' : '']" data-text="不欲饮食">不欲饮食</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">食少</div>
    <div class="select-box">
      <div class="select-item" :class="[form.reduced == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.reduced == '稍有减少' ? 'select-item-on' : '']" data-text="稍有减少">稍有减少</div>
      <div class="select-item" :class="[form.reduced == '减少' ? 'select-item-on' : '']" data-text="减少">减少</div>
      <div class="select-item" :class="[form.reduced == '明显减少' ? 'select-item-on' : '']" data-text="明显减少">明显减少</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">气短</div>
    <div class="select-box">
      <div class="select-item" :class="[form.breathe == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.breathe == '活动后气短' ? 'select-item-on' : '']" data-text="活动后气短">活动后气短</div>
      <div class="select-item" :class="[form.breathe == '微活动气短' ? 'select-item-on' : '']" data-text="微活动气短">微活动气短</div>
      <div class="select-item" :class="[form.breathe == '气短较重' ? 'select-item-on' : '']" data-text="气短较重">气短较重</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">夜尿频</div>
    <div class="select-box">
      <div class="select-item" :class="[form.night_urinate == '无' ? 'select-item-on' : '']" data-text="无">无</div>
      <div class="select-item" :class="[form.night_urinate == '夜尿1次' ? 'select-item-on' : '']" data-text="夜尿1次">夜尿1次</div>
      <div class="select-item" :class="[form.night_urinate == '夜尿2-3次' ? 'select-item-on' : '']" data-text="夜尿2-3次">夜尿2-3次</div>
      <div class="select-item" :class="[form.night_urinate == '>3次' ? 'select-item-on' : '']" data-text=">3次">>3次</div>
    </div>
  </Col>
</Row>

<Row custom-class="sty">
  <Col span="24">
    <div class="name">其他: {{ form.other }}</div>
  </Col>
</Row>

<Row custom-class="sty">
  <Col span="24">
    <div class="name" style="font-weight: bold;">舌脉</div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">舌质</div>
    <div class="select-box">
      <div class="select-item" :class="[form.tongue == '淡胖或有齿痕' ? 'select-item-on' : '']" data-text="淡胖或有齿痕">淡胖或有齿痕</div>
      <div class="select-item" :class="[form.tongue == '紫黯或舌下有瘀斑，舌下静脉曲张' ? 'select-item-on' : '']" data-text="紫黯或舌下有瘀斑，舌下静脉曲张">紫黯或舌下有瘀斑，舌下静脉曲张</div>
      <div class="select-item" :class="[form.tongue == '红' ? 'select-item-on' : '']" data-text="红">红</div>
      <div class="select-item" :class="[form.tongue == '淡红' ? 'select-item-on' : '']" data-text="淡红">淡红</div>
      <div class="select-item" :class="[form.tongue == '其他' ? 'select-item-on' : '']" data-text="其他">其他</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">舌苔</div>
    <div class="select-box">
      <div class="select-item" :class="[form.shetai == '黄' ? 'select-item-on' : '']" data-text="黄">黄</div>
      <div class="select-item" :class="[form.shetai == '白' ? 'select-item-on' : '']" data-text="白">白</div>
      <div class="select-item" :class="[form.shetai == '腻' ? 'select-item-on' : '']" data-text="腻">腻</div>
      <div class="select-item" :class="[form.shetai == '润' ? 'select-item-on' : '']" data-text="润">润</div>
      <div class="select-item" :class="[form.shetai == '少津' ? 'select-item-on' : '']" data-text="少津">少津</div>
      <div class="select-item" :class="[form.shetai == '少苔' ? 'select-item-on' : '']" data-text="少苔">少苔</div>
      <div class="select-item" :class="[form.shetai == '其他' ? 'select-item-on' : '']" data-text="其他">其他</div>
    </div>
  </Col>
</Row>

<Row>
  <Col span="24">
    <div class="name">脉象</div>
    <div class="select-box">
      <div class="select-item" :class="[form.pulse == '弦滑' ? 'select-item-on' : '']" data-text="弦滑">弦滑</div>
      <div class="select-item" :class="[form.pulse == '数' ? 'select-item-on' : '']" data-text="数">数</div>
      <div class="select-item" :class="[form.pulse == '沉' ? 'select-item-on' : '']" data-text="沉">沉</div>
      <div class="select-item" :class="[form.pulse == '细' ? 'select-item-on' : '']" data-text="细">细</div>
      <div class="select-item" :class="[form.pulse == '弱' ? 'select-item-on' : '']" data-text="弱">弱</div>
      <div class="select-item" :class="[form.pulse == '结' ? 'select-item-on' : '']" data-text="结">结</div>
      <div class="select-item" :class="[form.pulse == '代' ? 'select-item-on' : '']" data-text="代">代</div>
      <div class="select-item" :class="[form.pulse == '促' ? 'select-item-on' : '']" data-text="促">促</div>
    </div>
  </Col>
</Row>
<div style="border-bottom: 1px solid #ccc;margin-top: 20px;"></div>

<Row>
  <Col span="24">
  <div class="name" style="font-weight: bold;padding-bottom: 10px; padding-top: 20px;">入选疾病诊断结果(中医诊断)：</div>
  <div class="name" style="padding-bottom: 16px;">疾病诊断：{{ form.fhjg ? form.fhjg : '无症状' }}</div>
  <div class="name" style="padding-bottom: 50px;">辨证分型：{{ feedback.feedback }}</div>
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
  name: 'zhongyiwenjuan_page',
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
      let { data } = await replyFeedback({id: this.form.id, feedback: this.feedback.feedback, type_id: 3})
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
