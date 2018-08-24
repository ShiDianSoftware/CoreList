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

            <corelist url="https://abcstarapi.zhongsuchina.com/test/index/index" params="{{params}}" name="corelist" action="{{action}}" bind:showData="showData">

              <view class='item' wx:for="{{corelist_ms}}">

                <view>{{index+1}}</view>
                <view>{{index+1}}: {{item.title}} {{count}}</view>
                <view>{{index+1}}: {{item.content}}</view>
              </view>

            </corelist>


其中，url为请求链接，params为参数，name是列表的名字，默认为corelist，因为对应的数组也是名字+ms即为：corelist_ms， action是刷新指定，初始化为空字符串，如果需要刷新指定的列表，需要在当前页面执行以下方法：

             this.setData({ action: "bot", params: {} }) //action是对应列表的名字， params为参数
