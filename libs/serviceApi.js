const url = "http://47.93.45.17:8080/FirstPro/Servlet?method=";
const serviceApi = {  
  AddPublishMessage: url+"AddPublishMessage",
  GetImage:url+"GetImage",
  AddPublishMessagePic: url + "AddPublishMessagePic",
  UpdatePublishMessage: url + "UpdatePublishMessage",
  PublishMessagesList: url + "PublishMessagesList",
  DeleteMessage: url + "DeleteMessage",
  UserLogin: url + "UserLogin",
  ShowUserInfo: url + "ShowUserInfo",
  ShowNonValidInfo: url +'ShowNonValidInfo',
  RequestHumanCheck: url + "RequestHumanCheck"
}
module.exports=serviceApi;