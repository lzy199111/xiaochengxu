// pages/baogao/baogao.js
var product = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    srcImg:"",
    points:{},
    leixing:"",
    fen:"",
    pogation:[
      { "id": "1", "theme": "您的主要收入来源", "station": [{ "name": "工资、劳动报酬", "value": "4" }, { "name": "生产经营所得", "value": "4" }, { "name": "利息、股息、转让等金融性资产收入", "value": "6" }, { "name": "出租、出售房地产等非金融性资产收入", "value": "8" }, { "name": "无固定收入", "value": "2" }]},
      { "id": "2", "theme": "您的家庭可支配年收入为(折合人民币)？", "station": [{ "name": "50万元以下", "value": "2" }, { "name": "50-100万元", "value": "4" }, { "name": "100-500万元", "value": "6" }, { "name": "500-1000万元", "value": "8" }, { "name": "1000万元以上", "value": "10" }] },
      { "id": "3", "theme": "在您每年的家庭可支配收入中，可用于金融投资（储蓄存款除外）的比例为？", "station": [{ "name": "小于10%", "value": "2" }, { "name": "10%至25%", "value": "4" }, { "name": "25%至50%", "value": "6" }, { "name": "大于50", "value": "8" },]},
      { "id": "4", "theme": "您是否有尚未清偿的数额较大的债务，如有，其性质是", "station": [{ "name": "没有", "value": "8" }, { "name": "有，住房抵押贷款等长期定额债务", "value": "6" }, { "name": "有，信用卡欠款、消费信贷等短期信用债务", "value": "4" }, { "name": "有，亲戚朋友借款", "value": "2" },] },
      { "id": "5", "theme": "您的投资知识可描述为：", "station": [{ "name": "有限：基本没有金融知识方面的知识", "value": "2" }, { "name": "一般：对金融产品及其相关风险具有基本的知识和理解", "value": "6" }, { "name": "丰富：对金融产品及其相关风险具有丰富的知识和理解", "value": "8" }] }, 
      { "id": "6", "theme": "您的投资经验可描述为：", "station": [{ "name": "除银行储蓄外，基本没有其他投资经验", "value": "2" }, { "name": "购买过债券、保险等理财产品", "value": "4" }, { "name": "参与过股票、基金等产品的交易", "value": "6" }, { "name": "参与过权证、期货、期权等产品的交易", "value": "8" }] },
      { "id": "7", "theme": "您有多少年投资基金、股票、信托、私募证券或金融衍生产品等风险投资品的经验？", "station": [{ "name": "没有经验", "value": "0" }, { "name": "少于2年", "value": "2" }, { "name": "2至5年", "value": "4" }, { "name": "5-10年", "value": "6" }, { "name": "10年以上", "value": "8" }] },
      { "id": "8", "theme": "您计划的投资期限是多久？", "station": [{ "name": "1年以下", "value": "2" }, { "name": "1至3年", "value": "4" }, { "name": "3至5年", "value": "6" }, { "name": "5年以上", "value": "8" }] },
      { "id": "9", "theme": "您打算重点投资于哪些种类的投资品种？", "station": [{ "name": "债券、货币市场基金、债券基金等固定收益类投资品种", "value": "2" }, { "name": "股票、混合型基金、股票型基金等权益类投资品种", "value": "4" }, { "name": "期货、期权等金融衍生品", "value": "6" }, { "name": "其他产品或服务", "value": "8" }] },
      { "id": "10", "theme": "以下哪项描述最符合您的投资态度？", "station": [{ "name": "厌恶风险，不希望本金损失，希望获得稳定回报", "value": "2" }, { "name": "保守投资，不希望本金损失，愿意承担一定幅度的收益波动", "value": "4" }, { "name": "寻求资金的较高收益和成长性，愿意为此承担有限本金损失", "value": "6" }, { "name": "希望赚取高回报，愿意为此承担较大本金损失", "value": "8" }] }, 
      {"id": "11", "theme": "假设有两种投资：投资A预期获得10%的收益，可能承担的损失非常小：投资B预期获得30%的收益，但可能承担较大亏损。您会怎么支配您的投资：", "station": [{ "name": "全部投资于收益较小风险较小的A", "value": "2" }, { "name": "同时投资于A和B，但大部分资金投资于收益较小且风险较小的A", "value": "4" }, { "name": "同时投资于A和B，但大部分资金投资于收益较大且风险较大的B", "value": "6" }, { "name": "全部投资于收益较大风险较小的大", "value": "9" }] },
      { "id": "12", "theme": "您认为自己能承受的最大投资损失是多少?", "station": [{ "name": "10%以内", "value": "2" }, { "name": "10%-30%", "value": "4" }, { "name": "30%-50%", "value": "6" }, { "name": "超过50%", "value": "9" }] },
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var user = wx.getStorageSync('user')
    // var newData = {
    //   "opt": "getRiskScore",
    //   "data": '{"phoneNumber": '+user+'}'
    // }
    // product.POST(
    //   {
    //     params: newData,
    //     success: function (res) {
    //       console.log(res)
    //     },
    //     fail: function () {
    //       wx.showToast({
    //         title: '加载失败',
    //       })
    //     },
    //   })
  },
  begin:function(){
    this.setData({
      current:1
    })
  },
  previous:function(){
    var that=this
    this.setData({
      current: that.data.current-1
    })
  },
  next: function () {
    var that = this
    this.setData({
      current: that.data.current + 1
    })
  },
  radioChange:function(e){
    var that=this
    var curt=e.currentTarget.dataset.curt
    that.data.points[curt] = e.detail.value
  },
  bindChange:function(e){ 
    var that=this
    this.setData({
      current:e.detail.current
    })
    if (e.detail.current == 13){
      var user = wx.getStorageSync('user')
      var num=0
      for (var index in that.data.points) {
        num += parseInt(that.data.points[index])
      }
      if(num>=0&&num<=30){
        that.setData({
          srcImg:"../../images/baoshou.png",
          leixing:"低风险",
          fen:num
        })  
      }else if(num>30&&num<=45){
        that.setData({
          srcImg: "../../images/wenjian.png",
          leixing: "低风险、中低风险",
          fen: num
        }) 
      } else if (num > 45 && num <= 60) {
        that.setData({
          srcImg: "../../images/pingheng.png",
          leixing: "低风险、中低风险、中风险",
          fen: num
        })
      } else if (num > 60 && num <= 80) {
        that.setData({
          srcImg: "../../images/jiji.png",
          leixing: "低风险、中低风险、中风险、中高风险",
          fen: num
        })
      } else if (num > 80 && num <= 100) {
        that.setData({
          srcImg: "../../images/jinqu.png",
          leixing: "低风险、中低风险、中风险、中高风险、高风险",
          fen: num
        })
      }
      var newData={
        "opt": "riskTest",
        "data":'{"phoneNumber":'+user+',"score":'+num+'}'
      }
      product.POST(
        {
          params: newData,
          success: function (res) {
            console.log(res)
          },
          fail: function () {
            wx.showToast({
              title: '加载失败',
            })
          },
        })


    }
  }
  
})