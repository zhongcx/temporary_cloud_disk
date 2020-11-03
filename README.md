# temporary_cloud_disk
#### 开源地址
源码地址：[https://github.com/zhongcx/temporary_cloud_disk](https://github.com/zhongcx/temporary_cloud_disk)
自己搭建环境注意事项：
###### 1、导入源码时要输入自己的小程序id
![234](https://7072-pro-4c9955-1258575630.tcb.qcloud.la/page.png?sign=bfbffd36b55fd348262ef592f09f7175&t=1604375421)
![输入自己的小程序id](https://upload-images.jianshu.io/upload_images/11217637-cbe2570e88eca664.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 2、要创建云开发
![点击“云开发”](https://upload-images.jianshu.io/upload_images/11217637-6f74f59a4d8a00f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 3、要在代码中配置数据库及云存储地址
![你们创建的应该和我的地址不一样](https://upload-images.jianshu.io/upload_images/11217637-52a0c24584238fa1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![在app.js配置](https://upload-images.jianshu.io/upload_images/11217637-ed936ab2edd88432.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 4、要配置云函数，注意有的时候上传会失败，多试几次，直接出现下面的图
![step1:选择一套环境](https://upload-images.jianshu.io/upload_images/11217637-6f94f70396e620c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![step2:创建并部署，五个云函数都要分别更新](https://upload-images.jianshu.io/upload_images/11217637-3b2dc5ca3652d395.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![更新失败情况](https://upload-images.jianshu.io/upload_images/11217637-e3aef89fd6d81d94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![更新成功情况](https://upload-images.jianshu.io/upload_images/11217637-ef982e0be3f6b556.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###### PS：本来想利用微信小程序自带的5G免费云空间，做个人网盘。但是审核不通过，需要升级成企业版才行。
![个人版不允许用户自行生成内容并分享](https://upload-images.jianshu.io/upload_images/11217637-29439ab40cfb366b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 初心
1、有的时候需要给别人安卓安装包，但是直接发到微信上是没法安装的。发个链接给别人，让TA去手机浏览器下载
2、可以写一个静态的html网页，生成链接后可以粘在网页上给别人查看。

 #### 功能介绍 
![效果图](https://upload-images.jianshu.io/upload_images/11217637-89ba5321d2e9a070.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 上传文件
###### 1、支持win电脑文件，在微信里打开小程序，点击“上传”
![默认只显示图片类型，要选择“所有文件”类型。](https://upload-images.jianshu.io/upload_images/11217637-9520793bbe9556e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 2、支持Android/iOS手机本地照片
![](https://upload-images.jianshu.io/upload_images/11217637-da3453de8b05124e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 3、直接在云后台上传本地文件
![通过详情得到下载地址](https://upload-images.jianshu.io/upload_images/11217637-cc3a1cf0c1972d07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 4、支持上传手机微信聊天文件
 
#### 开发前的准备工作
名称|内容|功能描述
---|---|---
邮箱|保密|用于注册
微信号|保密|用于登录
身份证信息|保密|一个身份证只能注册5个小程序
手机号|保密|一个手机号码只能注册5个小程序。
小程序名称|持息网盘|个人帐号可一年内修改2次名称。
小程序头像|![](https://upload-images.jianshu.io/upload_images/11217637-d54dc5c3993a8059.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) |一年内可申请修改5次，我是在这个网站是自动生成的logo  [http://www.uugai.com/](http://www.uugai.com/)
小程序介绍|方便实用的个人网盘|一个月内可申请5次修改
服务类目|工具-->办公|一个月内可申请修改3次
小程序注册地址|[https://mp.weixin.qq.com/](https://mp.weixin.qq.com/)|用于注册并登录小程序后台管理
原型图地址|https://www.xiaopiu.com/h5/byId?type=project&id=5ce4e1e874e7377fec6b8a68&activePage=1|实际开发需要的图标去阿里巴巴矢量图标库里找 [https://www.iconfont.cn/](https://www.iconfont.cn/)
