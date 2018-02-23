function init() {
  var that = this;
  //header中相应的 操作
  that.ydAll = function (event) {
    var numId = event.currentTarget.dataset.numid
    wx.navigateTo({
      url: '../xw-detail/xw-detail?numId=' + numId,
    })
  };
};
module.exports = {
  init: init
};