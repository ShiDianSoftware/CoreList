// pages/FrameWorks/CoreList/CoreList.js

let AppHttp = require('../AppHttp/AppHttp.js');

Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {

   
    url:{type:String},
    params: {type: Object},

    name:{type: String,value:"corelist"},

    action: { //刷新页面
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        
        this.refreshAction()
      }
    }, 

  },

  /**
   * 组件的初始数据
   */
  data: {

    p:1,
    ps:10,
    dataList:[], //数据
    top:0,//滚动条的位置
    has_more: true, //是否有更多数据

  },

  ready: function () {

    this.headerRefresh()
  },

  /**
   * 组件的方法列表
   */
  methods: {

    refreshAction: function(){

      let name = this.properties.name

      let action = this.properties.action

      console.log("name=" + name, "action=" + action)

      if(name != action) {return}
      
      this.headerRefresh()

    },

    headerRefresh: function() {

      this.properties.action = ""

      let weak_self = this

      let url = this.properties.url

      let params = this.properties.params || {}

      //页码回到初始化 = 1
      this.data.p = 1

      params.page = this.data.p
      params.page_size = this.data.ps
      
      AppHttp.post(url, params, 0, function (ms) {
       
        setTimeout(function(){
          //结束顶部刷新
          wx.stopPullDownRefresh()
        },500)


        //如果是刷新且上次没有数据的情况下,需要主动触发一次底部刷新
        // if (!weak_self.data.has_more) {

        //   setTimeout(function () {

        //     weak_self.footerRefresh()

        //   }, 200)
        // }

        let count = ms.length

        let has_more = count >= weak_self.data.ps
        //记录数据
        weak_self.setData({ dataList: ms, has_more: has_more, top: 0 })

        weak_self.pageSetData(ms)


      }, function (e) {

        wx.stopPullDownRefresh()

      })



    },

    //底部刷新
    footerRefresh: function(){

      console.log("footerRefresh")
      
      let weak_self = this

      if (!this.data.has_more) { return }

      //页码回到初始化 = 1
      this.data.p++

      let url = this.properties.url
      let params = this.properties.params || {}
      params.page = this.data.p
      params.page_size = this.data.ps

      AppHttp.post(url, params, 0, function (ms) {
   
        wx.stopPullDownRefresh()

        let has_more = ms.length >= weak_self.data.ps

        if (!has_more) {

          weak_self.data.p--
        }

        let ms_old = weak_self.data.dataList

        let ms_new = ms_old.concat(ms)

        //框架记录
        weak_self.setData({ has_more: has_more, dataList: ms_new })

        weak_self.pageSetData(ms_new)


      },function(){

        weak_self.data.p--

        wx.stopPullDownRefresh()

      })
    },

    pageSetData: function(ms){

      let name = this.properties.name
      let dataListKey = name + "_dataList"

      var myEventDetail = { dataList: ms, dataListKey: dataListKey} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('showData', myEventDetail, myEventOption)

    }


  }

  

})
