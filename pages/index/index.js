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
        iconTitle:"临时活",
        bgColor:"#FF5115",
        num: 3
      },
      {
        iconIcon:"handshake-o",
        iconTitle:"优质买卖",
        bgColor:"#FCA62D",
        num: 4
      },
      {
        iconIcon:"mortar-board",
        iconTitle:"教育培训",
        bgColor:"#FF4F14",
        num: 5
      },
      {
        iconIcon:"yen",
        iconTitle:"优惠信息",
        bgColor:"#FEA723",
        num: 6
      },
      {
        iconIcon:"search",
        iconTitle:"其他",
        bgColor:"#15ADEF",
        num: 7
      } 
    ],
    infoDataList:[],
    infoData:{}
  },
  //事件处理函数
  onLoad: function () {
    this.getInfoData();
    this.setList();
  },
  // 获取数据
  getInfoData:function(){
    this.setData({
      infoData:{
        postId: "1",
        photo: "../../../static/image/city.png",
        name: "魏永刚",
        tag: "全职招聘-销售",
        isTop: false,
        detail: "详情：招内勤1名。业务主任3名。业务员20名。要求要有团队精神，有上进心，每月15号发工资。工作时间8个小时，名额有限，报名电话，15690018617......13483409787",
        phoneNum: "18880010008",
        images: [
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg"
        ],
        address: "河北省临漳县",
        pubTime: "1小时前",
        browse: 0,
        comments: 0
      }
    });
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
    // wx.navigateTo({
    //   url: "classify/classify?index=" + e.target.dataset.num + "&title=" + e.target.dataset.title
    // });
    wx.navigateTo({
      url: 'info-detail/info-detail',
    })
  }
})
