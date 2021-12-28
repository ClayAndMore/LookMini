// pages/appointment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    pageParam: {
      page: 0,
      size: 20
    },
    onBottom: false,
    obj: {
      PENDING: '进行中',
      DONE: '已完成',
      CANCEL: '已取消',
    },
    searchValue: '',
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderInfo()
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
  getOrderInfo(phone = "") {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'userInfo',
      data: {
        method: 'GET',
        param: {
          moblie: phone,
          ...this.data.pageParam
        }
      },
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      const arr = this.data.orderList.concat(res.result.data)
      this.setData({
        orderList: arr,
        onBottom: res.result.data.length === 0 || false
      })
    })
  },
  handleLower() {
    const pageParam = this.data.pageParam;
    const index = this.data.activeTab
    pageParam.page++
    this.setData({
      pageParam
    })
    if (!this.data.onBottom) {
      this.getOrderInfo()
    }
  },
  getSearchInfo(phone = "") {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'userInfo',
      data: {
        method: 'GET',
        param: {
          moblie: phone,
          ...this.data.pageParam
        }
      },
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      this.setData({
        searchList: res.result.data,
      })
    })
  },
  selectResult(e) {
    console.log(e)
    const phone = e.detail.value
    if (phone) {
      this.setData({
        searchValue: phone,
        page: 0,
        size: 20,
        searchList: []
      })
      this.getSearchInfo(phone)
    } else {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    }
  },
  selectClear() {
    this.setData({
      searchValue: '',
      page: 0,
      size: 20,
      searchList: []
    })
  }
})