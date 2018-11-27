// usingComponents -> /pages/common/component/row/Row
let app = getApp();

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    index:{type: String},
    item: {type: Object}
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  ready: function() {


  },


  /**
   * 组件的方法列表
   */
  methods: {

    detailAction: function(){

      let index = this.properties.index

      console.log(index)
    }
  }
})