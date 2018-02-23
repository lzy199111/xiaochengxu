// pages/fenxiang/fenxiang.js
var product = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    password:'',
    phoneReg:'',
    jiaoyan:'',
    yanzheng: '获取验证码',
    num: 60,
    clk: true,
  },
  onload:function(options){
    this.setData({
      user: options.phoneNum
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
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 获取注册手机号 
  phoneInputReg: function (e) {
    this.setData({
      phoneReg: e.detail.value
    })
  },
  // 获取校验码 
  jiaoyanInput: function (e) {
    this.setData({
      jiaoyan: e.detail.value
    })
  },
  jiaoyan: function () {
    var that = this
    var aa = that.validatemobile(that.data.phoneReg)
    var registerCheck = {
      "opt": "registerCheck",
      "data": '{"phoneNumber" : "' + that.data.phoneReg + '"}'
    }
    if (aa == true && that.data.clk == true) {
      product.POST(
        {
          params: registerCheck,
          success: function (res) {
            if (res.data.status == "no") {
              wx.showToast({
                title: '该号码已注册',
                icon: 'loading',
                duration: 1500
              })
            } else if (res.data.status == "yes") {
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
              wx.request({
                url: 'https://app.chainson-asset.com/admin.php/App/api',
                method: "post",
                data: {
                  "opt": "messageCheck",
                  "data": '{"phoneNumber" : "' + that.data.phoneReg + '"}'
                },
                dataType: "json",
                success: function (res) {

                },
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
  },

  click: function () {
    var that = this
    var userReg_phone = that.data.user
    var aa = that.validatemobile(that.data.phoneReg)
    if (this.data.jiaoyan.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'loading',
        duration: 1500
      })
      return false
    } else if (this.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (this.data.password.length < 6) {
      wx.showToast({
        title: '密码至少6位',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    if (aa == true && this.data.jiaoyan.length != 0 && this.data.password.length != 0) {
      wx.request({
        url: 'https://app.chainson-asset.com/admin.php/App/api',
        method: "post",
        data: {
          "opt": "register",
          "data": '{"phoneNumber" : "' + that.data.phoneReg + '","passWord":"' + that.data.passwordReg + '","code":"' + that.data.jiaoyan + '","form":"' + that.data.user +'"}'
        },
        dataType: "json",
        success: function (res) {
          if (res.data.status == "yes") {
            wx.showModal({
              title: '提示',
              content: '注册成功，点击进入乾晟资产小程序查看详情',
              success:function(res){
                if (res.confirm) {
                  wx.switchTab({
                     url: '../index/index',
                  })
                } else if (res.cancel) {
                  that.setData({
                    password: '',
                    phoneReg: '',
                    jiaoyan: '',
                    yanzheng: '获取验证码',
                    num: 60,
                    clk: true,
                  })
                }
              }
            })
          } else {
            wx.showToast({
              title: '注册失败！',
              icon: 'loading',
              duration: 1500
            })
          }
        },
      })
    }
  },


})