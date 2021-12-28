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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
      wx.cloud.callFunction({
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