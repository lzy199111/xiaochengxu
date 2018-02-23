// pages/buju/buju.js
Page({
  data: {
    // 头部banner图
    bannerSrc:"https://app.chainson-asset.com/Public/Uploads/resource/3.0/bujuBanner.jpg",
    shipai:{
      // 实拍大图
      shipaiSrc:"https://app.chainson-asset.com/Public/Uploads/resource/3.0/shipai.jpg",
      // 实拍小图
      shipaiList:[
        "https://app.chainson-asset.com/Public/Uploads/resource/3.0/shipai01.jpg",
        "https://app.chainson-asset.com/Public/Uploads/resource/3.0/shipai02.jpg",
        "https://app.chainson-asset.com/Public/Uploads/resource/3.0/shipai03.jpg",
        "https://app.chainson-asset.com/Public/Uploads/resource/3.0/shipai04.jpg",
      ]
    },
    // 地图
    mapSrc: "https://app.chainson-asset.com/Public/Uploads/resource/3.0/map.png",
    // 城市清单
    cityList:[
      {"id":"1","city":"杭州"},
      { "id": "2", "city": "北京" },
      { "id": "3", "city": "上海" },
      { "id": "4", "city": "萧山" },
      { "id": "5", "city": "温州" },
      { "id": "4", "city": "宁波" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  liji:function(){
    wx.switchTab({
      url: '../lics/lics',
    })
  },
  lookcity:function(e){
    var id= e.currentTarget.dataset.id
    if(id=="1"){
      wx.showModal({
        title: '公司地址',
        content: '杭州市江干区钱江路1366号华润大厦A座3102',
        showCancel:false,
      })
    }else if(id=="2"){
      wx.showModal({
        title: '公司地址',
        content: '北京市朝阳区东三环中路乐成中心B座506',
        showCancel: false,
      })
    } else if (id == "3") {
      wx.showModal({
        title: '公司地址',
        content: '上海市黄浦区淮海中路88号金钟广场5楼we+办公空间',
        showCancel: false,
      })
    } else if (id == "4") {
      wx.showModal({
        title: '公司地址',
        content: '杭州市江干区钱江路1366号华润大厦A座3102',
        showCancel: false,
      })
    } else if (id == "5") {
      wx.showModal({
        title: '公司地址',
        content: '浙江省温州市鹿城区香源路58号展鑫大厦北区8楼',
        showCancel: false,
      })
    }else if (id == "6") {
      wx.showModal({
        title: '公司地址',
        content: '浙江省宁波市鄞州区天童北路240号 ',
        showCancel: false,
      })
    }
  }


})