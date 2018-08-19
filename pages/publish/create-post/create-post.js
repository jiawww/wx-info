// pages/publish/create-post/create-post.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    category:0,
    typeList: ['出租', '出售'],
    typeIndex:0,
    topList:[
      "不置顶",
      "置顶1天",
      "置顶1周",
      "置顶2周",
      "置顶一月"
    ],
    topIndex:0,
    imgList:[],
    publishLoading:false,
    submitData: {
      userid: "",
      title: "",
      category: "1",
      phone: "",
      image: [],
      description: "",
      top: "5",
      type: "123",
      name: "张三",
      gender: "0"
    },
  },
  onLoad:function(option){
    let _this=this;
    this.setData({
      category:option.index
    });
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        _this.setData({
          userid:res.data
        })
      },
    })
  },
  // 选择框
  listChange: function (e) {
    let key = e.target.dataset.para;
    switch(key){
      case 'type': this.setData({
        typeIndex: e.detail.value
      });break;
      case 'top': this.setData({
        topIndex: e.detail.value
      }); break;
    }
  },
  // 选择图片
  upImg:function(e){
    let _this=this;
    let max=6-this.data.imgList.length;
    wx.chooseImage({
      count:max,
      success: function(res) {
        _this.data.imgList=_this.data.imgList.concat(res.tempFilePaths);
        _this.setData({
          imgList:_this.data.imgList
        }); 
      },
    })
  },
  // 删除图片
  delImg:function(e){
    let idx=e.target.dataset.idx;
    let _this = this;
    wx.showModal({
      title: '删除图片',
      content: '确定删除吗？',
      success:function(res){
        if(res.confirm){
          let arr=_this.data.imgList;
          arr.splice(idx,1);
          _this.setData({
            imgList:arr
          })
          console.log(_this.data.imgList);
        }
      }
    })
  },
  // 发布信息
  publish:function(e){
    let myService=app.globalData.serviceApi;
    let _this=this;
    let submitData=e.detail.value;
    _this.setData({
      publishLoading:true
    });
    if (_this.data.imgList.length===0){
      wx.request({
        url: myService.AddPublishMessage,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' ,// 默认值
        },
        method: 'POST',
        data: {
          userid: _this.data.userid,
          title: "招人啦",
          category: _this.data.category,
          phone: submitData.phone,
          image:[],
          description: "要勤奋的",
          top: submitData.top,
          type: submitData.type,
          name: "张三",
          gender: "0"
        },
        success:function(res){
          _this.setData({
            publishLoading: false
          });
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            success:function(){
              setTimeout(_this.goTarget,500);  
            }
          });
        }
      })
    }else{
      let list=[];
      let promise=Promise.all(_this.data.imgList.map((img,index)=>{
        return new Promise(function (resolve, reject) {
          wx.uploadFile({
            url: myService.GetImage,
            filePath: img,
            name: 'image',
            success: function (res) {
              let data=JSON.parse(res.data);
              list.push(data.file_name);
              resolve('success');
            },
            fail: function (err) {
              reject(new Error('failed to upload file'));
            }
          });
        });
      }));
      promise.then(function (results) {
        console.log(results);
        wx.request({
          url: myService.AddPublishMessage,
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',// 默认值
          },
          method: 'POST',
          data: {
            userid: "241e0a6e-2cce-440f-8e60-bd76da3bacc4",
            image:list,
            title: '招人啦',
            category: "1",
            phone:'18888882666',
            description: '要勤奋的',
            top: submitData.top,
            type: submitData.type,
            name: "张三",
            gender: "0"
          },
          success: function (res) {
            console.log(res);
            _this.setData({
              publishLoading:false
            });
            wx.showToast({
              title: '发布成功',
              icon: 'success'
            });
            wx.navigateTo({
              url: targetPage,
            });
          }
      })
      }).catch(function (err) {
        console.log(err);
      });   
    } 
  },
  // 发布完成后跳转至“我的帖子”页面
  goTarget:function(){
    let targetPage = '../../user-center/user-history/user-history';
    wx.navigateTo({
      url: targetPage,
    })
  }
})