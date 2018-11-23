
const app = getApp()
let AppHttp = require('../FrameWorks/AppHttp/AppHttp.js');
let CoreListClass = require("../FrameWorks/CoreListClass/CoreListClass.js")

// 提交wx.createRecycleContext能力
const createRecycleContext = require('../FrameWorks/RecycleView/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{},
    corelist_params:{},
    name:"list1"
  },

  onLoad: function(){

    app.AppHttp = AppHttp
    
    let list1 = new CoreListClass()

    let url1 = "https://abcstarapi.zhongsuchina.com/art/basic/index"
    let params1 = {"item":"101"}
    list1.prepare(this, "list1", url1, params1)


    let list2 = new CoreListClass()

    let url2 = "https://abcstarapi.zhongsuchina.com/art/basic/index"
    let params2 = { "item": "102"}
    list2.prepare(this, "list2", url2, params2)


    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: {
        props: 'azFirst',
        // cacheKey: 'cacheKey', // 预先缓存的key
        queryClass: 'recycle-itemsize', // 动态查询的class
        dataKey: 'recycleListItemSize', // 预先渲染的数据的wx:for绑定的变量
        // componentClass: 'recycle-list'
      },
      placeholderClass: ['recycle-image', 'recycle-text'],
      // itemSize: function(item) {
      //   return {
      //     width: 195,
      //     height: item.azFirst ? 130 : 120
      //   }
      // },
      // useInPage: true
    })
    this.ctx = ctx;
  },

  onUnload: function () {
    this.ctx.destroy()
    this.ctx = null
  },

  
})