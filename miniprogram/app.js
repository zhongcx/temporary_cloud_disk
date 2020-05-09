//app.js
// const ENV = "test-zttr3";//测试环境
// const updateFile = 'https://7465-test-zttr3-1302064826.tcb.qcloud.la';//测试环境云文件上传地址

const ENV = "production-54a8q";//正式环境
const updateFile = 'https://7072-production-54a8q-1302064826.tcb.qcloud.la';//生产环境云文件上传地址
 
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: ENV,
        traceUser: true,
      })
    }

    this.globalData = {
      env:ENV,
      updateFile: updateFile
    }
  }
})
