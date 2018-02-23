// pages/fankui/fankui.js
var product = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textValue:"",
  },
  textInput:function(e){
    this.setData({
      textValue:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  formSubmit: function () {
    // 验证内容
    var that=this
    if (that.data.textValue==""){
      wx.showToast({
        title: '内容不得为空!',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (that.data.textValue.length <5){    //验证字数
      wx.showToast({
        title: '内容至少5个字!',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else{
      var user=wx.getStorageSync("user")
      var prame = {
        "opt": "feedback",
        "data": '{"phoneNumber" : "' + user + '" , "content" : "' + that.data.textValue + '" }'
      }
      if(user.length!=0){
        product.POST(
          {
            params: prame,
            success: function (res) {
              if (res.data.status == "yes") {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 1500
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              } else {
                wx.showToast({
                  title: '提交失败',
                  icon: 'loading',
                  duration: 1500
                })
              }
            },
            fail: function () {
              //失败后的逻辑
            },
          })
      }  
    }
  }
})