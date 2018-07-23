//CoreHttp 2017.07.14 by Charlin

const app = getApp()

//定义一个对象
function CoreHttp() { }

//扩展方法
//GET
CoreHttp.get = function (url, params, successClosure, errorClosure) {

  let weakSelf = this

  let lang = app.lang_type == 0 ? "zh" : "en"

  let token = app.u == null ? "" : app.u.token
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: params == null ? {} : params,
    header: {
      'content-type': 'application/json',
      'token': token,
      lang: lang
    },
    method: "GET",
    success: function (o) {

      weakSelf.handleResult(url, params, true, o.data, successClosure, errorClosure)
    },
    fail: function (e) {

      weakSelf.handleResult(url, params, false, e, successClosure, errorClosure)
    }
  })
  
}

//POST
CoreHttp.post = function (url, params, successClosure, errorClosure) {

  let weakSelf = this
  let token = app.u == null ? "" : app.u.token
  let lang = app.lang_type == 0 ? "zh" : "en"
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: params == null ? {} : params,
    header: {
      'content-type': 'application/json',
      'token': token,
      lang: lang
    },
    method: "POST",
    success: function (o) {

      weakSelf.handleResult(url, params, true, o.data, successClosure, errorClosure)
    },
    fail: function (e) {

      weakSelf.handleResult(url, params, false, e, successClosure, errorClosure)
    }
  })
}


CoreHttp.upload = function (url, params, key, path, successClosure, errorClosure){


  let weakSelf = this
  let token = app.u == null ? "" : app.u.token
  let lang = app.lang_type == 0 ? "zh" : "en"
  wx.uploadFile({
    url: url, 
    filePath: path,
    name: key,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'token': token,
      lang: lang
    },
    formData: params,
    success: function (o) {
      let data_obj = JSON.parse(o.data)
      weakSelf.handleResult(url, params, true, data_obj, successClosure, errorClosure)
    },
    fail: function (e) {

      weakSelf.handleResult(url, params, false, e, successClosure, errorClosure)
    }
  })
}

//数据解析: 请根据服务器特点自行解析各自数据
CoreHttp.handleResult = function (url, params, isSuccess, res, successClosure, errorClosure) {

  if (isSuccess) {

    if (res.code != 200) { //数据请求成功，服务器抛出错误


      let errorMsg = res.desc
      errorClosure(errorMsg)

    } else { //真正的请求成功

      let dataObj = res
      successClosure(dataObj)
    }

  } else {

    errorClosure(res.errMsg)
  }

}

module.exports = CoreHttp
