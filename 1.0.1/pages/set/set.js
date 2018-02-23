// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      value: options.value

    })
  },
  // 重置密码
  revise:function(){
    wx.navigateTo({
      url: '../../pages/revise/revise',
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