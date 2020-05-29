import IntlMessageFormat from 'intl-messageformat';
import zh from '../locale/zh';
import en from '../locale/en';

const localeData = {en, zh};

/*
 * 检测是否有权限
 * @param key {string} key
 * @param defaultMessage {string} 默认显示内容
 * @param options {obj} 注入内容
 *
 *  example
 *  locale/zh.js
 *  export default ({
 *   hello: '你好，{name}'
 *  })
 *
 *  let name = '清学';
 *  intl.get('hello', 'Hello', {name})
 *
 * */
export const getMessage = function (key, defaultMessage, options) {
  const lang = getLanguage();
  const messages = localeData[lang] || localeData.en;
  let msg = messages[key];
  if (msg == null) {
    if (defaultMessage != null) {
      return defaultMessage;
    }
    return key;
  }
  if (options) {
    msg = new IntlMessageFormat(msg, languageWithoutRegionCode);
    return msg.format(options);
  }
  return msg;
}
/*
 * 存储语言类型，默认为浏览器语言
 * @param lang {string} 语言类型
 * */
export const setLanguage = (lang) => {
  //获取本地语言
  const language = (navigator.languages && navigator.languages[0]) ||navigator.language ||navigator.userLanguage;
  let languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
  localeData[languageWithoutRegionCode] || (languageWithoutRegionCode = 'en')

  if (lang) {
    localStorage.lang = lang
  }
  localStorage.lang || (localStorage.lang = languageWithoutRegionCode)
}

/*
 * 获取语言种类
 * */
export const getLanguage = () => {
  return localStorage.lang
}


