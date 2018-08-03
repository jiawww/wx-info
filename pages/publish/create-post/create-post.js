// pages/publish/create-post/create-post.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['房产租售', '招聘求职'], ['出租', '出售'], ['整租', '合租']],
    multiIndex: [0, 0, 0],
    imgList:[],
    publishLoading:false
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['出租', '出售'];
            data.multiArray[2] = ['整租', '合租'];
            break;
          case 1:
            data.multiArray[1] = ['招聘', '求职'];
            data.multiArray[2] = ['全职', '兼职'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['整租', '合租'];
                break;
              case 1:
                data.multiArray[2] = ['新房','二手房'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['全职', '兼职'];
                break;
              case 1:
                data.multiArray[2] = ['全职', '兼职'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
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
  publish:function(){
    let myService=app.globalData.serviceApi;
    let _this=this;
    _this.setData({
      publishLoading:true
    });
    // console.log(_this.data.imgList.toString());
    if (_this.data.imgList.length===0){
      wx.request({
        url: myService.AddPublishMessage,
        data: {
          user_id: "241e0a6e-2cce-440f-8e60-bd76da3bacc4",
          title: "招人啦",
          category: "1",
          phone: "18812338888",
          image:[],
          text: "要求有责任心",
          top: "5",
          type: "123",
          name: "张三",
          gender: "0"
        },
        success:function(res){
          console.log(res);
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
              'content-type': 'application/json' // 默认值
          },
          data: {
            user_id: "241e0a6e-2cce-440f-8e60-bd76da3bacc4",
            image:list,
            title: "招人啦",
            category: "1",
            phone: "18812338888",
            text: "要求有责任心",
            top: "5",
            type: "123",
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
      // for (let i = 0, len = _this.data.imgList.length;i<len;i++){
      //   wx.uploadFile({
      //     url: myService.GetImage,
      //     filePath: _this.data.imgList[i],
      //     name: 'image',
      //     header: {
      //       "Content-Type": "multipart/form-data"
      //     },
      //     success: function (res) {
      //       let data=JSON.parse(res.data);
      //       list.push(data.file_name);
      //       console.log(list);
      //     }
      //   })
      // }
      // console.log(list);
      // wx.request({
      //   url: myService.AddPublishMessage,
      //   data: {
      //     user_id: "241e0a6e-2cce-440f-8e60-bd76da3bacc4",
      //     image:list,
      //     title: "招人啦",
      //     category: "1",
      //     phone: "18812338888",
      //     description: "要求有责任心",
      //     top: "5",
      //     type: "123",
      //     name: "张三",
      //     gender: "0"
      //   },
      //   success: function (res) {
      //     console.log(res);
      //   }
      // })
   
    }
   
  }
})