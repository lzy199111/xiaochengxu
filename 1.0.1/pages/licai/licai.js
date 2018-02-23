//index.js
//获取应用实例
var app = getApp()
var product = require('../../utils/util.js')
var productFun = product.productDetail
var prames = {"opt": "product"}
Page({
  data: {
    // 热销产品数据
    productHot:[],
  },
  //事件处理函数
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that=this
    product.POST(
      {
        params: prames,
        success: function (res) {
          wx.hideLoading()
          that.setData({
            productHot: res.data.product
          })
        },
        fail: function () {
          //失败后的逻辑
        },
      }) 
  },
  details: productFun,
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  }
})
