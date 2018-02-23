// pages/my/my.js
var app = getApp()
var product = require('../../utils/util.js')
var productFun = product.productDetail
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner图
    topBanner: "https://app.chainson-asset.com/Public/Uploads/resource/3.0/my.jpg",
    logo:"https://app.chainson-asset.com/Public/Uploads/resource/3.0/logo.png",
    // 个人信息
    message:null,
      //vip图表  
    squun:{
      vip:"https://app.chainson-asset.com/Public/Uploads/resource/3.0/vip.png",
      svip: "https://app.chainson-asset.com/Public/Uploads/resource/3.0/svip.png",
      vvip: "https://app.chainson-asset.com/Public/Uploads/resource/3.0/vvip.png",
    },
    // 投资产品数据
    product:[],
    // 感兴趣产品数据
    prodinter: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var value = wx.getStorageSync('user')
    if (value != "") {
      wx.request({
        url: 'https://app.chainson-asset.com/admin.php/App/api',
        method: "post",
        data: {
          "opt": "query",
          "data": '{"phoneNumber" : "' + value + '"}'
        },
        dataType: "json",
        success: function (res) {
          if(res.data.status=="yes"){
            that.setData({
              message: res.data,
              product: res.data.products
            })
          }else{
            that.setData({
              message: '',
              product:[]
            })
          }
          
        },
      })
      wx.request({
        url: 'https://app.chainson-asset.com/admin.php/App/api',
        method: "post",
        data: {
          "opt": "productCollectionList",
          "data": '{"phoneNumber" : "' + value + '"}',
        },
        dataType: "json",
        success: function (res) {
          that.setData({
            prodinter: res.data.product == null ? [] : res.data.product,
          })
          
        },
      })
    
    } else {
      wx.clearStorage()
      that.setData({
        message: null,
        product: [],
        prodinter:[],
      })
    }
  },
  onShow:function(){
    this.onLoad()
  },
  // 设置
  set:function(){
    var value = wx.getStorageSync('user')
    if (value==""){
      wx.showToast({
        title: '请点击登录',
        icon: 'loading',
        duration: 1500
      })
    }else{
      wx.navigateTo({
        url: '../set/set',
      })
    }
    
  },
  lookMore:function(event){
    var vipname=event.currentTarget.dataset.vipname;
    if(vipname=="normal"){
      wx.showToast({
        title: '您尚不是vip',
        icon: 'loading',
        duration: 1500
      })
    }else{
      wx.navigateTo({
        url: '../Membership/Membership?vipname=' + vipname,
      })
    }
    
  },
  login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  lookOther:function(){
    wx.switchTab({
      url: '../licai/licai',
    })
  },
  // 认证
  renzh:function(e){
    var status = e.currentTarget.dataset.status
    if (status=="已认证"){
      wx.showToast({
        title: '您已认证',
        icon: 'loading',
        duration: 1500
      })
      return false
    }else{
      wx.navigateTo({
        url: '../renzh/renzh',
      })
    }
    
  },
  // 产品详情
  lookDetail: productFun,
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  }

})

