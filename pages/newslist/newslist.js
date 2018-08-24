
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{}
  },

  onLoad: function(){

  },

  showData: function(e){

    this.setData({ [e.detail.dataListKey]: e.detail.dataList})
  },

  onPullDownRefresh: function(){

    this.setData({ action: "corelist", params: {} })
    
    this.setData({ action: "bot", params: {} })

  }




})