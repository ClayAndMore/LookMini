// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const orderInfo = db.collection('order_info').orderBy('create', 'desc')
  switch (event.method) {
    case "GET":
      if (event.param.orderStatus === "ALL") {
        return orderInfo
          .skip(event.param.page * event.param.size).limit(event.param.size).get()
      }
      return orderInfo
        .where({
          orderStatus: event.param.orderStatus
        }).skip(event.param.page * event.param.size).limit(event.param.size).get()
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
              actionId: event.param.actionId,
              actionName: event.param.actionName,
              ...event.param.orderDetail,
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