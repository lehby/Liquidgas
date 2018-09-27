// pages/Repair/Repair.js
var util = require('../../utils/util.js');
let app = getApp()
const baseUrl = app.globalData.baseUrl
// 获取维修项目
const baseUrls = `${baseUrl}/Api/RepairOrders/GetRepairLabels`
// 提交维修订单
const baseUrlBd = `${baseUrl}/Api/RepairOrders/NewRepairOrder`
// 提交照片
const Urlsimg = `${baseUrl}/Api/Files/UploadImg`


Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '立即出发',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
    ], //预定时间弹框
    index: 0,

    isAddress: true, //控制地址隐藏显示
    // 要提交的数据
    frolist: {
      Contact: "",
      Phone: "",
      Address: "",
      // 预约时间
      SubscribeTime: "立即出发",
      // 维修描述
      ProblemDescription: "",
      // 照片编码
      PhotoIds: "",
      // 企业编号
      EnterpriseId: "",
      // 用户编号
      CustomerId: "",
      // 经纬度
      Longitude: "",
      Latitude: "",
      // 用户唯一编码
      AccountId: "",
      // 维修编号
      RepairLabelIds: "",
      // 服务模式
      ServiceMode: "0",
      images: [],
    },
    guaranteeList: [],
    //  判断选项状态
    changeType: 1,
    sss: "",
    // 图片数组
    pics: [],
    add: ""
  },


  // 表单提交=========================
  Submit() {
    let _this = this
    let frolists = _this.data.frolist
    let pics = _this.data.pics
    console.log(frolists)
    let Contact = frolists.Contact
    let Phone = frolists.Phone
    let Address = frolists.Address
    let SubscribeTime = frolists.SubscribeTime
    let ProblemDescription = frolists.ProblemDescription
    let ServiceMode = frolists.ServiceMode
    let RepairLabelIds = frolists.RepairLabelIds
    let PhotoIds = frolists.PhotoIds
    let AccountId = frolists.AccountId
    let Longitude = frolists.Longitude
    let Latitude = frolists.Latitude
    let CustomerId = frolists.CustomerId
    let EnterpriseId = frolists.EnterpriseId

    if (pics.length < 1) {
      wx.showToast({
        title: "请添加照片",
        duration: 2000
      })
      return false
    }
    wx.request({
      url: baseUrlBd,
      data: {
        Sign: "",
        Contact: util.Encryption(Contact),
        Phone: util.Encryption(Phone),
        Address: util.Encryption(Address),
        SubscribeTime: SubscribeTime,
        ProblemDescription: ProblemDescription,
        AccountId: AccountId,
        PhotoIds: PhotoIds,
        RepairLabelIds: RepairLabelIds,
        ServiceMode: ServiceMode,
        Latitude: Latitude,
        Longitude: Longitude,
        CustomerId: CustomerId,
        EnterpriseId: EnterpriseId,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(res) {
        if (res.data.Code == 200) {
          wx.switchTab({ //主页面
            url: '/pages/RepairOrder/RepairOrder'
          })
        } else {
          wx.showToast({
            title: "请重新提交！",
            duration: 1000
          });
        }
      },
    })
  },
  // 获取点的什么维修事项===================
  Discoloration: function(e) {
    let _this = this
    let index = e.target.dataset.index - 1
    let list = _this.data.guaranteeList
    if (list[index].Enabled == true) {
      list[index].Enabled = false
    } else {
      list[index].Enabled = true
    }
    _this.setData({
      guaranteeList: list
    })
    for (let i = 0; i < _this.data.guaranteeList.length; i++) {
      if (_this.data.guaranteeList[i].Enabled == false) {
        let sort = _this.data.guaranteeList[i].ID
        _this.setData({
          "frolist.RepairLabelIds": sort
        })
      }
    }
  },


  // 获取报修项目
  repair: function() {
    let _this = this
    wx.request({
      url: baseUrls,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        let guaranteeList = res.data.Data
        if (res.data.Code == 200) {
          _this.setData({
            guaranteeList: guaranteeList
          })
        } else {
          console.log("错误")
        }
      },
    })
  },

  //获取用户选择时间
  bindPickerChange: function(e) {
    let timelist = this.data.array
    let index = e.detail.value
    let timelists = timelist[index]
    if (timelists == "立即出发") {
      this.setData({
        "frolist.ServiceMode": 0
      })
    } else {
      this.setData({
        "frolist.ServiceMode": 10
      })
    }
    this.setData({
      "frolist.SubscribeTime": timelists
    })
  },
  
  
  /**
   * 地址隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 地址对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  // 用户名称
  userName(e) {
    this.setData({
      "frolist.Contact": e.detail.value
    })
  },
  // 用户电话
  userPhone(e) {
    this.setData({
      "frolist.Phone": e.detail.value
    })
  },
  // 用户地址
  userAddress(e) {
    this.setData({
      "frolist.Address": e.detail.value
    })
  },
  // 获取故障描述
  textm: function(e) {
    let _this = this
    let textm = e.detail.value
    _this.setData({
      "frolist.ProblemDescription": textm
    })
  },



  // 表单验证正确后才可以隐藏表格
  onConfirm: function() {
    let fomlist = this.data.frolist
    let telphone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!fomlist.Contact || !fomlist.Phone || !fomlist.Address) {
      wx.showToast({
        title: '请完整填写信息',
        duration: 2000
      })
      return false
    }
    if (!telphone.test(fomlist.phone)) {
      wx.showToast({
        title: '电话输入有误',

        duration: 2000
      })
      return false
    }
    this.setData({
      isAddress: false,
    })
    this.hideModal();
  },


  /**
   * 地址无数据隐藏页面弹框
   */
  Add() {
    let num = 2
    wx.setStorageSync("page", num)
    wx.navigateTo({
      url: '/pages/GasInformation/GasInformation',
    })
  },


  pictureuploading: function() { //这里是选取图片的方法
    var that = this,
      pics = this.data.pics;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;　　　　　　　　　
        pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });
        // 上传图片
        that.uploadImg()
      },
    })
  },


  //多张图片上传
  uploadImg:function() {
    let that = this,
       i=0,
     path = that.data.pics;
    wx.uploadFile({
      url: Urlsimg,
      filePath: path[i],
      name: 'image', //这里根据自己的实际情况改key
      formData: null, //这里是上传图片时一起上传的数据
      success: (res) => {
        console.log(res)

      },
      fail: (res) => {

      },
      complete: () => {

        i++; //这个图片执行完上传后，开始上传下一张
        if (i == path.length) { //当图片传完时，停止调用          

        } else { //若图片还没有传完，则继续调用函数

          that.uploadImg(data);
        }
      }
    });
  },



  /**
   * 移除图片
   */
  removeImg(e) {
    let img = e.target.dataset.img_url;
    let imgs = this.data.pics;
    imgs.splice(imgs.indexOf(img), 1);
    this.setData({
      pics: imgs
    })
  },
  // 图片预览
  previewImg: function(e) {
    var data_evnt = e; //将函数事件对象传入 ，以及图片获取到的数组 
    util.imgpreview(data_evnt, this.data.pics)
  },



  /**
   * 生命周期函数--监听页面加载*******
   */
  onLoad: function(options) {
    let _this = this
    _this.repair() //获取保修项目
   
    // 获取本地缓存
    wx.getStorage({
      key: 'Information',
      success: function(res) {
        // 企业编号
        let EnterpriseId = res.data.EnterpriseId
        // 用户编码
        let CustomerId = res.data.CustomerId
        // 用户唯一编码
        let AccountId = res.data.AccountId
        // name1:util.Decrypt(name)
        // phone1: util.Decrypt(phone)
        // address1: util.Decrypt(address)
        _this.setData({
          "frolist.EnterpriseId": EnterpriseId,
          "frolist.CustomerId": CustomerId,
          "frolist.AccountId": AccountId,
        })
      },
    })
    
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    let _this=this
    let name = app.globalData.Orderaddress.Contact
    let phone = app.globalData.Orderaddress.Phone
    let Address = app.globalData.Orderaddress.Address

    _this.setData({
      "frolist.Contact": name,
      "frolist.Phone": phone,
      "frolist.Address": Address,
    })
    let frolist1 = _this.data.frolist

    if (frolist1.Contact == "" || frolist1.Contact == undefined) { //判断是否有数据页面切换
      this.setData({
        isAddress: true,
      })
    } else {
      this.setData({
        isAddress: false,
      })
    }
  },


})