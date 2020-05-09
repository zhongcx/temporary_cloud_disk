// 云函数入口函数
exports.main = async(event, context) => {
  // 云函数入口文件
  const cloud = require('wx-server-sdk')
  cloud.init({
    env: event.env
  })
  try {
    /*数初化数据库 */
    const db = cloud.database({
      env: event.env
    })
    /*设置查询条件 */
    return await db.collection(event.table)
      .where(event.where)
      .orderBy(event.orderByLeft, event.orderByRight)
      .limit(event.limit)
      .skip(event.skip).get()
  } catch (e) {
    console.error(e)
  }
}

///*云函数使用示例*/
// wx.cloud.callFunction({
//   name: 'tableSelect',
//   data: {
//     env: 'test-c0203a', // 'test-c0203a' //测试 数据库    'pro-6b3bcf' //正式数据库
//     skip: that.data.skip, //步长 默认参数为 0 一般做分页的时候用。
//     limit: that.data.limit, //用于限制查询结果返回的数量 ，此云函数支持最大100条
//     orderByLeft: 'createTime', //排序字段 createTime
//     orderByRight: 'desc', //排序方式 desc降序 asc升序
//     where: {}, //条件 {}
//     table: 'books_record', //表名 books_record
//   }
// }).then(res => {
//   wx.hideLoading();
//   console.info('res', res);
//   if (res.errMsg == 'cloud.callFunction:ok') { //请求成功，刷新数据
//     console.log('[数据库] [查询记录] 成功 2: ', res)
//     if (res.result.data.length == 0 || that.data.skip > 1000) {

//     }
//   }
// })