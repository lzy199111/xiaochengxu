// pages/tuijian/tuijian.js
var product = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    points:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var value = wx.getStorageSync('user')
    this.setData({
      phoneNum:value
    })
    var tuijian = {
      opt: "recommend",
      data:{"phoneNumber":this.data.phoneNum}
    }
    product.POST(
      {
        params: tuijian,
        success: function (res) {
          that.setData({
            num: res.data.number,
            points: res.data.points
          })
        },
        fail: function () {
          wx.showToast({
            title: '加载失败',
          })
        },
      }) 
  },
  fan:function(){
    wx.navigateTo({
      url: '../fenxiang/fenxiang',
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '推荐好友送积分',
      path: '/pages/fenxiang/fenxiang?phoneNum=' + this.data.phoneNum,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon:"success"
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: "success"
        })
      }
    }
  },
})