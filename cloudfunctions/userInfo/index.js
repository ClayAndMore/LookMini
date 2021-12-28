// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV,
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext)
  switch (event.method) {
    case "GET":
      if (event.param.moblie) {
        return db.collection('user_info')
          .where({
            moblie: event.param.moblie,
          }).skip(event.param.page * event.param.size).limit(event.param.size).get()
      }
      return db.collection('user_info')
        .skip(event.param.page * event.param.size).limit(event.param.size).get()
      break;
    case "POST":
      const moblie = event.weRunData.data.phoneNumber;
      // delete event.method
      let role = 'others'
      const userInfo = db.collection('user_info')

      return db.collection('role_info')
        .get().then((res) => {
          console.log('res.data------------', res.data)
          res.data.map((item, index) => {
            if (item.openid === wxContext.OPENID) {
              role = item.role
            }
          })
          console.log(role, '------')

          const userItem = userInfo.where({
            openid: wxContext.OPENID
          }).get().then(res => {
            if (res.data.length === 0) {
              console.log('------add')
              userInfo.add({
                data: {
                  ...event.param,
                  openid: wxContext.OPENID,
                  appid: wxContext.APPID,
                  unionid: wxContext.UNIONID,
                  create: new Date(),
                  update: new Date(),
                  role: role,
                  moblie
                }
              })
            } else {
              console.log('------update')
              userInfo.where({
                openid: wxContext.OPENID
              }).update({
                data: {
                  ...event.param,
                  openid: wxContext.OPENID,
                  appid: wxContext.APPID,
                  unionid: wxContext.UNIONID,
                  update: new Date(),
                  role: role,
                  moblie
                }
              })
            }
            console.log('userItem-------', res)
          })
          return {
            ...event.param,
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
            role: role,
            moblie
          }
        })

      break;
    default:
      return {
        ...event.param,
          openid: wxContext.OPENID,
          appid: wxContext.APPID,
          unionid: wxContext.UNIONID,
      }
      break;
  }
}