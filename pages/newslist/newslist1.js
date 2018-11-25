
const app = getApp()
let AppHttp = require('../FrameWorks/AppHttp/AppHttp.js');
let CoreListClass = require("../FrameWorks/CoreListClass/CoreListClass.js")

// 提交wx.createRecycleContext能力
const createRecycleContext = require('../FrameWorks/RecycleView/index.js')

let data = require('./data.js')
let j = 1
data = data.response.data

Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {},
    corelist_params: {},
    name: "list1"
  },

  onLoad: function () {

    app.AppHttp = AppHttp

    let list1 = new CoreListClass()

    let url1 = "https://abcstarapi.zhongsuchina.com/art/basic/index"
    let params1 = { "item": "101" }
    list1.prepare(this, "list1", url1, params1)


    let list2 = new CoreListClass()

    let url2 = "https://abcstarapi.zhongsuchina.com/art/basic/index"
    let params2 = { "item": "102" }
    list2.prepare(this, "list2", url2, params2)

    let info = wx.getSystemInfoSync()
    let screenWidth = info.screenWidth
    

    //这个是管理列表数据的对象
    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'arr',
      page: this,
      itemSize: function (item, index) {

        return {
          width: screenWidth,
          height: 100
        }
      }
    })

    // this.ctx = ctx;

    // this.showArr()

  },

  showArr: function () {

    var arr = []

    for (let i = 0; i < 500; i++) {

      let id = i + 1

      let each = { id: id + "", title: "我是第" + id + "个" }

      arr.push(each)

    }

    this.ctx.append(arr, function (res) {

      console.log("追加完成")

    })

  }


})