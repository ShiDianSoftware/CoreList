const app = getApp()
let info = wx.getSystemInfoSync()
let screenWidth = info.screenWidth

let p = screenWidth / 375

let show_page_num = 5 //展示3页数据


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
CoreListClass.prototype.rowH = 10

//rowH = 行高 + 间距
CoreListClass.prototype.prepare = function (page, id, url, params, rowH) {

  this.page = page
  this.id = id
  this.url = url
  this.params = params
  this.rowH = rowH

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

  //列表滚动
  let scrollAction = id +"ScrollAction"
  
  page[[scrollAction]] = function (e) {

    let id = weak_self.id

    let corelist_obj = [id]

    let load_more_id = e.target.id

    if (load_more_id != id) {
      return
    }

    let scrollTop = e.detail.scrollTop

    let firstRowIndex = scrollTop / weak_self.rowH
    let firstRowIndexInt = parseInt(firstRowIndex)
    let page_num = parseInt(firstRowIndexInt / weak_self.ps)
    
    let page_num_last = weak_self.page_num || 0

    if (page_num == page_num_last) {return}

    //当前最顶行的index
    weak_self.first_show_index = firstRowIndexInt
    //当前index所属分页页码
    weak_self.page_num = page_num
    
    weak_self.showData()
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

  let final_arr = []

  let id = this.id
  let arr_key = id
  let top_key = id + "_top"
  let fotter_view_key = id + "_str"

  //当前最顶行的index
  let first_show_index = this.first_show_index
  //当前index所属分页页码
  let page_num = this.page_num

  //计算当前页面前后的分页数
  //3=1+1+1, 5=2+1+2
  let page_nums_LR = (show_page_num - 1) / 2

  let start_index = first_show_index - page_nums_LR * this.ps
  if (start_index <= 0) { start_index = 0}

  let end_index = first_show_index + (page_nums_LR + 1) * this.ps
  if (end_index >= length) { end_index = length}
  
  // console.log(first_show_index, page_num, start_index, end_index)

  let arr_range = arr.slice(start_index, end_index)

  //左边的空白数组
  let left_empty_arr = start_index <= 0 ? [] : new Array(start_index)
  let right_empty_length = parseInt(length - end_index)

  if (right_empty_length < 0) { right_empty_length = 0 }

  let right_empty_arr = right_empty_length <= 0 ? [] : new Array(right_empty_length)

  //放入左侧空白数组
  final_arr = final_arr.concat(left_empty_arr)
  //放入中间显示数组
  final_arr = final_arr.concat(arr_range)
  //放入右侧显示数组
  final_arr = final_arr.concat(right_empty_arr)

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