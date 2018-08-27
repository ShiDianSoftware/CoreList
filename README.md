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
2.在需要用到的页面引入，其中CoreList是组件，

            {
              "usingComponents": {
                "corelist": "../FrameWorks/CoreList/CoreList"
              },
              "enablePullDownRefresh": true
            }
    
同时，把如果代码复制


        showData: function(e){

          this.setData({ [e.detail.dataListKey]: e.detail.dataList})
        },

     


最后在wxml中直接使用： 

            <corelist url="https://abcstarapi.zhongsuchina.com/test/index/index" params="{{corelist_params}}" name="corelist" action="{{action}}" bind:showData="showData">

              <view class='list' wx:for="{{corelist_dataList}}">
              </view>

            </corelist>


其中，url为请求链接，params为参数（由name_params变量区分决定参数值），name是列表的名字，默认为corelist，因为对应的数组也是名字拼接上_dataList即为：corelist_dataList， action是刷新指定，初始化为空字符串，如果需要刷新指定的列表，需要在当前页面执行以下方法：

             this.setData({ action: "bot", bot_params: {} }) //action是对应列表的名字， bot_params为bot对应列表的新的参数，参数此时可以省略，表示继续使用当前的参数
