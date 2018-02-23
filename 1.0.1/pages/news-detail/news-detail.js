// pages/news-detail/news-detail.js
var app = getApp()
var pobj = require('../templast-list/templast-list.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lisData:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pobj.init.apply(this, [])
    var common=options.common
    var that=this
    if(common=="news"){
      wx.request({
        url: 'https://app.chainson-asset.com/admin.php/App/api',
        method: "post",
        data: {
          opt: 'news',
        },
        dataType: "json",
        success: function (res) {
          that.setData({
            lisData: res.data.news
          })
        },
      })
    }
  },

})