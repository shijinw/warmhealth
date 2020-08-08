var regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
var email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/
var tel = /^1[345789]\d{9}$/
var fax = /^(\d{3,4}-)?\d{7,8}$/
var inputType = /^[0-9a-zA-Z_]{1,}$/
var num = /^[0-9]*$/
var FormValidate = (function () {
  // eslint-disable-next-line
  function FormValidate() {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 姓名的验证规则
      Email: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        if (!email.test(value)) {
          callback(new Error('请输入正确的邮箱!'))
        } else {
          callback()
        }
      },
      // 身份证的验证规则
      ID: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('身份证不能为空'))
        }
        if (!regId.test(value)) {
          callback(new Error('请输入正确的二代身份证号码'))
        } else {
          callback()
        }
      },
      // 电话号码的验证
      Tel: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'))
        }
        if (!tel.test(value)) {
          callback(new Error('请正确填写电话号码'))
        } else {
          callback()
        }
      },
      // 姓名的验证规则
      Name: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('姓名不能为空'))
        }
        if (!isNaN(value)) {
          callback(new Error('请输入正确姓名!'))
        } else if (value.length < 2 || value.length > 6) {
          callback(new Error('请输入2到6个字符!'))
        } else {
          callback()
        }
      },
      // 传真的校验规则
      Fax: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('传真不能为空'))
        }
        if (!fax.test(value)) {
          callback(new Error('请正确填写传真'))
        } else {
          callback()
        }
      },
      // 只能输入数字、字母、下划线的验证
      InputType:  (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空'))
        }
        if (!inputType.test(value)) {
          callback(new Error('只支持输入数字、字母和下划线'))
        } else {
          callback()
        }
      },
      Num:  (rule, value, callback) => {
        if (!value) {
          return callback(new Error('排序不能为空'))
        }
        if (!num.test(value)) {
          callback(new Error('只支持输入数字'))
        } else {
          callback()
        }
      }
    }
  }
  return FormValidate
}())
exports.FormValidate = FormValidate
