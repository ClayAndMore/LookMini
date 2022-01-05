---
highlight: a11y-dark
theme: smartblue
---
# 初衷
从2018年微信小程的爆火，到现在的各家小程序、跨平台小程序框架。已经出现在大家生活中三年了，而且有着越来越深度的使用。经过几年的发展微信官方提供了云开发的模式，我就在想作为一位开发者，那不就是可以实现当初全栈工程师的目标了么。所以有了这篇文章，是我想成为全栈工程师的第一步，也希望是你们的第一步。
# 项目介绍
朋友开了一家眼镜店，跟我说了一下能不能在手机上把用户信息获取到，而且维护好他眼睛店的客户信息。我一想这不是小程序正合适嘛。于是我在网上找这种眼镜店的设计稿，找好之后，按照他的需求，有小程序预约到店办理业务、订单维护、用户信息维护。有了需求，设计也有了，正好使用小程序的云开发我就可以自己做一个项目了。

在这个项目过程中，遇到的问题，很值得记录下来。于是行文，将我实现过程的种种，作为分享，希望能帮助到一些童鞋。
## 项目预览
### 调用接口
> ![Jan-04-2022 16-16-30.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67c51ad2d8b94970ad9d6f4c1c4adb64~tplv-k3u1fbpfcp-watermark.image?)
### 用户注册
> ![Jan-04-2022 16-22-27.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f85f20c8227e4efa9b1b8e15c149a03b~tplv-k3u1fbpfcp-watermark.image?)
### 订单提交
> ![Jan-04-2022 16-25-15.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cab5bb41ed44bc08c65ab2bdca22852~tplv-k3u1fbpfcp-watermark.image?)
### 订单维护
> ![Jan-04-2022 16-33-29.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68452ce16f57415cb4e01e064c75cdf6~tplv-k3u1fbpfcp-watermark.image?)
## 项目信息
> [Github源码地址:路客眼镜](https://github.com/LookGlasses/LookMini) 有需要的欢迎Fork ，如果喜欢，请给个Star~
# 项目内容
## 项目目录
```js
├── README.md
├── cloudfunctions // 这里是云函数的代码
│   ├── allOrderInfo
│   │   ├── config.json
│   │   ├── index.js
│   │   └── package.json
│   ├── orderInfo
│   │   ├── config.json
│   │   ├── index.js
│   │   └── package.json
│   ├── productInfo
│   │   ├── config.json
│   │   ├── index.js
│   │   └── package.json
│   ├── roleInfo
│   │   ├── config.json
│   │   ├── index.js
│   │   └── package.json
│   └── userInfo
│       ├── config.json
│       ├── index.js
│       ├── package-lock.json
│       └── package.json
├── img // 这里是本地的一些图片，因为我项目里已经使用云存储展示图片这里方便拉去代码后展示图片
│   ├── T1.png
│   ├── T2.png
│   ├── T3.png
│   ├── T3_more.png
│   ├── banner1.jpeg
│   ├── banner2.jpeg
│   └── qrcode.jpg
├── miniprogram // 小程序代码目录
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── components
│   │   └── cloudTipModal
│   ├── envList.js
│   ├── images
│   │   ├── BLUE_2.jpeg
│   │   ├── GLASSES.jpeg
│   │   ├── USER.png
│   │   ├── arrow.png
│   │   ├── black.jpeg
│   │   ├── blue.jpeg
│   │   ├── call.png
│   │   ├── class.jpeg
│   │   ├── detail.jpeg
│   │   ├── glass
│   │   ├── jinhangzhong.png
│   │   ├── pink.jpeg
│   │   ├── quchu.png
│   │   ├── submit.png
│   │   ├── tab
│   │   ├── tea.jpeg
│   │   ├── weifukuan.png
│   │   ├── white.jpeg
│   │   └── yiwancheng.png
│   ├── miniprogram_npm
│   │   └── @miniprogram-component-plus
│   ├── package-lock.json
│   ├── package.json
│   ├── pages
│   │   ├── allOrderInfo
│   │   ├── appointment //预约
│   │   ├── confirmOrder
│   │   ├── glasses //配镜
│   │   ├── goodsDetail 
│   │   ├── index //首页
│   │   ├── map
│   │   ├── orderInfo
│   │   ├── orderResult
│   │   ├── updateOrder
│   │   ├── user //个人中心
│   │   └── userInfo
│   └── sitemap.json
├── project.config.json
├── project.private.config.json
└── uploadCloudFunction.sh
```
### 项目在云开发时的配置
云开发初始化等配置在官方文档中写的很清楚了，有什么问题都可以去[官方文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/quick-start/miniprogram.html)查询。
我们直接开始介绍本项目在运行时的配置：
- **在云开发数据库目录下新建四个集合：order_info、product_info、role_info、user_info。**
> ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8db7e79b4f8845d6aa22f60d428ca89e~tplv-k3u1fbpfcp-watermark.image?)
> 
> order_info 存储用户订单信息、product_info 存储产品信息、role_info 存储角色信息、user_info 存储用户信息
- **将cloudfunctions目录中的云函数上传并部署**
> ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5287cdee1834040956977c0bbe906e7~tplv-k3u1fbpfcp-watermark.image?)
> ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/492b87da11dd4833b583d349a3e27be2~tplv-k3u1fbpfcp-watermark.image?)
### 用户注册
微信小程序用户信息授权真的是改了好多次，现在要获取用户头像昵称信息等要使用[getUserProfile API](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html)，原来使用Button组件用open-type还能获取信息但是在真机上展示不了用户信息。
> ![Jan-04-2022 16-22-27.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f85f20c8227e4efa9b1b8e15c149a03b~tplv-k3u1fbpfcp-watermark.image?)

```js
pages/user/index
wxml代码：
 <view class="header-icon-box color-fff text-center">
      <block wx:if="{{islogin}}">
        <image class="header-icon block" src="/images/USER.png"></image>
        <!-- <button class="header-icon-btn bg-blue color-fff" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取手机号</button> -->
        <button wx:if="{{userParam.errMsg}}" class="header-icon-btn bg-blue color-fff" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">绑定手机号</button>
        <button wx:else class="header-icon-btn bg-blue color-fff" bindtap="handleUserInfo">请点击登陆</button>
      </block>
      <block wx:else>
        <image class="header-icon block" src="{{userData.avatarUrl}}"></image>
        <view class="color-fff">{{userData.nickName}}</view>
      </block>
 </view>
 js代码：
   handleUserInfo() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        if (res.errMsg === 'getUserProfile:ok') {
          this.setData({
            userParam: res
          })
        } else {
          this.setData({
            islogin: true
          });
        }
      }
    })
  },
  getPhoneNumber(e) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
        name: 'userInfo',
        data: {
          method: 'POST',
          param: {
            ...this.data.userParam,
          },
          weRunData: wx.cloud.CloudID(e.detail.cloudID), // 此处是手机号的数据
        },
      })
      .then(res => {
        wx.hideLoading()
        console.log(res)
        const data = {
          role: res.result.role,
          openid: res.result.openid,
          moblie: res.result.moblie,
          ...res.result.userInfo
        }
        this.setData({
          islogin: false,
          userData: data
        });
        wx.setStorageSync('UserInfo', data)
      })
  },
```
这里因为朋友是注册公司的可以通过微信认证，所以在用户注册的时候增加的手机号的维度。大家在运行项目的时候可以酌情修改逻辑。用户信息接口代码在下面为大家贴出来，看起来更方便。

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV, // 这个是使用默认环境ID的变量
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch (event.method) { 
    case "GET": // 这里是获取用户数据列表的逻辑
      if (event.param.moblie) {
        return db.collection('user_info')
          .where({
            moblie: event.param.moblie,
          }).skip(event.param.page * event.param.size).limit(event.param.size).get() // skip是来做分页的逻辑
      }
      return db.collection('user_info')
        .skip(event.param.page * event.param.size).limit(event.param.size).get()
      break;
    case "POST":
      const moblie = event.weRunData.data.phoneNumber;
      let role = 'others'
      const userInfo = db.collection('user_info')
      // 这里是配置用户角色信息用来区分管理员和用户的角色
      return db.collection('role_info')
        .get().then((res) => {
          res.data.map((item, index) => {
            if (item.openid === wxContext.OPENID) { //根据用户注册后的openid来判断
              role = item.role
            }
          })
          const userItem = userInfo.where({
            openid: wxContext.OPENID
          }).get().then(res => {
          // 这里先判断用户信息是否存在
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
```
### 订单提交
> ![Jan-04-2022 16-25-15.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cab5bb41ed44bc08c65ab2bdca22852~tplv-k3u1fbpfcp-watermark.image?)

```js
// pages/confirmOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('UserInfo');
    this.setData({
      detail: JSON.parse(options.item),
      userInfo
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit(e) {
    console.log(e)

    const formData = e.detail.value;
    let flag = false

    for (const key in formData) {
      if (formData[key]) {
        flag = true
      } else {
        flag = false
      }
    }
    if (flag) {
      wx.showLoading({
        title: '预约中',
      })
      delete this.data.detail._id
      wx.cloud.callFunction({ // 这里调用order的云函数进行订单提交
        name: 'orderInfo',
        data: {
          method: 'POST',
          param: {
            orderStatus: "PENDING",
            ...formData,
            ...this.data.userInfo,
            ...this.data.detail
          }
        },
      }).then(res => {
        console.log(res)
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/orderResult/index',
        })
      })

    } else {
      wx.showToast({
        title: '请填写完整信息～',
        icon: 'none'
      })
    }

  }
})
```
orderinfo云函数的代码：

```js
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
    case "POST": // 这里进行提交订单的逻辑
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
```
### 订单列表
> ![Jan-05-2022 11-16-27.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dc0806d77d94100840b68b043233844~tplv-k3u1fbpfcp-watermark.image?)

```js
pages/orderInfo/index

getOrderInfo(status = "ALL") { //获取接口数据
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'orderInfo',
      data: {
        method: 'GET',
        param: {
          orderStatus: status,
          ...this.data.pageParam // 分页参数
        }
      },
    }).then(res => {
      wx.hideLoading()
      const arr = this.data.orderList.concat(res.result.data)
      this.setData({
        orderList: arr,
        onBottom: res.result.data.length === 0 || false
      })
    })
  },
  handleLower() { //修改分页参数
    const pageParam = this.data.pageParam;
    const index = this.data.activeTab
    pageParam.page++
    this.setData({
      pageParam
    })
    if (!this.data.onBottom) {
      this.getOrderInfo(this.data.tabs[index].status)
    }
  },
```
上面两段代码就是主要完成订单查询的功能，接下来是订单的云开发的查询和分页的代码：

```js
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
        }).orderBy('create', 'desc').skip(event.param.page * event.param.size).limit(event.param.size).get() // 这里主要是云开发的分页逻辑
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
```
[点击这里查看云开发相关API](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/collection/Collection.skip.html)
# 结语
由于项目比较小，就不贴很多代码来担误大家宝贵的时间了。强烈建议大家去clone代码自己运行起来，多点点，比看文章说半天不去实践效果会好很多。此文章主要是想让大家去多尝试尝试云开发的模式来拓展一下技术栈，让自己掌握后端的一些知识点。
还有大家的鼓励，是我接下来更新的动力。之后的更新计划：使用RN和Flutter来翻写此小程序，而且还是要结合小程序的云开发来做APP 🎉🎉🎉

> [再次附上项目地址（眼镜店）](https://github.com/LookGlasses/LookMini)
> 
> 还有一个我写的一个云开发的项目，想做的是本地话的回收，比起这个项目功能少一点大家也可以clone这个项目来尝试云开发：[本地化回收小程序](https://github.com/SkyRecovery/SkyRecoverMini)
