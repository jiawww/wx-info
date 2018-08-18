// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [
      {
        iconIcon: "bank",
        iconTitle: "房产租售",
        bgColor: "#F53B3E",
        num: 0
      },
      {
        iconIcon: "taxi",
        iconTitle: "拼车出行",
        bgColor: "#16ACF0",
        num: 1
      },
      {
        iconIcon: "black-tie",
        iconTitle: "招聘求职",
        bgColor: "#FEA52D",
        num: 2
      },
      {
        iconIcon: "car",
        iconTitle: "临时活",
        bgColor: "#FF5115",
        num: 3
      },
      {
        iconIcon: "handshake-o",
        iconTitle: "优质买卖",
        bgColor: "#FCA62D",
        num: 4
      },
      {
        iconIcon: "mortar-board",
        iconTitle: "教育培训",
        bgColor: "#FF4F14",
        num: 5
      },
      {
        iconIcon: "yen",
        iconTitle: "优惠信息",
        bgColor: "#FEA723",
        num: 6
      },
      {
        iconIcon: "search",
        iconTitle: "其他",
        bgColor: "#15ADEF",
        num: 7
      }
    ]
  },
  toJump:function(e){
    console.log(e.target);
    wx.navigateTo({
      url: 'create-post/create-post?index='+ e.target.dataset.num
    })
  }
})