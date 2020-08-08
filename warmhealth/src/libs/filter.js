// 全局过滤器方法
/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} value 传入的时间戳
 */
const getDateTime = value => {
  if (!value) return ""
  const d = new Date(value * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

// 定义下全局过滤器 往 {} 里面加,逗号隔开
export { getDateTime }
