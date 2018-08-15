// pages/publish/create-post/create-post.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
  upImg:function(e){
    console.log(this);
    let _this=this;
    wx.chooseImage({
      success: function(res) {
        console.log(res);
        _this.data.imgList=_this.data.imgList.concat(res.tempFilePaths);
        _this.setData({
          imgList:_this.data.imgList
        });
       
      },
    })
  },
  publish:function(e){
    let myService=app.globalData.serviceApi;
    let _this=this;
    let submitData=e.detail.value;
    _this.setData({
      publishLoading:true
    });
    // console.log(_this.data.imgList.toString());
    if (_this.data.imgList.length===0){
      wx.request({
        url: myService.AddPublishMessage,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' ,// 默认值
        },
        method: 'POST',
        data: {
          userid: "241e0a6e-2cce-440f-8e60-bd76da3bacc4",
          title: "招人啦",
          category: "1",
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
            icon: 'success'
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
            })
          }
      })
      }).catch(function (err) {
        console.log(err);
      });   
    } 
  }
})