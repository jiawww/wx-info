//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList:[],
    iconList:[
      {
        iconIcon:"bank",
        iconTitle:"房产租售",
        bgColor:"#F53B3E",
        num:0
      },
      {
        iconIcon:"taxi",
        iconTitle:"拼车出行",
        bgColor:"#16ACF0",
        num:1
      },
      {
        iconIcon:"black-tie",
        iconTitle:"招聘求职",
        bgColor:"#FEA52D",
        num: 2
      },
      {
        iconIcon:"car",
        iconTitle:"车辆交易",
        bgColor:"#FF5115",
        num: 3
      },
      {
        iconIcon:"handshake-o",
        iconTitle:"二手买卖",
        bgColor:"#FCA62D",
        num: 4
      },
      {
        iconIcon:"user",
        iconTitle:"生活服务",
        bgColor:"#FF4F14",
        num: 5
      },
      {
        iconIcon:"paw",
        iconTitle:"宠物",
        bgColor:"#FB5007",
        num: 6
      },
      {
        iconIcon:"yen",
        iconTitle:"优惠信息",
        bgColor:"#FEA723",
        num: 7
      },
      {
        iconIcon:"search",
        iconTitle:"寻人寻物",
        bgColor:"#15ADEF",
        num: 8
      },
      {
        iconIcon:"truck",
        iconTitle:"装修建材",
        bgColor:"#37BA9B",
        num: 9
      },
      {
        iconIcon:"leaf",
        iconTitle:"农林牧渔",
        bgColor:"#37BA9B",
        num: 10
      },
      {
        iconIcon:"suitcase",
        iconTitle:"商务服务",
        bgColor:"#1BAFF0",
        num: 11
      },
      {
        iconIcon:"mortar-board",
        iconTitle:"教育培训",
        bgColor:"#FF490D",
        num: 12
      }      
    ]
  },
  //事件处理函数
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    this.setList();
  },
  // 处理后的图标列表
  setList:function(){
    let len=Math.ceil(this.data.iconList.length/10);
    let list=[];
    for(var i=0;i<len;i++){
      list.push(i+1);
    }
    this.setData({
      swiperList:list
    })
  },
  // 搜索
  goSearch:function(e){
    console.log(e.detail);
  },
  // 跳转分类信息
  toJump:function(e){
    wx.navigateTo({
      url: "classify/classify?index=" + e.target.dataset.num + "&title=" + e.target.dataset.title
    })
  }
})
