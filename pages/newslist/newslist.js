// pages/newslist.js
let CoreListTool = require("../FrameWorks/CoreList/CoreListTool.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(){

    CoreListTool.prepare(this, "https://abcstarapi.zhongsuchina.com/test/index/index",{},200,200)
    
  },

  onReachBottom: function(){
    CoreListTool.onReachBottom()
  }

})