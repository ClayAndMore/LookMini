// index.js
Page({
  data: {
    bannerImgList: [{
      imgUrl: 'cloud://prod-1gukkkce639453a0.7072-prod-1gukkkce639453a0-1308496201/images/banner1.jpeg'
    }, {
      imgUrl: 'cloud://prod-1gukkkce639453a0.7072-prod-1gukkkce639453a0-1308496201/images/banner2.jpeg'
    }],
    itemList: [{
        name: '高清镜片',
        icon: '../../images/white.jpeg'
      },
      {
        name: '黑色镜片',
        icon: '../../images/black.jpeg'
      }, {
        name: '茶色透光',
        icon: '../../images/tea.jpeg'
      }, {
        name: '蓝色偏光',
        icon: '../../images/blue.jpeg'
      }, {
        name: '粉色偏光',
        icon: '../../images/pink.jpeg'
      },
    ],
    // classList: [{
    //   name: '框架眼镜',
    //   icon: '../../images/class.jpeg'
    // }, {
    //   name: '太阳镜',
    //   icon: '../../images/class.jpeg'
    // }, {
    //   name: '高清镜片',
    //   icon: '../../images/class.jpeg'
    // }, {
    //   name: '近视太阳镜',
    //   icon: '../../images/class.jpeg'
    // }, ],
    showUploadTip: false,
    productList: [],
    pageParam: {
      page: 0,
      size: 20
    },

  },
  onLoad() {
    this.getProductInfo()
  },

  onShareAppMessage() {},
  onShareTimeline() {},
  handleAppointment() {
    wx.switchTab({
      url: '/pages/appointment/index',
    })
  },
  getProductInfo(status = "") {
    console.log(status)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'productInfo',
      data: {
        method: 'GET',
        param: {
          productType: status,
          ...this.data.pageParam
        }
      },
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      const arr = this.data.productList.concat(res.result.data)
      this.setData({
        productList: arr,
      })
    })
  },
  handleDetail(e) {
    console.log(e)
    const data = e.currentTarget.dataset.item;
    console.log(data)
    wx.navigateTo({
      url: `/pages/goodsDetail/index?item=${JSON.stringify(data)}`,
    })
  },
});