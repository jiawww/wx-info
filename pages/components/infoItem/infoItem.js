// pages/components/infoItem/infoItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    postId:"1",
    photo:"../../../static/image/city.png",
    name:"魏永刚",
    tag:"全职招聘-销售",
    isTop:false,
    detail:"详情：招内勤1名。业务主任3名。业务员20名。要求要有团队精神，有上进心，每月15号发工资。工作时间8个小时，名额有限，报名电话，15690018617......13483409787",
    phoneNum:"18880010008",
    images:[
      "../../../static/image/post-img.jpg",
      "../../../static/image/post-img.jpg",
      "../../../static/image/post-img.jpg",
      "../../../static/image/post-img.jpg",
      "../../../static/image/post-img.jpg",
      "../../../static/image/post-img.jpg"
    ],
    imgNum:0,
    address:"河北省临漳县",
    pubTime:"1小时前",
    browse:0,
    comments:0,
    setDetail:"white-space: nowrap",
    showMore:"查看全文"
  },
  /*
    在组件实例进入页面节点树时执行
   */
  attached:function(){
    let num=this.data.images.length;
    this.setData({
      imgNum:num
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 拨打电话
    toCall:function(){
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNum 
      })
    },
    showMore:function(e){
      let msg=this.data.showMore;
      if(msg==="查看全文"){
        this.setData({
          setDetail:"white-space: normal",
          showMore:"收起"
        });
      }else{
        this.setData({
          setDetail: "white-space:nowrap",
          showMore: "查看全文"
        });
      }
    }
  }
})
