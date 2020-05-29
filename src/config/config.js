/*
 * @Date: 2019-01-18 15:56:37
 * @LastEditors: guangling
 * @LastEditTime: 2020-05-29 10:22:21
 */
// import { getMessage } from '../utils/intl'

let baseConf = {
  name: `系统管理后台`,
  nameSuffix: '',//名称后缀
  plaType: '1',//平台类型  1 平台后台；2 商户后台
  wheName: true,//是否使用配置名称name
  loginTitle: '欢迎登录系统管理后台',
  prefix: 'antdAdmin',
  // footerText: '云徙科技 版权所有 © 2017',
  footerText: '',
  logoSrc:'data:image/png;base64,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',
  // logoText: getMessage('console_title'),
  tokenUrl:'',
  reportUrl:'https://das.base.shuju.aliyun.com/dashboard/view/pc.htm?spm=a2c10.workspacedashboard.0.0.7b064666qQUFxH',
  //是否从本地读取菜单
  needTempUserAuthFlag: false,
  // needTempUserAuthFlag: true,
  iconFontUrl: '//at.alicdn.com/t/font_c4y7asse3q1cq5mi.js',
  baseURL: '',
  //是否需要查询我的消息
  needMsgNotify: false,
  // 租户ID
  tenantId: 1,
  //登录cookie超时 ，单位天
  loginTimeout: 1,
  //请求url
  requestApiUrl: {},
  // 认证中心Url
  loginUrl: '',
  // 上传签名url
  getPolicyUrl: '',
  // 默认路由
  homePath: 'home',
  // 登录后是否跳转
  isRedirect: false,
  //统一配置Cookie
  cookie: {
    auth: 'mgmt.sso.login.account.auth',
    user_name: 'user_name_mgmt'
  },
  //401后回调接口地址
  adfs:"",
  // 应用ID
  applicationId: 3,
  // 默认模拟菜单权限
  defaultAuthMenu: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "10", "11", "12", "13","14","15","16","17"],
  //加在headers里的请求参数，用于区分项目
  appId:3,
  // 地图信息
  mapCfg: {
    // web服务Key
    webServkey: 'cab8a7b0e96afa1ed91c1eead856f6de',
    // web端key(js api)
    webJsKey: '4196655e6f505990ef6950ee4916c5ce'
  },
  //列表页一些配置
  listConfig: {
    //表格是否新增滚动条td上限
    scrollTd:5,
    //表格滚动配置
    tableScroll: {x: 1200},
    //处理表格头部信息
    columns:e=>{
      let widthName = {
        //日期
        "time":"170px",
        //手机
        "phone":"115px",
      };
      e.map(item=>{
        //如果是日期，宽度100
        for(let i in widthName){
          if(item["name"] == i){
            item.width = widthName[i];
          }
        };
        if(item["title"] == "序号"){
          item.width = "65px";
        }
      });
      return e;
    },
    //搜索框布局
    searchCol: {
      xs: {span: 24},
      md: {span: 12},
      lg: {span: 8},
      xl: {span: 6}
    },
    //搜索框表单项布局
    searchFormItem: {
      labelCol: {span: 8},
      wrapperCol: {span: 16}
    },
  },
  //加在部分接口的变量，用于区分项目
  comp:'item',
  uploadImgdefault:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAFHpJREFUeAHtnQeYFUUSgGHJQQFBkiBBRIKABAE5JSkZjrQegsoiLBmOAwlLXnJSBEkKCCgIiARBBSSKKBw5g+QlB8kCS1zur3f0+2aHeXnm7fj53vftNzMdqqu6OlRVV/UmTpQoUUn+Qj+b9ECYTfAIofG4B0IMsdlQCDEkxBCb9YDN0AnNkBBDbNYDNkMnNENCDLFZD9gMndAMCTHEZj1gM3RCM8RmDElqM3xcolOgQIEU3bp1K1yyZMmimTJlyp02bdocKVOmzJokSZLU8kfFRw8fPozl7/adO3fO37x58/SlS5ditm3btnvUqFH7fv/997sugdsoIzG42Na4WLt27fRRUVGVCxYs+FaGDBmKJ06cOJk/fffo0aP7V69e3X7gwIHVw4cPX/PDDz9c8wdOMOrYkiEff/xxwUaNGjXOnj17FSMmMAtu/fnnn/uZAQdu3Lhxmb8b0llP//+XkRlU6KmnnirIzEmj70RhztmzZ1d+8803cz788MMD+vyE/rYVQwYMGJC3Xbt2HenQN/QdQ0feO3/+/KpffvllWatWrTbBgzh9Ge03vAmbPHlymfLly9fImjXrWzA2uTZf3mHo+okTJ47r37//MX1eQn3bgiHFihVLtWjRog65c+d+m46LJ2jAiLjTp08vGThw4JSpU6de8KejIiMjs/Tr169Vjhw56hjBj4mJ+bZ+/frjd+3aFesPfDPrJDhDGMXF3n///YFs0M/pCWNzPj1t2rS+7du336PP8+d7woQJRZo3bz7YRVtnZs6c2Y/Zt8sf2GbVSVCGbNq06V+vvvpqF0btE9Le5cuXN1StWjVq+/btt80iVuCULl069dKlS4dnzJixnB4us/EBOI1+7bXX5unzgvWdIAxJlixZ4sOHD/fIlStXuBGh586dW168ePHoCxcuPDDKDzQtS5YsSXfs2DEgW7Zs1YxgnThxYv6LL7444v79+4+M8q1MCzpDZLPdv39/9HPPPVfTiLArV678N3/+/J2YIQ+N8s1KY4YkOXTo0NhnnnmmrBHMM2fOLC1UqFC0J+HBqG4gafE20EAAeVt37969fVwxIzY29kSdOnV6WM0MwVXakLZo86QR7oKj4GqUZ2VaUBkCga1y5sz5TxcExc2YMWPAhg0bbrnINz1Z2qLNaAAbitCCq+BsesNuACYhL7ubfNOyFi5ciEpQvpcrgIzUGPLOVa9ePQN7TOyePXtM3cz17TZp0iQTovArLI+50Huep830+jLynTlz5pJFixY9MG/ePMOZZFQnkLSg7CFNmzbN/MUXX8xJmjRpOm+RvX379lE2/uU9e/ZcuGzZsuve1nNXTkwxgwcPrs+GXSN16tR53ZXV5j148OB6ixYtGn/11VcXtelWvAeFIX/88ccYRuHr/hAQFxcXiw1qZq1atWYg/dzzBwbSXPIff/yxGTax98PCwlL5A0O0+meffbazP3V9qWP5HrJ48eIK/jJDCJEOLFy4cCsks6+YLbl8IU7KSh3qzhQY/jJD4Ig5R2iRdyt/ls4QES0xeyzUa8YYBvccO3ZsHbrA7tWrV59C/Lz1xhtvZGStzkLH5WdEv4o4WpoOTKElHqPiDcwn/2nTps1ubbqr988++6woZpMxGBmf1pZh1t1FvN7MjNuyb9++Q7t3776wfv36y+wnad58882c6EBF8+bNWwEDZRFtPbEcYH5paKUUaClD1q5dW7tixYrRiigUvTXTp0+fyqg9pNJcPatVq/b0sGHD6hUpUqQZe4+zQ2HKzREjRrTs3bv3YVd1JX3IkCEv9ujRYwrMSKvKsRfcoPOn9+rVa/FPP/3ksBCrPKMn7efH1BLJxl5Z5f/888/RlSpV+kF9m/20jCGijV+/fn1+qlSpctERVzFXDK5bt+46XwmQjZhZEYV2/Zaqy0g9U6FChcabN282lMTEPLJu3bo52pnJYFjJbBnhz1kIS1XFmjVr9mZgZBBdKV26dOFWafGW7SEYDYsLM6TzunTpEuEPM4QB0oGYz6PY2KcohkhHz507t7361j/J66BlhtQFRk9/mCGwwf1noQFazgpNQpu+TbO+LWNIlSpV6srM4BCo7bhx484GijBmjM+PHDkyW8HBVB/eqVOnJyzEnTt3zkFeQ1VO6khd9e3vU2jo3r17G2i6JrT5C8dTPUuWLNnMWSJWff31190iIiK2ekLC23yxgyEkTGWzLSp1EAxmv/DCC6O19Y8ePdqFDbmJpCE87GYTjjTTHvXll1+Wevfdd0fJEmrF5m4JQ1jziyOtVMmTJ89IbWepd6SkbDVq1MiPtTUbCtrTSFNJbt26dR2p5wRnEvtZs6+qsvonil0+NnSZKWGM1ius59VRIh2mD2CFsW8tZ61/hvw4NvYmffr0OaKHob5ZijJwFlMIqS5XmjRp0iF9PQTWDazN51BGDyGlnVNltU8OtHqsWrVqBXvSDm26We/i5GDq386dO8dCrGzCTrhvv/12FfSBKWyKpzh3cPtjZB/AW2R0uXLlymthqHfOxJcpAOPHj49Q6RxANVPpUkala58Cc+vWrR9LG6qsq6fgKjgL7loYQpvQqE0z692SPYRN9JAa5SJtyUHUnDlzvkNTjmSzzQHybn+4+BQoUaJEZ87Pv8cAGC4wtBU47v1GfZcpU8axfMk30pVTb8B2NleVUU+BJTBxJeoibah0V0/BVXAW3IUGhYfQJjS6qhdIuiUMwUxxVJASAo4fP96Xjur+2HfKiSv6BIP0z/3Xrl3bxnJ1SJYfZ+bjF1HoOL2LOnXq1BA5VFL5cqQrEo98k55bpfOeR94lr0OHDns16UmZMUMFll5JlDLStuAguAhOgpuqK0/BXWiAln6KKYpGbTkz3i1hyKxZs/4Q5Dh+jeRc4Z8KUVHqkHpm4bjWhHW+Ept0U/ytWjNam0BoVQx4NdGYB9Ep+1QdedLRVVnCemnTEBo2yjf7RlaVznsWeSdvg0qT55YtW3qxXVXVpkkb0lbLli1rSduCg+AiOAlugqPgKjiretBSB+tCS/lWNKo8s56WMESQ++ijjwpgBolUiNJJqxs3btwAS+sYxEfD6Y5Dw0VM9IvplAg21Sg6w6lNC2MXLFjgdA9CwnKYT+g8p7GQ99TSHnl7VLvz589/XXsGI6N/+fLlPaUNaQsBxNCTRXAUXNk/GgjuCh4idKT4jalvs5+WMQRxty3OC3LekujgwYPTUcx6fPvtt08sS64IQjNehYTUDI34siqD/N9cvXNwFCPvSGhOb0beHcsaZynHVTkcJZx1BBYwI5DwVqp8T0/2qyuCOzRMk7LiRiS0earnb74lDOnYsWN2rKP/EKSQZOfjlzvBHwRx+zw5ZcqUrkhBjvN1MfZhW8ossLBJXXIFE4Y4mCjnMEpnERjMhm4C01U9d+nQMFFokTLisWKklLqr722eJQx57733HEuL2H2wOY32FhmjcrKBI/cvUHnh4eEOSYo94IFK0z9VHsvNyyqPzlyAV6RjmVNpvj6FFqFJ6qEcOpdPX+G4K++UXNwV8jUPPauY1MEyOomOuKevz/odhsU3H1p0ejbUJCwHF1D4jrsy2JE3g9EdLssFozOjHp6rb2ZpJsljdoiS+KWrciI5sZTleemll7KCwwOsAdew9B7Ra/hCCzRNZMkb8fzzzwuNT4jWrtrwNt0ShiDtZEOUvPrOO++s0SIi0xzbVnM26Kqs987NWMpgEr/Cke0iRvEsiI4ndspmz0a6M3369CVSpEjxhAO1tg3tO4ZAxyZPx+402rw5GngK39732LzrIxCIdu/8sanH4gq04pNPPpnO32mVAU1rMZlc1Up3Ks+MpyVLFp2dgmPbjdoRtmLFimqjR4+ei8RTV88MIUQ6BCWsBRLQXDnL0BOHpLNTn+btN07au/RlxQQjbUmbemZIWcFRcEVanCO4q/pCE7hsJD+lSjPzaQlDsAndQZlz6hIoUZWRkAYZMUJPDDMgC6Nzoti7tHmcaZ/XfvvyzoiOZ5MS2BxeTZK2PMERnAV3znPeVGWZOfuERvVt5tMShmCgu3Dy5MlTgqi423D6149Xr9tixGZglvTREiqGP+23L+/oHvHqAttx2OQDjDDE575Ci9RBYz8lNPpQ3+uiXneS1xApyJQ+zDm5Q1sfNGhQM0wPaX2pL2U5Uy8jZ+K+1vNUnj2jqCv3UXd1hQaWuQ+kDBr8RZZkQ+XWHQxv8ixhCKaKHRcvXrzNxheGxFXTG0SMyuA0V8soPZA0FE6/8UGyEn+uMAbcbY6P/d7T3OFviZTFcecuFKmU2ImyGRnz3CGkzcOGVVr7bcY7Dgt+wxRaWrdunZ3z+iuzZ8/+6yxZIomIAwJm7uyBdKKci0v0bSAwtHXz5cuXHFHYo/lfW0f/zrFAdolZseK0UNqyZMlSRNy7d8+lNq3KeHiGoSvE0w88lHebDawMFAiIZhNocotjQMi5hUwmB0JnPJXxlI/ZPJ4C6am8u3yier1WKl3B2bhxY8A0uYIt6ZYyRDTsu3fvBrTWIgI7LMbuiPA2L3ny5AHRCy0XjTR+b9v3plxACHrTAErUam/K/RXKQMsqq/G0nCGTJk0Sk3Wc1YQEAf4jjgIc5ncr27KcIdiCTjKyxAPkL/0TGvw9S/GFcMsZIshwX8l4rL/XfUHMTmUFd2gYFwycgsIQcQjAdaY/BD0KBlEmt/FoyZIl0VY5NehxDQpDpFFO+n4lFsPpMK1HxK7f4ijXsGHD9cHCL2gMEYJefvnlyazF3weLuEDbEVzxnJkcKBxf6geVIYIYbjSDxHXWFyQToqzcJiG4BrvtoDNE7FzYlPpzgLUw2MR6257gBo79tCee3tYNtFzQGSIIi7c6puyhOD2PFgeEQIkwq77gIk7egpvgaBZcX+AkCEMUgtwENJv49VaYJOIdsar8YD4FB0w9rUuVKiWhDgn2S1CGCNWcmezkzLrxYye0hBiVceKzJThYFe/hC3cTnCGCLE7PNwlDG46rT1MJV/aFgEDKSlt4wkTQ9jDBIRBYZtW1BUMUMV27dv0dP7h2n3/+eXPOrNeypsdzTlDlAnkKTIGNXaqFtGW3izAtOcINpMOkLm46u/nrJl4euJHGBgpP1ceV5xz399YOltat2vXlaUuGKAI4t76k3rElrcJf6yqBN9ckjaCcONw+r+AedF+VkXdJI/jGMbM4INsOQ7uMHDlym5Th+5b8qfJ2fCYGqZJ2ROzvipOt9pC/KxO0dIcYou0NG7yHGGIDJmhRMI0hxFTIeYfbH6bs1uJ4rQoR6dRcvNDVt9FTynNzT7yATX05bowojS9xb3ylxuNVOJIY8qbKD1fKomPUkzL6evLNnYsl5fYH8dmSb0LYXicM2nlTqbRPPEg6yXP1k3xp01W+L+mmMUQiVH/77bd67honviMHsr/TzwqbUTmCZBwhaq7qcXVGATqrkKt8xNg2DRo06E7M4aaxY8d+RIjBPNrIhUN1c1WHqzZeAUYe9a2e6CKvwLghBJiuwF/XEVjEnV2luPrcEXAk5Wg/P9LeMFxIRQAy/HHPVlroqG+Y6WOiqWIvtqnWhBMf4P98HPQRD7+Ky21xdFhDOrWRJqA0BmBbPQH89NNPCxO8OQz7VXdtTLtRPa7vKIEhtJUZl9gYwdemmTZDBCjTeyjEDeOCr7TaRqx65y6tksSNbNYww6umGDQvoXiOYhnrLUqop0osh4u4t6UaM6WMp7KB5pvKEEbsZqb+Uq5UjSZuL1DcPNbHrfMe/r/iHur1j/+y8AKhdaPBsf8HH3yw3ZuKKKE3uVOlJ0e5fbmsxhEj4k09f8qYyhBBAGfkqUQdJSckwZRNzh1RdNJvBJAWXr16dXV35VQetwjlRtsfy8Y9iEjhLSrdm6csw5yVTOfeLLnI3zRvSn3bpjME00UiiO2L13pD1ufi+gbN/OZmh6vc1NCDcGW5D6WvimE3aoOA3Jx9+/b9lA18OP+9579GZTylcZPQAsKiz+Pf285TWX/zTWeIIALR12FGbzbbgcSKO6Uqf5F0V086l6UnXKy4SE0LCDfrarSHEThUm/j1Y/zjll/dwfOUx741hHDuCiIeeyrrT74lDBFECG9GEt37NZ00VOLS/UHO2zpcenZJjl0x3zfmEpmsDIg5vMeLA0HnmUrATTJCr//jLVyjcixbsZyhRHGxc6+2bds6L74xKutPmqUdxXHoXI5GrxG809YIORnVbP5uRW86MSkxm17FmUg8ObdPdyUM+lcuAojWtsn+f79y5cofEpVVRBRUbZ6v78A+wrI1CSvycGaLW/x9hW0pQwQZ/iXEQJaLSkZTnP81eAaC3EZZMbtyoH2f9oUwlrAJ6A7F9JIe2vQdboPrxGwqz3uELzD1Zdm3vuc6wRisAAHNOD1cyxkioW1jxoxxTHG0XX3seQwMcRlpK6MP7b4Qy80RPeLuvpkBEkNu6LbK5c43ETrao13X4Za4Ru7geMoj3Hs4M64UA+AtT2W9zbecIYII+oljijNqX9EiFh0dvQTpp4z8YzBtunpnL2iGO84p2Y9UmvbpSqri5tCKzL6DIvEZ/b777rtrKLDtsJA04cq/ukZlvEnDNfYOHvFReGQ6wqW9qeOpTFAYIkjIFMcAuViLkHTMmjVrRtKxn0BcpJgz8PzIwiZdipPBwdifamOTGqKto95lOSL2ZJoYE/knkWXlBmwUtwwy6rkRtTta+ChV1uiJFHiRgdK+bNmyrVauXOmVHmMEB0Uzhqjc4UZ5/qSZtiGxlg6iE42H5GPMcLUZyWjPp0WUGxJ+Qlnbz4iNaNasWTfCzjIxK2Jw5RT3oMEyCrXl1buM/nr16r3LPfD1iWePxMCYg83/Pp4ku4YOHdpG+88icWo4xkZ/XtVVTxECWBI7gtO/kcr2EstyGhpiEADuqjJ8n5RbiNS30ZMBsJw9ya2R1KieUVroCNeoVxIwzS3nExCvv23TIYbYjPUhhoQYYrMesBk6oRkSYojNesBm6IRmSIghNusBm6ETmiEhhtisB2yGzv8Aw1xSHnmNYzMAAAAASUVORK5CYII=',//上传控件默认图
  imgSize:'?x-oss-process=image/resize,m_pad,h_150,w_150,color_FFFFFF',//用户图片默认缩略图后缀
  carouselImgSize:'?x-oss-process=image/resize,m_pad,h_100,w_480,color_FFFFFF'//用户图片默认缩略图后缀
}

//设置壳工程请求地址
baseConf.requestApiUrl = {
}

// 认证中心Url
  baseConf.loginUrl = ``,
// 上传签名url
baseConf.getPolicyUrl = ``,

baseConf.ENV = ENV

// module.exports = baseConf

let listConfig = baseConf.listConfig
let downLoadUrl = baseConf.downLoadUrl
let baseURL = baseConf.baseURL

export default baseConf

export {
  listConfig,
  downLoadUrl,
  baseURL,
}
