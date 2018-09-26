const { baseUrl } = getApp().globalData
const baseUrls = `${baseUrl}/Api/GasOrders/NewGasOrder`//一键订气上传接口
const utils = require("../../utils/util.js")// pages/Supplier/Supplier.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,//弹框按钮操控
    Suppliers: [
      {
        Supplier: "旧宫供应商",
        SupplierPhone: "67475845",
        SupplierAddress: "大兴区旧宫镇清理路碧海公园北旧宫供应商",
        SupplierDistance: "13.6km"
      },
      {
        Supplier: "旧宫供应商1",
        SupplierPhone: "67475845",
        SupplierAddress: "大兴区旧宫镇清理路碧海公园北旧宫供应商",
        SupplierDistance: "13.6km"
      },
      {
        Supplier: "旧宫供应商2",
        SupplierPhone: "67475845",
        SupplierAddress: "大兴区旧宫镇清理路碧海公园北旧宫供应商",
        SupplierDistance: "13.6km"
      },
      {
        Supplier: "旧宫供应商3",
        SupplierPhone: "67475845",
        SupplierAddress: "大兴区旧宫镇清理路碧海公园北旧宫供应商",
        SupplierDistance: "13.6km"
      },
      {
        Supplier: "旧宫供应商4",
        SupplierPhone: "67475845",
        SupplierAddress: "大兴区旧宫镇清理路碧海公园北旧宫供应商",
        SupplierDistance: "13.6km"
      },
      {
        Supplier: "旧宫供应商5",
        SupplierPhone: "67475845",
        SupplierAddress: "大兴区旧宫镇清理路碧海公园北旧宫供应商",
        SupplierDistance: "13.6km"
      },
      {
        Supplier: "旧宫供应商6",
        SupplierPhone: "67475845",
        SupplierAddress: "大兴区旧宫镇清理路碧海公园北旧宫供应商",
        SupplierDistance: "13.6km"
      },
    ],
  },
   /**
     * 弹窗
     */
    SupplierDialogBtn () {
      this.setData({
        showModal: true
      })
    },
    /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
      this.setData({
        showModal: false
      });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function () {
      this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function () {
      this.hideModal();
      wx.navigateTo({
        url: '/pages/OrderAddress/OrderAddress',
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})