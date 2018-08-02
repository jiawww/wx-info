const url ="http://47.93.45.17:8080/FirstPro/";
const serviceApi={  
  AddPublishMessage:url+"JobHuntingServlet?method=AddPublishMessage",
  AddPublishMessagePic: url + "JobHuntingServlet?method=AddPublishMessagePic",
  UpdatePublishMessage:url+"JobHuntingServlet?method=UpdatePublishMessage",
  PublishMessagesList: url +"JobHuntingServlet?method=PublishMessagesList",
  DeleteMessage: url +"JobHuntingServlet?method=DeleteMessage",
  UserLogin: url +"JobHuntingServlet?method=UserLogin",
  ShowUserInfo: url +"JobHuntingServlet?method=ShowUserInfo",
  RequestHumanCheck: url +"JobHuntingServlet?method=RequestHumanCheck",
  ModifyTelephoneNumber: url +"JobHuntingServlet?method=ModifyTelephoneNumber"
}
module.exports=serviceApi;