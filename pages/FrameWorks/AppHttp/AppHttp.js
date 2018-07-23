const CoreHttp = require('../CoreHttp/CoreHttp.js')
const base_url = "https://abcstarapi.zhongsuchina.com"

const app = getApp()

//框架定义
function AppHttp() {}

/* 
 * type请求指示类型
 * 
 * 0: None
 * 1: SVP
 * 2: StatusView
 * 
 * */


//GET
AppHttp.get = function (url, params, type, successClosure, errorClosure) {

  let url_full = base_url + url

  //请求开始处理
  this.requestBegin(type)

  let weakSelf = this

  CoreHttp.get(url_full, params, function (o) { //请求成功回调

    weakSelf.handleSuccess(url_full, o, type, successClosure, errorClosure)
 
  }, function (e) { //请求失败回调

    weakSelf.handleError(e, type, errorClosure)
    
  });
}

//POST
AppHttp.post = function (url, params, type, successClosure, errorClosure) {


  let url_full = url.indexOf("http") != -1 ? url : base_url + url

  //请求开始处理
  this.requestBegin(type)

  let weakSelf = this

  CoreHttp.post(url_full, params, function (o) { //请求成功回调
  
    weakSelf.handleSuccess(url_full, o, type, successClosure, errorClosure)

  }, function (e) { //请求失败回调
 
    weakSelf.handleError(e, type, errorClosure)

  });
}

//upload
AppHttp.upload = function (url, params, type, key, path, successClosure, errorClosure){

  let url_full = base_url + url

  //请求开始处理
  this.requestBegin(type)

  let weakSelf = this

  CoreHttp.upload(url_full, params, key, path, function(o){ //请求成功回调

    weakSelf.handleSuccess(url_full, o, type, successClosure, errorClosure)

  }, function (e) { //请求失败回调

    weakSelf.handleError(e, type, errorClosure)

  });

}


//请求开始
AppHttp.requestBegin = function (type){

  if (type == 0) { //什么都不用做
    
  } else if (type == 1) { //CoreSVP

      wx.showLoading({
        title: '加载中',
      })

  }
}


//服务器返回成功
//处理success
AppHttp.handleSuccess = function (url, o, type, successClosure, errorClosure) {

  wx.hideLoading()
 
  //API层
  let data = o.data
  let code = o.code
  let desc = o.desc

  //api接口状态不正确
  if (code != 200) {

    let error = "code：" + code + "，" + desc

    this.handleError(error, type, errorClosure)

    if (code == 401) {

      app.u = null
      app.Tool.wxLogin()

    }
  console.log("aaaa")
    return
  }

  //数据全部正确
  if (successClosure != undefined) { successClosure(data) }

}

//处理error:
AppHttp.handleError = function (e, type, errorClosure) {

  let err_str = typeof e == "string" ? e : "网络请求失败"

  if (type == 1) {
    wx.hideLoading()
    wx.showModal({
      title: '请求失败',
      content: err_str,
      showCancel: false
    })
  }

  if (errorClosure != null) { errorClosure(err_str) }

}

AppHttp.toApp = function(){

  if (app.AppHttp != null) {return}
  
  app.AppHttp = AppHttp
}


module.exports = AppHttp