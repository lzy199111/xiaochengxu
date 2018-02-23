// pages/details/details.js
var product = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientHeight:0,
    progress:"0",
    detailBanner:"https://app.chainson-asset.com/Public/Uploads/resource/3.0/prodBanner.png",
    prodetail:[],
    currentTab: 0,
    user:'',
    id:'',
    collect:'',
    collectText:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that=this;
    var pto_id = option.id
    this.setData({
      user: wx.getStorageSync('user'),
      id: pto_id
    })
    var productDetails = {
      "opt": "productDetails",
      "data": '{"proId" : "' + pto_id + '" , "phoneNumber" : "' + that.data.user + '" }'
    }
    product.POST(
      {
        params: productDetails,
        success: function (res) {
          that.setData({
            prodetail: res.data.product,
            collect: res.data.collect,
            collectText: res.data.collect == "no" ? '点击收藏' : '取消收藏'
          })
        },
        fail: function () {
          //失败后的逻辑
        },
      })
    wx.getSystemInfo({ 
      success: function (res) {
        that.setData({
          "clientHeight":res.windowHeight-238
        });
      }
    });
    
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  liulan:function(e){  
    var that=this
    var url = e.target.dataset.id
    wx.showLoading({
      title: '正在加载...',
      mask:true,
    })
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: "pdf",
          success: function (res) {
            wx.hideLoading()
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
    
  },
  // 视频
  videoLook:function(e){
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../video/video?url='+url,
    })
  },
  // 感兴趣
  interested:function(){
    var that = this
    var productDetails = {
      "opt": "productDetails",
      "data": '{"proId" : "' + this.data.id + '" , "phoneNumber" : "' + this.data.user + '" }'
    } 
    var aa=this.data.collect=="no"?"save":"cancel"
    var productCollection = {
      "opt": "productCollection",
      "data": '{ "phoneNumber" : "' + that.data.user + '" ,"productId" : "' + that.data.id + '","action" : "' + aa + '" }'
    }
    if(that.data.collect=="no"){
      product.POST(
        {
          params: productCollection,
          success: function (res) {
            if (res.data.status == "yes") {
              product.POST(
                {
                  params: productDetails,
                  success: function (res) {
                    that.setData({
                      collect: res.data.collect
                    })
                  },
                })
              wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 1500
              })
              that.setData({
                collectText: '取消收藏',
              })
            }
          },
        }) 

    } else if (that.data.collect == "yes"){
      product.POST(
        {
          params: productCollection,
          success: function (res) {
            if (res.data.status == "yes") {
              product.POST(
                {
                  params: productDetails,
                  success: function (res) {
                    that.setData({
                      collect: res.data.collect
                    })
                  },
                })
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 1500
              })
              that.setData({
                collectText: '点击收藏',
              })
            }
          },
        })
    }    
  },
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  }
})