const app = getApp()

Page({
  data: {
    userInfo: {},
    userid:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    infoList:[
      {text:'我的发布',target:'user-history'},
      {text:'修改个人信息',target:'change-info'},
    ]
  },
  //事件处理函数
  onLoad: function () {
    let _this=this;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        _this.setData({
          userid:res.data,
          hasUserInfo:true
        });
      }
    });
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        _this.setData({
          userInfo: res.data
        });
      },
    })
  },
  // 用户登录
  getUserInfo: function (e) {
    let _this=this;
    wx.showModal({
      title:'微信授权',
      content:'小程序申请获得你的公开信息（昵称、头像等）',
      success: function(res){
        if(res.confirm){
          app.globalData.userInfo = e.detail.userInfo;
          wx.setStorage({
            key: 'userInfo',
            data: e.detail.userInfo,
          });
          _this.userLogin();
          _this.setData({
            hasUserInfo: true
          });
        }else if(res.cancel){
          wx.showToast({
            title: '取消授权',
            icon: 'none'
          })
        }
      }
    });
   
  },
  userLogin:function(){
    let myService = app.globalData.serviceApi;
    let _this = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: myService.UserLogin,
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',// 默认值
            },
            method: 'POST',
            data: {
              code: res.code,
              avatarUrl: app.globalData.userInfo.avatarUrl,
              nickName: app.globalData.userInfo.nickName,
              gender: app.globalData.userInfo.gender
            },
            success: function (res) {
              console.log(res);
              if (res.data.state === 1) {
                _this.setData({
                  userid: res.data.userid
                });
                wx.setStorage({
                  key: 'userid',
                  data: res.data.userid,
                })
              }
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
