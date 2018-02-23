// pages/lics/lics.js
var citys=require('../../utils/util.js')//获取城市数据
var chengshis=citys.city
var res=[]
var areas=[]
for (var index in chengshis) {
  res.push(chengshis[index].name) //建立城市名数组
  areas.push(chengshis[index].citys)   //建立所有市区数组
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sex:"性别",
    index: 0,   //性别数组index
    indPro: 0,  //城市数组index
    indArea: 0,  //地区数组index
    array: ['不限','男','女',], //性别数组
    provinces:res,     //城市数组
    arealist:areas,    //区域数组
    city:"常住省",      //省市input的value
    area:"常驻城市",    //区域input的value
    areaArray:[],      //临时存放区域数组
    adviser:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    })
    var that=this
    var adviser = {
      "opt": 'adviser',
    }
    citys.POST(
      {
        params: adviser,
        success: function (res) {
          wx.hideLoading()
          that.setData({
            adviser: res.data.adviser
          })
        },
        fail: function () {
          //失败后的逻辑
        },
      })
  },
  sexSet: function(e) {
    this.setData({
      index: e.detail.value
    })
    this.setData({
      sex: this.data.array[this.data.index]
    })
  },
  cityChange: function (e) {
    this.setData({
      indPro: e.detail.value
    })
    this.setData({
      city: this.data.provinces[this.data.indPro],
      areaArray: this.data.arealist[this.data.indPro]
    })
  },
  areaChange: function (e) {
    this.setData({
      indArea: e.detail.value
    })
    this.setData({
      area: this.data.areaArray[this.data.indArea],
    })
  },
  confirm:function(){
    var that=this
    wx.showLoading({
      title: '加载中..',
    })
    var sexInner = (this.data.sex == "性别" || this.data.sex == "不限" )? 0 : this.data.sex
    var cityInner = this.data.city == "常住省" ? 0 : this.data.city
    var areaInner = this.data.area == "常驻城市" ? 0 : this.data.area
    var adviserSearch = {
      "opt": 'adviserSearch',
      "data": '{"sex" : "' + sexInner + '","city":"' + areaInner + '"}'
    }
    citys.POST(
      {
        params: adviserSearch,
        success: function (res) {
          wx.hideLoading()
          that.setData({
            adviser: res.data.adviser
          })
        },
      })
  },
  // 查看详情
  lookLics:function(e){
    var name = e.currentTarget.dataset.adviser_id
      wx.navigateTo({
        url: '../lics-detail/lics-detail?id='+name,
      })
  },
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  }

  
})