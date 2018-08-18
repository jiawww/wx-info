// pages/user-center/user-history/user-history.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPc:1,  //当前页
    totalNum:0,   //帖子总数
    infoList:[],   //帖子列表
    userid:"",  //用户id
    isLoading:true  //是否可加载
  },
  onLoad: function () {
    this.getUserId();
  },
  // 获取用户Id
  getUserId:function(){
    let _this = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        _this.showMyHistory(res.data);
        _this.setData({
          userid:res.data
        })
      },
    });
  },
  // 查看历史记录
  showMyHistory:function(userid){
    let _this=this;
    let myService = app.globalData.serviceApi;
    wx.request({
      url: myService.ShowUserInfo,
      data: {
        userid:userid,
        pc:_this.data.currentPc
      },
      success:function(res){
        if(_this.data.currentPc===1){
          _this.setData({
            totalNum:res.data.records.tr
          })
        }
        if(_this.data.isLoading){
          _this.setData({
            infoList: _this.data.infoList.concat(res.data.records.beanList),
            currentPc: res.data.records.pc + 1,
          });
          if (res.data.records.pc === res.data.records.tp) {
            _this.setData({
              isLoading: false
            })
          }
        }else{
          return
        }
      }
    })
  },
  // 发起人工审核
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
  // 删除帖子确认弹窗
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
  // 删除帖子
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
            icon: 'success',
            success:function(){
              setTimeout(
                _this.refreshPage,1000
              )
            }
          })
        }
      }
    });
  },
  // 加载更多
  loadMore:function(e){
    let _this=this;
    if(this.data.isLoading){
      setTimeout(_this.showMyHistory,500,_this.data.userid);
    }else{
      return;
    }
  },
  //重新加载页面数据
  refreshPage:function(){
   let _this=this;
   this.setData(
     {
       currentPc: 1,  //当前页
       totalNum: 0,   //帖子总数
       infoList: [],   //帖子列表
       isLoading: true  //是否可加载
     },
     function(){
       _this.showMyHistory(_this.data.userid);
     }
   );
  }
})