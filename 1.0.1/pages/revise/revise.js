// pages/revise/revise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPass:'',
    newPass:'',
    againPass:'',
  
  },

  
  current:function(e){
    this.setData({  
      currentPass: e.detail.value
    })
  },
  newInput:function(e){
    this.setData({
      newPass: e.detail.value
    })
  },
  again: function (e) {
    this.setData({
      againPass: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  passWord:function(){
    var that=this
    if (that.data.currentPass.length == 0) {
      wx.showToast({
        title: '请输入当前密码！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (that.data.newPass.length == 0) {
      wx.showToast({
        title: '请输入新密码！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (that.data.newPass.length < 6) {
      wx.showToast({
        title: '密码至少6位',
        icon: 'loading',
        duration: 1500
      })
      return false
    } else if (that.data.newPass == that.data.currentPass) {
      wx.showToast({
        title: '密码相同！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (that.data.againPass.length == 0) {
      wx.showToast({
        title: '请确认新密码！',
        icon: 'loading',
        duration: 1500
      })
      return false
    } else if (that.data.newPass != that.data.againPass){
      wx.showToast({
        title: '输入密码不同！',
        icon: 'loading',
        duration: 1500
      })
      return false
    }
    return true
  },
  queding:function(){
    var that=this
    var value = wx.getStorageSync('user')
    var aa=this.passWord()
    if(aa==true){
      wx.request({
        url: 'https://app.chainson-asset.com/admin.php/App/api',
        method: "post",
        data: {
          "opt": "modify",
          "data": '{"phoneNumber" : "' + value + '" , "oldPassword" : "' + that.data.currentPass + '", "newPassword" : "' + that.data.newPass + '" }'
        },
        dataType: "json",
        success: function (res) {
          if(res.data.status=="yes"){
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1500
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../my/my',
              })
            }, 2000)
          }else{
            wx.showToast({
              title: '当前密码错误',
              icon: 'loading',
              duration: 1500
            })
          }
        },
      })
    }
  }
})