//index.js
const app = getApp()
var that;
Page({
  data: {
    hiddenmodalput: true, //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    inputValue: '', //弹窗输入的值
    updateId: '', //要修改的item项id
    itemList: [], //列表项
  },
  //大图浏览
  catchtapBig:function(e){
    var item = e.currentTarget.dataset.value; //
    wx.previewImage({
      current: item.fileUrl, // 当前显示图片的http链接
      urls: [item.fileUrl] // 需要预览的图片http链接列表
    })
  },
  //输入内容监听
  bindInputName: function(e) {
    console.info('e', e)
    that.setData({
      inputValue: e.detail.value
    })
  },
  //点击按钮指定的hiddenmodalput弹出框
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //取消按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },

  //确认
  confirm: function() {
    if (!that.data.inputValue) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return;
    }
    this.setData({
      hiddenmodalput: true
    })
    that.bindYunUpdate(that.data.updateId, that.data.inputValue);
  },

  onLoad: function() {
    that = this;
    that.bindOpenId();

  },
  onShow: function() {

  },
  bindItemClick: function(e) { //删除操作
    wx.showModal({
      content: '确认移除该项吗？',
      cancelColor: '#007AFF',
      confirmColor: '#007AFF',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定') 
          var item = e.currentTarget.dataset.value; //
          that.bindYunDelete(item._id);
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })

  },
  bindItemCopy: function(e) {
    var item = e.currentTarget.dataset.value; //
    wx.setClipboardData({
      data: item.fileUrl,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
            wx.showToast({ //复制成功提示
              duration: 2000,
              title: '链接复制成功',
              icon: 'none',
            })
          }
        })
      }
    })
  },
  bindUpdateName: function(e) {
    var item = e.currentTarget.dataset.value; //
    that.setData({
      updateId: item._id,
      hiddenmodalput: false
    })
  },
  //获取年月日时分秒格式的名字，例：2020-02-02 020202
  getDateName: function() {
    var date = new Date();
    var year = date.getFullYear().toString().padStart(4, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var hour = date.getHours().toString().padStart(2, "0");
    var minute = date.getMinutes().toString().padStart(2, "0");
    var second = date.getSeconds().toString().padStart(2, "0");
    return year + "-" + month + "-" + day + " " + hour + minute + second
  },
  //匹配文件扩展名，用于显示对应的图标
  getTypeName: function(type) { 
    if (type == '.doc') {
      return '_doc'
    } else if (type == '.docx') {
      return '_docx'
    } else if (type == '.ppt') {
      return '_ppt'
    } else if (type == '.pptx') {
      return '_pptx'
    } else if (type == '.rar') {
      return '_rar'
    } else if (type == '.rtf') {
      return '_rtf'
    } else if (type == '.txt') {
      return '_txt'
    } else if (type == '.xls') {
      return '_xls'
    } else if (type == '.xlsx') {
      return '_xlsx'
    } else if (type == '.zip') {
      return '_zip'
    } else if (type == '.pdf') {
      return '_pdf'
    } else if (type == '.png' || type == '.jpg' || type == '.jpeg') { //图片类型
      return '_img'
    } else { //未知类型
      return ''
    }
  },
  // 上传按钮
  doUpload: function() {
    // 选择图片/文件
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        // filePath.match(/\.[^.]+?$/)[0]//这里可以获取到文件的扩展名
        const fileType = that.getTypeName(filePath.match(/\.[^.]+?$/)[0]);
 
        console.log('[获取文件相关信息] filePath', filePath)

        // 上传文件
        const cloudPath = new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            var httpUrl = app.globalData.updateFile + '/' + cloudPath; //获取图片url
            console.log('上传成功地址拼接，httpUrl-->', httpUrl)
            /**数据库 插入记录 */
            that.bindYunCreate(that.getDateName(), new Date().getTime(), httpUrl, fileType);

          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  // 获取用户openid
  bindOpenId: function(e) {
    wx.cloud.callFunction({
      name: 'getOpenid',
      data: {
        env: app.globalData.env, //   数据库   
      },
      complete: res => {
        console.log('云函数获取到的用户信息: ', res)
        that.setData({
          openId: res.result.openId,
        })
        console.info('openId', that.data.openId)
        that.bindYunSelect();
      }
    })
  },
  bindYunCreate: function(fileName, fileCreateTime, fileUrl, fileType) {
    wx.showLoading({
      title: '请求中...',
    });
    wx.cloud.callFunction({
      name: 'dbCreate',
      data: {
        env: app.globalData.env, //   数据库   
        addData: {
          _openid: that.data.openId, //用户openid 必传 
          fileName: fileName, //文件名称
          fileCreateTime: fileCreateTime, //文件创建时间类型
          fileUrl: fileUrl, //文件下载链接地址
          fileType: fileType, //文件扩展名
        }, //要添加的记录 {}
        table: 'files', //表名 
      },
      complete: res => {
        wx.hideLoading();
        console.info('res', res);
        if (res.errMsg == 'cloud.callFunction:ok') { //请求成功，刷新数据
          console.log('[数据库] [创建记录] 成功: ', res);
          /**数据库 查询列表 */
          that.bindYunSelect();

        }
      }
    })
  },
  bindYunDelete: function(id) {
    wx.showLoading({
      title: '请求中...',
    });
    /*云函数使用示例*/
    wx.cloud.callFunction({
      name: 'dbDelete',
      data: {
        env: app.globalData.env, //   数据库    
        where: { //没有条件时，不会删除表中的任何记录
          _id: id
        }, //条件 {}
        table: 'files', //表名 
      },
      complete: res => {
        wx.hideLoading();
        console.info('res', res);
        if (res.errMsg == 'cloud.callFunction:ok') { //请求成功，刷新数据
          console.log('[数据库] [删除记录] 成功: ', res)
          //removed: 0 表示删除了几条记录
          that.bindYunSelect();
        }
      }
    })
  },
  bindYunSelect: function(e) {
    wx.showLoading({
      title: '请求中...',
    });
    console.info('_openid', that.data.openId)
    /*云函数使用示例*/
    wx.cloud.callFunction({
      name: 'dbSelect',
      data: {
        env: app.globalData.env, // 数据库环境 
        skip: 0, //步长 默认参数为 0 一般做分页的时候用。
        limit: 20, //用于限制查询结果返回的数量 ，此云函数支持最大100条
        orderByLeft: 'fileCreateTime', //排序字段 createTime
        orderByRight: 'desc', //排序方式 desc降序 asc升序
        where: {
          // _openid:that.data.openId
        }, //条件 {}
        table: 'files', //表名 
      },
      complete: res => {
        wx.hideLoading();
        console.info('res', res);
        if (res.errMsg == 'cloud.callFunction:ok') { //请求成功，刷新数据
          console.log('[数据库] [查询记录] 成功: ', res)
          that.setData({
            itemList: res.result.data
          })
        }
      }
    })
  },
  bindYunUpdate: function(updateId, inputValue) {
    wx.showLoading({
      title: '请求中...',
    });

    wx.cloud.callFunction({
      name: 'dbUpdate',
      data: {
        env: app.globalData.env, //   数据库  
        where: {
          _id: updateId
        },
        upData: {
          fileName: inputValue,
        },
        table: 'files', //表名 
      },
      complete: res => {
        wx.hideLoading();
        console.info('res', res);
        if (res.errMsg == 'cloud.callFunction:ok') { //请求成功，刷新数据
          console.log('[数据库] [更新记录] 成功: ', res);
          that.bindYunSelect();
        }

      }
    })


  },
  onShareAppMessage:function(){

  },//支持享功能
})