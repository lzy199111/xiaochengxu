// pages/shouce/shouce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg:[
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/01.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/02.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/03.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/04.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/05.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/06.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/07.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/08.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/09.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/10.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/11.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/12.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/13.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/14.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/15.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/16.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/17.jpg",
      "https://app.chainson-asset.com/Public/Uploads/handbook/business/18.jpg",

    ]
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
  
  },

  
})