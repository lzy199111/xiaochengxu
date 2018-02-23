// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc:"http://www.chainson-asset.com/Public/Uploads/test/1080.mp4",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
    var url = options.url
    console.log(url)
    if(url!=undefined){
      this.setData({
        videoSrc: url
      })
    }
    
    
  },
  
})