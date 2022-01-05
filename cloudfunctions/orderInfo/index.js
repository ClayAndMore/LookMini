// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const orderInfo = db.collection('order_info')
  switch (event.method) {
    case "GET":
      if (event.param.orderStatus === "ALL") {
        return orderInfo
          .where({
            openid: wxContext.OPENID,
          }).orderBy('create', 'desc').skip(event.param.page * event.param.size).limit(event.param.size).get()
      }
      return orderInfo
        .where({
          openid: wxContext.OPENID,
          orderStatus: event.param.orderStatus
        }).orderBy('create', 'desc').skip(event.param.page * event.param.size).limit(event.param.size).get()
      break;
    case "POST":
      // delete event.method
      console.log(event.param)
      if (event.param._id) {
        return orderInfo
          .where({
            _id: event.param._id
          }).update({
            data: {
              orderStatus: event.param.orderStatus,
            }
          })
      }
      return orderInfo
        .add({
          data: {
            ...event.param,
            create: new Date()
          }
        })
      break;
    default:
      return orderInfo
        .get()
      break;
  }
}