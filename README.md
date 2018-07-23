# CoreList
# wx.CoreList
此框架是Charlin出品的大型iOS框架CoreList的小程序版本。

一.框架截图
==========


![image](https://github.com/ShiDianSoftware/Resource/blob/master/CoreList/a.gif)


![image](https://github.com/ShiDianSoftware/Resource/blob/master/CoreList/b.gif)


二.快速集成
==========

1.将 CoreList文件夹导致到FrameWorks文件夹中
2.在需要用到的页面引入，其中CoreList是组件， CoreListTool是网络请求封装

      let CoreListTool = require("../FrameWorks/CoreList/CoreListTool.js")
    
同时，把如果代码复制

      onLoad: function(){

        CoreListTool.prepare(this, "https://abcstarapi.zhongsuchina.com/test/index/index",{},100,200)

      },

      onPullDownRefresh: function(){
        CoreListTool.onPullDownRefresh()
      },

      onReachBottom: function(){
        CoreListTool.onReachBottom()
      }

修改对应的配置文件为：

    {
      "enablePullDownRefresh": true,
      "usingComponents": {
        "corelist": "../FrameWorks/CoreList/CoreList"
      }
    }


最后在wxml中直接使用：

    <corelist top="{{top}}" bottom="{{bottom}}" has_more="{{has_more}}" class='corelist' >

，特别注意： 使用页面的刷新，页面的布局需要全屏化。
