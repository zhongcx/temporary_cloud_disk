 // 云函数入口函数
 exports.main = async(event, context) => {
   // 云函数入口文件
   const cloud = require('wx-server-sdk')
   cloud.init({
     env: event.env
   });
   const wxContext = cloud.getWXContext()
   return event.userInfo //返回用户信息
 }