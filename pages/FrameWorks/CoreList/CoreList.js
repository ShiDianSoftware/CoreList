// pages/FrameWorks/CoreList/CoreList.js
const app = getApp();

let AppHttp = require('../AppHttp/AppHttp.js');

// 提交wx.createRecycleContext能力
const createRecycleContext = require('../RecycleView/index.js')

const info = wx.getSystemInfoSync()
const screenWidth = info.screenWidth

Component({

  /**
   * 组件的初始数据
   */
  data: {
    name:"list1",
    dataList: [], //数据
    has_more: true, //是否有更多数据

  },

  ready: function() {

    this.p = 1
    this.ps = 10
    this.recycleViewPrepare()

    this.headerRefresh()


  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    recycleViewPrepare: function(){

      let id = this.id
      let rowH = this.rowH
      let page = this.page

      //这个是管理列表数据的对象
      var ctx = createRecycleContext({
        id: "list11",
        dataKey: 'dataList',
        page: this,
        itemSize: function (item, index) {

          return {
            width: screenWidth,
            height: rowH //单位px
          }
        }
      })

      console.log(ctx)

      this.ctx = ctx

    },

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

        weak_self.setData({ has_more: has_more})

        weak_self.pageSetData(ms)

      }, function() {

        weak_self.p--

      })
    },

    pageSetData: function(ms) {
      
      this.ctx.append(ms)

    }

  }

})