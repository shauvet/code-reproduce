
//数字格式化
export function numberFormat(number, precision = 2, needPrefix = false, prefix = '￥') {
  let displayPrefix = needPrefix ? prefix : '';
  number = String(number).replace(/(^\s*)|(\s*$)/g, "");
  if(isNaN(number) || !number){
    return displayPrefix + parseFloat(0).toFixed(precision);
  } else {
    number = parseFloat(number).toFixed(precision)
  }
  number = number + '';
  if (number) {
    let nums = number.split('.')
    let num = nums[0].slice(nums[0].length % 3)
    let numBegin = nums[0].slice(0, nums[0].length % 3)
    number = numBegin + ((numBegin && num) ? ',' : '') + (num ? num.match(/\d{3}/g).join(',') : '') + (nums[1] ? '.' + nums[1] : '')
  }
  return displayPrefix + number;
}
