// pages/lics-detail/lics-detail.js
var product = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lics:{},
    user_id:'',
    name:''
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    })
    var id=options.id
    this.setData({
      user_id:id
    })
    var that=this
    var adviserDetails = {
      "opt": 'adviserDetails',
      "data": '{"adviserId" : "' + id + '" }'
    }
    product.POST(
      {
        params: adviserDetails,
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          that.setData({
            lics: res.data.adviser,
            name: res.data.adviser.name
          })
        },
        fail: function () {
          wx.showToast({
            title: '加载失败',
          })
        },
      })
  },
  chose:function(){
    var that=this
    var value = wx.getStorageSync('user')
    if (value == "") {
      wx.showToast({
        title: '请点击登录',
        icon: 'loading',
        duration: 1500
      })
    } else {
      var adviserBook = {
        "opt": "adviserBook",
        "data": '{"adviserId" : "' + that.data.user_id + '" , "phoneNumber" : "' + value + '" }'
      }
      var query = {
        "opt": "query",
        "data": '{"phoneNumber" : "' + value + '"}'
      }
      product.POST(
        {
          params: query,
          success: function (res) {
            if (res.data.status == "yes"){
              var aa = res.data.adviser
              if(aa!=''){
                wx.showToast({
                  title: '已有顾问',
                  icon:"loading"
                })
              }else{
                product.POST(
                  {
                    params: adviserBook,
                    success: function (res) {
                      if (res.data.status == "yes") {
                        wx.showModal({
                          title: '提示',
                          content: '预约成功，我们稍后会联系您',
                          showCancel: false,
                        })
                      } else {
                        wx.showToast({
                          title: '预约失败',
                          icon: 'loading',
                        })
                      }
                    },
                    fail: function () {
                      wx.showToast({
                        title: '加载失败',
                      })
                    },
                  })
              }
            }
          },
          fail: function () {
            wx.showToast({
              title: '加载失败',
            })
          },
        })


      
    }   
  },
  call:function(e){
    var value = wx.getStorageSync('user')
    if (value == "") {
      wx.showToast({
        title: '请点击登录',
        icon: 'loading',
        duration: 1500
      })
    }else{
      var telNumber = e.currentTarget.dataset.telphone
      wx.makePhoneCall({
        phoneNumber: telNumber,
      })
    }
    
  },
  onShareAppMessage: function () {
    return {
      title: '乾晟资产--' + this.data.name,
      path: '/pages/lics-detail/lics-detail?id=' + this.data.user_id,
    }
  },

 
})