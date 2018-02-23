//index.js
//获取应用实例
var app = getApp()
var pobj = require('../templast-list/templast-list.js')
var product = require('../../utils/util.js')
var productFun = product.productDetail
var json2Form = product.json2Form
var newData = { opt: 'news', }
var productData = { "opt": "product", }
var bannerData = { "opt": "homeBanner", }
app.getUserInfo()
Page({
  data: {
    userInfo:{},
    newsData: [],//获取新闻数据
    autoplay:'true',
    interval:2000,
    duration:1000,
    circular:'true',
    imgUrls:[],
    product:{},
    news:{
      bannerSrc:"https://app.chainson-asset.com/Public/Uploads/resource/3.0/news.jpg",
    },
    shouce: {
      bannerSrc: "https://app.chainson-asset.com/Public/Uploads/resource/3.0/news.jpg",
    },
    // 手册
    shouceData: [
      { id: "1", "newSrc": "https://app.chainson-asset.com/Public/Uploads/resource/3.0/shouce.jpg", title: "企业手册" },
    ],
    video: {
      bannerSrc: "https://app.chainson-asset.com/Public/Uploads/resource/3.0/videoBanner.png",
    },
  },
  //事件处理函数

  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    app.getUserInfo(function (userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
    pobj.init.apply(this, [])
   //新闻请求 
    product.POST(
      {
        params: newData,
        success: function (res) {
          that.setData({
          newsData:res.data.news.slice(0, 2)
        })
        },
        fail: function () {
          wx.showToast({
            title: '加载失败',
          })
        },
      })
//产品请求  
    product.POST(
      {
        params: productData,
        success: function (res) {
          that.setData({
            product: res.data.product
          })
        },
        fail: function () {
          wx.showToast({
            title: '加载失败',
          })
        },
      })
      // 顶部轮播
    product.POST(
      {
        params: bannerData,
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          that.setData({
            imgUrls: res.data.banner.image
          })
        },
        fail: function () {
          wx.showToast({
            title: '加载失败',
          })
        },
      })   
  },
  // 企业介绍
  about:function(){
    wx.navigateTo({
      url: '../../pages/about/about',
    })
  },
  // 推荐有礼
  tuijian:function(){
    wx.showToast({
      title: '敬请期待',
      icon: 'loading',
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)

  },
  caifu:function(){
    wx.showToast({
      title: '敬请期待',
      icon: 'loading',
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  },
  // 全国布局
  buju:function(){
    wx.navigateTo({
      url: '../../pages/buju/buju',
    })
  },
  // 电话
  tel:function(){
    wx.makePhoneCall({
      phoneNumber: '4000615801',
    })
  },
  // 反馈意见
  fankui: function () {
    wx.navigateTo({
      url: '../../pages/fankui/fankui',
    })
  },
  // 产品详情
  details: productFun,
  // 查看更多
  commonMore:function(e){
    var that=this
    var common = e.currentTarget.dataset.common
    wx.navigateTo({
      url: '../news-detail/news-detail?common='+common,
    })
  },
  // 手册跳转
  shouceAll:function(){
    wx.navigateTo({
      url: '../shouce/shouce',
    })
  },
  // 视频跳转
  videoLook: function () {
    wx.navigateTo({
      url: '../video/video',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '乾晟资产',
    }
  },
  onPullDownRefresh:function(){
    this.onLoad()
    wx.stopPullDownRefresh()
  },
  imgLook:function(){
    wx.navigateTo({
      url: '../view/view',
    })
  }


})
