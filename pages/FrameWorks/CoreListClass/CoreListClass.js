const app = getApp()


//使用说明
/*

// 引入列表框架
let CoreListClass = require("../FrameWorks/CoreListClass/CoreListClass.js")

// 初始化对象
let list1 = new CoreListClass()
let url1 = "https://abcstarapi.zhongsuchina.com/art/basic/index"
let params1 = {}
list1.prepare(this, "list1", url1, params1, "arr1")

<!-- 注意 id唯一,且id_top为顶部刷新时回到顶部的变量 -->
  <scroll - view id = "list1" scroll - top="{{list1_top}}" scroll - y class='width_100 height_100' lower - threshold="50" enable - back - to - top="{{true}}" bindscrolltolower = "loadMore" >
    </scroll - view>

*/

let CoreListClass = function () { }

//默认值
CoreListClass.prototype.p = 1
CoreListClass.prototype.ps = 10
CoreListClass.prototype.first_show_index = 0


//rowH = 行高 + 间距
CoreListClass.prototype.prepare = function (page, id, url, params) {

  this.page = page
  this.id = id
  this.url = url
  this.params = params


  let weak_self = this

  //页面下拉加载更多
  let loadMore = id + "loadMore" 

  page[[loadMore]] = function (e) {

    let load_more_id = e.target.id
    
    if (load_more_id != weak_self.id) {
      return
    }

    weak_self.footerRefresh()

  }

  this.headerRefresh()

}

//顶部刷新
CoreListClass.prototype.refresh = function (params_new) { this.headerRefresh(params_new)}

//顶部刷新
CoreListClass.prototype.headerRefresh = function (params_new) {


  if (params_new != null) {
    this.params = params_new
  }

  let weak_self = this

  //页码回到初始化的1
  this.p = 1

  let url = this.url
  let params = this.params
  params.page = this.p
  params.page_size = this.ps


  app.AppHttp.post(url, params, 1, function (arr) {

    let length = arr.length

    let has_more = length >= weak_self.ps

    weak_self.has_more = has_more

    //本地记录
    weak_self.arr = arr

    weak_self.showData(true)

  }, function () {

  })
}

//加载更多
CoreListClass.prototype.footerRefresh = function () {

  let weak_self = this

  if (!weak_self.has_more) {
    return
  }

  //页码自增
  this.p++

  let url = this.url
  let params = this.params
  params.page = this.p
  params.page_size = this.ps
  let arr_key = this.id

  app.AppHttp.post(url, params, 0, function (arr) {

    let has_more = arr.length >= weak_self.ps

    if (!has_more) {

      //页码回退
      weak_self.p--
    }

    let arr_old = weak_self.arr

    let arr_new = arr_old.concat(arr)

    weak_self.arr = arr_new

    weak_self.has_more = has_more

    weak_self.showData(false)

  }, function () {

    //加载失败,页码回退
    weak_self.p--

  })
}

//加载更多
CoreListClass.prototype.showData = function (is_top) {

  let arr = this.arr
  let length = arr.length

  let final_arr = this.arr

  let id = this.id
  let arr_key = id
  let top_key = id + "_top"
  let fotter_view_key = id + "_str"

  let fotter_view_str = this.has_more ? "正在加载数据 ~" : "没有更多啦 ~"

  if (is_top) { //顶部刷新

    this.page.setData({
      [arr_key]: final_arr,
      [top_key]: 0,
      [fotter_view_key]: fotter_view_str
    })

  } else {

    this.page.setData({
      [arr_key]: final_arr,
      [fotter_view_key]: fotter_view_str
    })

  }
}

module.exports = CoreListClass