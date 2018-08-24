
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
    this.setData({dataList: e.detail.dataList})
  },

  onPullDownRefresh: function(){

    this.setData({ refresh: true, params:{} })

  }




})