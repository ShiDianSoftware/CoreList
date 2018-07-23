// pages/newslist.js
let CoreListTool = require("../FrameWorks/CoreList/CoreListTool.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(){

    CoreListTool.prepare(this, "https://abcstarapi.zhongsuchina.com/test/index/index",{},0,200)
    
  },

  onPullDownRefresh: function(){
    CoreListTool.onPullDownRefresh()
  },

  onReachBottom: function(){
    CoreListTool.onReachBottom()
  }

})