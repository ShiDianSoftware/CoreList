// pages/FrameWorks/CoreList/CoreList.js
const app = getApp();

let AppHttp = require('../AppHttp/AppHttp.js');

const ps = 10

Component({

  /**
   * 组件的初始数据
   */
  data: {
    can_scroll: true, //页面是否可以滚动
    has_more: true, //是否有更多数据
    request_status: 102, // 102没有请求或请求完成 101开始请求
  },


  ready: function () {



  },


  /**
   * 组件的方法列表
   */
  methods: {

    refresh: function (params) {

      if (params != null) {
        this.params = params
      }

      this.headerRefresh()
    },

    scrollAction: function (e) {

      if (this.data.request_status == 101) {
        if (this.i != null) { clearTimeout(this.i); };return
      }

      let weak_self = this

      //此处为跳过,一定周期内的跳过后,不再跳过,而是强制刷新
      let d1 = new Date()
      let ts1 = d1.valueOf()

      let tsr = weak_self.tsr || 0

      let time_is_too_long = ts1 - tsr > 400

      if (time_is_too_long) {
        
        if (this.i != null) {clearTimeout(this.i);}
        
        weak_self.refreshPages(e)

      }else {
        
        if (this.i != null) { clearTimeout(this.i); }

        this.i = setTimeout(function () {
         
          weak_self.refreshPages(e)

        }, 100)
      }

    },

    refreshPages: function(e){

      if (this.data.request_status == 101) {
        if (this.i != null) { clearTimeout(this.i); }; return
      }

      let scrollTop = e.detail.scrollTop
      let top_index = scrollTop / this.rowH
      let top_page_num = parseInt(top_index / ps)

      let obj = this.calPagenNum(top_page_num)

      this.page.setData({ mini: obj.mini, maxi: obj.maxi })

      let d = new Date()
      let ts = d.valueOf()

      this.tsr = ts 
    },

    calPagenNum: function (page_num){

      let page_num_last = this.page_num

      this.page_num = page_num

      let maxi = page_num + 1
      if (maxi >= this.length - 1) { maxi = this.length -1 }

      let mini = maxi - 2
      if (mini <= 0) { mini = 0 }

      return { mini: mini, maxi: maxi}

    },

    headerRefresh: function () {

      this.requestBegin(true)

      let weak_self = this

      let url = this.url

      let params = this.params || {}

      //页码回到初始化 = 1
      this.p = 1

      params.page = this.p
      params.page_size = ps

      weak_self.setData({ can_scroll: false})

      AppHttp.post(url, params, 0, function (ms) {

        let has_more = ms.length >= ps

        weak_self.data.has_more = has_more

        weak_self.requestSuccess(ms, true)

      }, function (e) {

        weak_self.data.has_more = false

        weak_self.requestSuccess([], true)

        weak_self.setData({ can_scroll: true })

      })



    },

    //底部刷新
    footerRefresh: function () {

      this.requestBegin(false)

      let weak_self = this

      if (!this.data.has_more) {
        return
      }

      //页码回到初始化 = 1
      this.p++

      let url = this.url
      let params = this.params || {}
      params.page = this.p
      params.page_size = ps

      weak_self.setData({ can_scroll: false })

      AppHttp.post(url, params, 0, function (ms) {

        let has_more = ms.length >= ps

        weak_self.data.has_more = has_more

        weak_self.requestSuccess(ms, false)

      }, function () {

        weak_self.p--
        weak_self.setData({ can_scroll: true })
      })
    },

    //请求开始
    requestBegin: function (is_headerRefresh){

      this.setData({ request_status: 101})
    },


    //请求成功
    requestSuccess: function (ms, is_headerRefresh) {

      let weak_self = this

      if(ms==null || ms.length==0) {return}

      let index = this.p-1

      let k_data = "datalist[" + index + "]"

      let p = is_headerRefresh ? this.p : this.p-1

      let obj = this.calPagenNum(p)

      let data_obj = { [k_data]: ms, mini: obj.mini, maxi: obj.maxi }

      this.page.setData(data_obj)

      this.setData({ can_scroll: true, request_status: 102})

    } 
  }

})