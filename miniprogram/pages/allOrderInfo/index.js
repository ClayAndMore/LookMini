// pages/appointment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        title: '全部',
        status: 'ALL',

      },
      // {
      //   title: '待支付',
      //   status: 'PAY',

      // },
      {
        title: '进行中',
        status: 'PENDING',
      },
      {
        title: '已完成',
        status: 'DONE',
      },
      {
        title: '已取消',
        status: 'CANCEL',
      },
    ],
    activeTab: 1,
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.status) {
      this.data.tabs.map((item, index) => {
        if (item.status === options.status) {
          this.setData({
            activeTab: index
          })
        }
      })
    }
    this.getOrderInfo(this.data.tabs[this.data.activeTab].status)
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
  getOrderInfo(status = "ALL") {
    console.log(status)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'allOrderInfo',
      data: {
        method: 'GET',
        param: {
          orderStatus: status,
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
      this.getOrderInfo(this.data.tabs[index].status)
    }
  },
  onChange(e) {
    const index = e.detail.index
    console.log(index, '2')
    this.setData({
      activeTab: index,
      orderList: [],
      pageParam: {
        page: 0,
        size: 20
      },
      onBottom: false
    })
    this.getOrderInfo(this.data.tabs[index].status)
  },
  handleUpdate(e) {
    console.log(e)
    const data = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/updateOrder/index?item=${JSON.stringify(data)}`,
    })
  }
})