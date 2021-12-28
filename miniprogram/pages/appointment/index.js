// pages/appointment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        title: '全部',
        status: '',

      },
      {
        title: '远近视配镜',
        status: 'GLASSES',

      },
      {
        title: '太阳镜',
        status: 'SUN',
      },
      {
        title: '防蓝光',
        status: 'BLUE',
      },
    ],
    activeTab: 0,
    productList: [],
    pageParam: {
      page: 0,
      size: 20
    },
    onBottom: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductInfo()
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
  handleDetail(e) {
    console.log(e)
    const data = e.currentTarget.dataset.item;
    console.log(data)
    wx.navigateTo({
      url: `/pages/goodsDetail/index?item=${JSON.stringify(data)}`,
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
      this.getProductInfo(this.data.tabs[index].status)
    }
  },
  onChange(e) {
    const index = e.detail.index
    console.log(index, '2')
    this.setData({
      activeTab: index,
      productList: [],
      pageParam: {
        page: 0,
        size: 20
      },
      onBottom: false
    })
    this.getProductInfo(this.data.tabs[index].status)
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
        onBottom: res.result.data.length === 0 || false
      })
    })
  },
  handleCancel() {}
})