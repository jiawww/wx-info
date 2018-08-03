const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    infoList:[
      {text:'我的发布',target:'user-history'},
      {text:'修改个人信息',target:'change-info'},
    ]
  },
  //事件处理函数
  onLoad: function () {},
  getUserInfo: function (e) {
    // console.log(e);
    // app.globalData.userInfo = e.detail.userInfo;
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    let myService = app.globalData.serviceApi;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: myService.UserLogin,
            data: {
              code: res.code
            },
            success:function(res){
               console.log(res); 
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  toJump:function(e){
    let target=e.target.dataset.target;
    wx.navigateTo({
      url: target+"/"+target,
    });
  }
})
