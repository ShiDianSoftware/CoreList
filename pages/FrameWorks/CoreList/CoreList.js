// pages/FrameWorks/CoreList/CoreList.js
const app = getApp();

let AppHttp = require('../AppHttp/AppHttp.js');

// 提交wx.createRecycleContext能力
const createRecycleContext = require('../RecycleView/index.js')

Component({

  /**
   * 组件的初始数据
   */
  data: {
    id:null, //ready后获取到
    rcid: null, //createRecycleContext对应的id,根据id生成
    has_more: true, //是否有更多数据

  },

  ready: function() {

    let id = this.id
    let rcid = "rc_" + id
    this.setData({ id: id, rcid: rcid})

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

      let rcid = this.data.rcid
      
      let page = this.page
      let itemSize = this.itemSize

      //这个是管理列表数据的对象
      var ctx = createRecycleContext({
        id: rcid,
        dataKey: 'dataList',
        itemSize: itemSize,
        page: this
      })

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

      //顶部刷新开始
      if (weak_self.page.headerRefreshStatus) { weak_self.page.headerRefreshStatus(100) }

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
          has_more: has_more,
          top: 0
        })

        weak_self.pageSetData(ms, true)

        //顶部刷新成功
        if (weak_self.page.headerRefreshStatus) { weak_self.page.headerRefreshStatus(101)}

      }, function(e) {

        //记录数据
        weak_self.setData({
          has_more: false,
          top: 0
        })

        weak_self.pageSetData([], true)
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

        weak_self.pageSetData(ms,false)

      }, function() {

        weak_self.p--

      })
    },

    pageSetData: function(ms, is_headerRefresh) {

      let length = this.ctx.comp.sizeArray.length
      
      if (is_headerRefresh) { 

        this.ctx.splice(0, length, ms)

      }else{
        
        this.ctx.append(ms)
      }

      let nodata = this.ctx.comp.sizeArray.length==0
      this.setData({ nodata: nodata})
    }
  },

  detached: function(){
    
    this.ctx.destroy()
  }

})