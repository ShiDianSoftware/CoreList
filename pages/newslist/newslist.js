
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

    let list1 = this.selectComponent('#list1')
    list1.url = "https://abcstarapi.zhongsuchina.com/art/basic/index"
    list1.page = this
  

  },


})
