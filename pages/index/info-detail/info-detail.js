// pages/index/info-detail/info-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     infoData:{
        photo: "../../../static/image/city.png",
        pubTime: "1小时前",
        tag: "全职招聘-销售",
        category:1,
        comments:"{}",
        createTime:1534423000000,
        gender:0,
        grade:1000,
        id:96,
        image:"/root/WeixinPro/saveImage/2bd15e60-6161-4e1e-8de4-5c27d2e8e8b4.jpg",
        images: [
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg",
          "../../../static/image/post-img.jpg"
        ],
        miniText:"要勤奋的",
        name:"张三",
        phone:"18888882666",
        state:0,
        text:"要勤奋的",
        title:"招人啦",
        top:0,
        type:0,
        userId:"241e0a6e-2cce-440f-8e60-bd76da3bacc4",
        viewNumber:0
     },
    infoData2: {
      postId: "1",
      name: "魏永刚",
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
    },
    postInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postInfo:JSON.parse(options.postInfo)
    })
    console.log(this.data.postInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})