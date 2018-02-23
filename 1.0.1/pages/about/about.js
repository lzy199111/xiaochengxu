// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerSrc:"https://app.chainson-asset.com/Public/Uploads/resource/3.0/about.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onShareAppMessage: function () {
    return {
      title: '乾晟资产-简介',
    }
  },


})