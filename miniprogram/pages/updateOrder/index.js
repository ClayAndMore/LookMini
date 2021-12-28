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
    console.log(this.data.detail)
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
        title: '登记中',
      })
      wx.cloud.callFunction({
        name: 'allOrderInfo',
        data: {
          method: 'POST',
          param: {
            orderDetail: formData,
            ...this.data.detail,
            actionId: this.data.userInfo.openid,
            actionName: this.data.userInfo.nickName,
            orderStatus: "DONE",
          }
        },
      }).then(res => {
        console.log(res)
        wx.hideLoading()
        wx.navigateBack()
        // wx.navigateTo({
        //   url: '/pages/orderResult/index',
        // })
      })

    } else {
      wx.showToast({
        title: '请填写完整信息～',
        icon: 'none'
      })
    }

  }
})