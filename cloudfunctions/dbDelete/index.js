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
    /*设置添加的表及对应的字段 */
    return await db.collection(event.table)
      .where(event.where)
      .remove()
  } catch (e) {
    console.error(e)
    return;
  }
}