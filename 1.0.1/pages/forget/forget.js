// pages/forget/forget.js
var product = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    passWord:'',
    clk:true,
    num:60,
    yanzheng:"获得验证码"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 获取输入手机号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 获取输入密码 
  passWordInput: function (e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  // 验证手机号码格式
  validatemobile: function (mobile) {
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    return true;
  },
  // 获取验证码
  yanzheng:function () {
    var that = this
    var aa = that.validatemobile(that.data.phone)
    var registerCheck = {
      "opt": "registerCheck",
      "data": '{"phoneNumber" : "' + that.data.phone + '"}'
    }
    var messageCheck = {
      "opt": "messageCheck",
      "data": '{"phoneNumber" : "' + that.data.phone + '"}'
    }
    if (aa == true && that.data.clk == true) {
      product.POST(
        {
          params: registerCheck,
          success: function (res) {
            if (res.data.status == "yes") {
              wx.showToast({
                title: '该号码未注册',
                icon: 'loading',
                duration: 1500
              })
            } else if (res.data.status == "no") {
              that.setData({
                clk: false,
                activeCl: true,
                yanzheng: "重新发送" + that.data.num
              })
              var time = setInterval(function () {
                if (that.data.num <= 0) {
                  clearInterval(time)
                  that.setData({
                    clk: true,
                    num: 60,
                    activeCl: false,
                    yanzheng: "重新发送"
                  })
                  return
                }
                that.setData({
                  num: that.data.num - 1
                })
                that.setData({
                  yanzheng: "重新发送" + that.data.num
                })
              }, 1000)
              // 发送验证码请求
              product.POST(
                {
                  params: messageCheck,
                  success: function (res) {
                  },
                  fail: function () {
                    //失败后的逻辑
                  },
                })
            }
          },
          fail: function () {
            //失败后的逻辑
          },
        })
    }
  },
  // 找回密码
  back:function(){
    var that=this
    var aa = that.validatemobile(that.data.phone)
    if (this.data.code.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'loading',
        duration: 1500
      })
      return false
    } else if (this.data.passWord.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (this.data.passWord.length < 6) {
      wx.showToast({
        title: '密码至少6位',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    if (aa == true && this.data.code.length != 0 && this.data.passWord.length != 0) {
      var find = {
        "opt": "find",
        "data": '{"phoneNumber" : "' + that.data.phone + '","newPassword":"' + that.data.passWord + '","code":"' + that.data.code + '"}'
      }
      product.POST(
        {
          params: find,
          success: function (res) {
            if (res.data.status == "yes") {
              wx.showToast({
                title: '成功,请登录',
                icon: 'success',
                duration: 1500
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            } else {
              wx.showToast({
                title: '设置失败！',
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


})