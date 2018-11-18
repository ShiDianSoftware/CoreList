
const app = getApp()
let AppHttp = require('../FrameWorks/AppHttp/AppHttp.js');
let CoreListClass = require("../FrameWorks/CoreListClass/CoreListClass.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{},
    corelist_params:{}
  },

  onLoad: function(){

    app.AppHttp = AppHttp
    
    let list1 = new CoreListClass()

    let url1 = "https://abcstarapi.zhongsuchina.com/art/basic/index"
    let params1 = {}
    list1.prepare(this, "list1", url1, params1)



  }
})