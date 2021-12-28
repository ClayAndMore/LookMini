// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const orderInfo = db.collection('product_info')
  console.log(event)
  switch (event.method) {
    case "GET":
      if (event.param.productType) {
        return orderInfo
          .where({
            productType: event.param.productType
          }).skip(event.param.page * event.param.size).limit(event.param.size).get()
      }
      return orderInfo.skip(event.param.page * event.param.size).limit(event.param.size).get()
      break;
    default:
      return orderInfo
        .get()
      break;
  }
}