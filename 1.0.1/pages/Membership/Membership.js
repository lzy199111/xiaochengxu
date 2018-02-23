// pages/Membership/Membership.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipImg:""
  },
  onLoad: function (options) {
    var vipname = options.vipname
    this.setData({
      vipImg: "https://app.chainson-asset.com/Public/Uploads/resource/3.0/" + vipname+".jpg"
    })
  },
})