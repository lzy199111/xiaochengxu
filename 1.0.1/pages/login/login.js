Page({
  data: {
    currentTab:0,
    loginLog: "https://app.chainson-asset.com/Public/Uploads/resource/3.0/login.jpg",
    phone: '',
    password: '',
    phoneReg: '',
    passwordReg: '',
    jiaoyan:'',
    yanzheng:'获取验证码',
    num:60,
    clk:true,
    activeCl:false

  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
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

  // 获取注册密码 
  passwordInputReg: function (e) {
    this.setData({
      passwordReg: e.detail.value
    })
  },

  // 登录 
  login: function () {
    var user_phone = '' + this.data.phone
    this.validatemobile(this.data.phone)
    if (this.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    }
    var that = this
    wx.request({
      url: 'https://app.chainson-asset.com/admin.php/App/api',
      method: "POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "opt": "login",
        "phoneNumber": that.data.phone,
        "passWord": that.data.password,
        // "data": '{"phoneNumber" : "' + that.data.phone + '" , "passWord" : "' + that.data.password+'" }'
      },
      // dataType: "json",
      success: function (res) {
        if(res.data.status=="yes"){
          wx.setStorageSync("user",user_phone)
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)  
        }else{
          wx.showToast({
            title: '账号或密码错误',
            icon: 'loading',
            duration: 1500
          })
        }
      },
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
  // 获取校验码
  jiaoyan:function(){
    var that=this
    var aa=that.validatemobile(that.data.phoneReg)
    if(aa==true&&that.data.clk==true){
      wx.request({
        url: 'https://app.chainson-asset.com/admin.php/App/api',
        method: "post",
        data: {
          "opt": "registerCheck",
          "data": '{"phoneNumber" : "' + that.data.phoneReg + '"}'
        },
        dataType: "json",
        success: function (res) {
          if (res.data.status == "no") {
            wx.showToast({
              title: '该号码已注册',
              icon: 'loading',
              duration: 1500
            })
          } else if(res.data.status == "yes"){
            that.setData({
              clk:false,
              activeCl:true,
              yanzheng: "重新发送" + that.data.num
            })
            var time=setInterval(function(){
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
                num:that.data.num-1
              })
              that.setData({
                yanzheng:"重新发送"+that.data.num
              })
              
            },1000)
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
      })
    }
    
    
  },
  // 注册
  register:function(){
    var that=this
    var userReg_phone = '' + that.data.phoneReg
    var aa = that.validatemobile(that.data.phoneReg)
    if (this.data.jiaoyan.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'loading',
        duration: 1500
      })
      return false
    }else if (this.data.passwordReg.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (this.data.passwordReg.length <6){
      wx.showToast({
        title: '密码至少6位',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    if (aa == true && this.data.jiaoyan.length != 0 && this.data.passwordReg.length != 0){
      wx.request({
        url: 'https://app.chainson-asset.com/admin.php/App/api',
        method: "post",
        data: {
          "opt": "register",
          "data": '{"phoneNumber" : "' + that.data.phoneReg + '","passWord":"' + that.data.passwordReg + '","code":"' + that.data.jiaoyan+'"}'
        },
        dataType: "json",
        success: function (res) {
            if(res.data.status=="yes"){
              wx.setStorageSync("user", userReg_phone)
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 1500
              })
              setTimeout(function(){  
                wx.switchTab({
                  url: '../index/index',
                })
              },1500)
            }else{
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
// 忘记密码
  forget:function(){
    wx.navigateTo({
      url: '../forget/forget',
    })
  },


  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
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
})