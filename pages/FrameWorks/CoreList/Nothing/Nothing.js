let app = getApp();

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    m_play: {
      type: Object
    },
  },

  methods: {

    detail: function () {
      let id = this.properties.m_play.id;
      wx.navigateTo({

        url: "/pages/home/xiangqing/xiangqing?id=" + id,
      })
    }
  }
})
