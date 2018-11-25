// pages/FrameWorks/CoreList/CoreList.js
const app = getApp();

let AppHttp = require('../AppHttp/AppHttp.js');

Component({

  /**
   * 组件的初始数据
   */
  data: {

    dataList: [], //数据
    has_more: true, //是否有更多数据

  },

  ready: function() {

    this.p = 1
    this.ps = 10

    this.headerRefresh()
  },

  /**
   * 组件的方法列表
   */
  methods: {

    refresh: function(params) {

      if (params != null) {
        this.params = params
      }

      this.headerRefresh()

    },

    headerRefresh: function() {

      let weak_self = this

      let url = this.url

      let params = this.params || {}

      //页码回到初始化 = 1
      this.p = 1

      params.page = this.p
      params.page_size = this.ps

      AppHttp.post(url, params, 0, function(ms) {

        let count = ms.length

        let has_more = count >= weak_self.ps

        //记录数据
        weak_self.setData({
          dataList: ms,
          has_more: has_more,
          top: 0
        })

        weak_self.pageSetData(ms)


      }, function(e) {

      })



    },

    //底部刷新
    footerRefresh: function() {

      let weak_self = this

      if (!this.data.has_more) {
        return
      }

      //页码回到初始化 = 1
      this.p++

        let url = this.url
      let params = this.params || {}
      params.page = this.p
      params.page_size = this.ps

      AppHttp.post(url, params, 0, function(ms) {

        let has_more = ms.length >= weak_self.ps

        if (!has_more) {

          weak_self.p--
        }

        let ms_old = weak_self.data.dataList

        let ms_new = ms_old.concat(ms)

        //框架记录
        weak_self.setData({
          has_more: has_more,
          dataList: ms_new
        })

        weak_self.pageSetData(ms_new)


      }, function() {

        weak_self.p--

      })
    },

    pageSetData: function(ms) {

      this.page.setData({
        dataList: ms
      })

    }

  }

})