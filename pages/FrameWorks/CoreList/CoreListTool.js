let AppHttp = require('../AppHttp/AppHttp.js');


let CoreListTool = function () {}

CoreListTool.page = null
CoreListTool.url = null
CoreListTool.params = null
CoreListTool.p = 1
CoreListTool.ps = 30
CoreListTool.has_more = true
CoreListTool.top = 0
CoreListTool.bottom = 0

CoreListTool.prepare = function(page,url, params,top=0,bottom=0){

  CoreListTool.top = top
  CoreListTool.bottom = bottom
  page.setData({ top: top, bottom: bottom })

  CoreListTool.page = page
  CoreListTool.url = url
  CoreListTool.params = params

 setTimeout(function(){
   CoreListTool.headerRefresh()
 },2000)

}

CoreListTool.onReachBottom = function () {
  
  this.footerRefresh()
}

CoreListTool.headerRefresh = function (params_new) {

  if (params_new != null) { CoreListTool.params = params_new}

  let weak_self = this

  //页码回到初始化 = 1
  CoreListTool.p = 1

  let url = CoreListTool.url
  let params = CoreListTool.params
  params.page = CoreListTool.p
  params.page_size = CoreListTool.ps

  AppHttp.post(url, params, 0, function (ms) {

    weak_self.page.setData({request_begin: true })


    let count = ms.length
    wx.stopPullDownRefresh()
    let has_more = count >= weak_self.ps
    weak_self.has_more = has_more
    
    weak_self.page.setData({ dataList: ms, has_more: has_more, count: count})

  })
}

CoreListTool.footerRefresh = function () {

  let weak_self = this

  if(!weak_self.has_more){return}

  //页码回到初始化 = 1
  this.p++

  let url = CoreListTool.url
  let params = CoreListTool.params
  params.page = CoreListTool.p
  params.page_size = CoreListTool.ps

  AppHttp.post(url, params, 0, function (ms) {

    wx.stopPullDownRefresh()

    let has_more = ms.length >= weak_self.ps

    if (!has_more){
      
      weak_self.p--
    }
    
    console.log(has_more)

    let ms_old = weak_self.page.data.dataList

    let ms_new = ms_old.concat(ms)

    weak_self.has_more = has_more

    weak_self.page.setData({ dataList: ms_new, has_more: has_more})

  })
}








module.exports = CoreListTool

