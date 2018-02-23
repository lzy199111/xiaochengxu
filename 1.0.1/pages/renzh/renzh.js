// pages/renzh/renzh.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameText: '',
    cardText: '',
    againText: '',
  },
  name: function (e) {
    this.setData({
      nameText: e.detail.value
    })
  },
  card: function (e) {
    this.setData({
      cardText: e.detail.value
    })
  },
  again: function (e) {
    this.setData({
      againText: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  cardValib: function (card) {
    var that = this
    if (that.data.nameText.length == 0) {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (that.data.cardText.length == 0) {
      wx.showToast({
        title: '请输入身份证号！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (that.data.againText.length==0) {
      wx.showToast({
        title: '请确认身份证号',
        icon: 'loading',
        duration: 1500
      })
      return false
    } else if (that.data.cardText != that.data.againText) {
      wx.showToast({
        title: '号码不同！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } 
    var myreg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    if (!myreg.test(card)) {
      wx.showToast({
        title: '身份证号有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    }
    return true
  },
  onLoad: function (options) {
    
  },
  renzheng:function(){
    var that=this
    var aa=this.cardValib(this.data.cardText)
    if(aa==true){
      var user=wx.getStorageSync("user")
      wx.request({
        url: 'https://app.chainson-asset.com/admin.php/App/api',
        method: "post",
        data: {
          "opt": "renzheng",
          "data": '{"phoneNumber" : "' + user + '" , "realName" : "' + that.data.nameText + '", "idNumber" : "' + that.data.cardText + '" }'
        },
        dataType: "json",
        success: function (res) {
          if (res.data.status == "yes") {
            wx.showToast({
              title: '认证成功',
              icon: 'success',
              duration: 1500
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../my/my',
              })
            }, 2000)
          } else {
            wx.showToast({
              title: '认证失败',
              icon: 'loading',
              duration: 1500
            })
          }
        },
      })
    }
  }

})