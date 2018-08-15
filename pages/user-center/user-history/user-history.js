// pages/user-center/user-history/user-history.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPc:1,  //当前页
    infoList:[]   //帖子列表
  },
  onLoad: function (options) {
    console.log(options);
    this.showMyHistory();
  },
  onReachBottom(e){ //上拉加载
    console.log(e);
    console.log(this);
    console.log(666);
  },
  showMyHistory:function(){
    let _this=this;
    let myService = app.globalData.serviceApi;
    wx.request({
      url: myService.ShowUserInfo,
      data: {
        userid: "241e0a6e-2cce-440f-8e60-bd76da3bacc4",
        pc:1
      },
      success:function(res){
        console.log(res);
        _this.setData({
          infoList:res.data.records.beanList
        });
      }
    })
  },
  humanCheck:function(e){
    let myService = app.globalData.serviceApi;
    wx.request({
      url: myService.RequestHumanCheck,
      data:{
        id:e.target.dataset.id
      },
      success:function(res){
        console.log(res);
      }
    });
  },
  deleteMsg:function(e){
    let _this=this;
    let id=e.target.dataset.id;
    wx.showModal({
      title: '删除帖子',
      content: '帖子删除后将不可恢复！',
      success: function (res) {
        if (res.confirm) {
          _this.doDelete(id);
        }
         else if (res.cancel) {
          wx.showToast({
            title: '取消删除',
            icon: 'none'
          })
        }
      }
    });
  },
  doDelete:function(id){
    let myService = app.globalData.serviceApi;
    let _this=this;
    wx.request({
      url: myService.DeleteMessage,
      data: {
        id:id
      },
      success: function (res) {
        if(res.data.state===1){
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
        _this.showMyHistory();
  
      }
    });
  }
})