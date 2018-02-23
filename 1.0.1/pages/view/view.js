// pages/view/view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = options.url
    this.setData({
      srcUrl: url
    })
  },

})