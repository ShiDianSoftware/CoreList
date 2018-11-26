
const app = getApp()
let AppHttp = require('../FrameWorks/AppHttp/AppHttp.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function () {

    app.AppHttp = AppHttp
    const info = wx.getSystemInfoSync()
    const screenWidth = info.screenWidth
    let list1 = this.selectComponent('#list1')
    list1.url = "https://abcstarapi.zhongsuchina.com/art/basic/index"
    list1.page = this
    list1.itemSize = { width: screenWidth, height:100}
    // list1.itemSize = function(item, index){
    //   let sizeObj = { width: screenWidth, height: 100 }
    //   return sizeObj
    // }

    let list2 = this.selectComponent('#list2')
    list2.url = "https://abcstarapi.zhongsuchina.com/art/basic/index"
    list2.page = this
    list2.itemSize = { width: screenWidth, height: 100 }

  },

  headerRefreshStatus: function(status){
    
  }

})
