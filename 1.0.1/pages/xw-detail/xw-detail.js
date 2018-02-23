// pages/detail/detail.js
var WxParse = require('../../utils/wxParse/wxParse.js');
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsAll:{},
    content:""
  },
  onLoad:function(options){
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    var numId = options.numId
    wx.request({
      url: 'https://app.chainson-asset.com/admin.php/App/api',
      method: "post",
      data: {
        opt: 'news',
      },
      dataType: "json",
      success: function (res) {
        wx.hideLoading()
        var cont = res.data.news[numId - 1].content
        var article = cont.replace(/<section.*?>/gi, "\r\n")
        WxParse.wxParse('article', 'html', article, that, 0);
        that.setData({
          newsAll: res.data.news[numId-1],
          // content: app.convertHtmlToText(res.data.news[numId - 1].content)
        })
      },
    })
  },

    

  
  

  
})