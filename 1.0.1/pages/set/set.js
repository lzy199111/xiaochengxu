// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  fankui:function(){
    wx.navigateTo({
      url: '../../pages/fankui/fankui',
    })
  },
  // 重置密码
  revise:function(){
    wx.navigateTo({
      url: '../../pages/revise/revise',
    })
  },
  // 推荐好友
  tuijian:function(){
    wx.showToast({
      title: '敬请期待',
      icon:'loading',
      duration:2000
    })
  },
  out:function(){
    wx.showModal({
      title: '提示',
      content: '确定退出程序吗？',
      success:function(res){
        if (res.confirm) {
          wx.removeStorageSync("user")
          wx.switchTab({
            url: '../my/my',
          })
        } else if (res.cancel) {
          
        }
      }
    })
    
    
  }
})