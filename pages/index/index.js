//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    page_height: 0,
    date_offset: 0
  },
  onLoad: function () {
    var self = this;
    // 获取屏幕大小，根据屏幕高度设置页面大小
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        self.setData({
          page_height : res.windowHeight
        })
      },
    })

    // 获取距离立冬的时间的偏移量
    var date_now = new Date();
    var lidong = new Date(2017,11,22);
    var offset = (lidong.getTime() - date_now.getTime())/24/60/60/1000;
    var show_date = Math.floor(offset+1)
    if ( show_date == 3) {
      wx.redirectTo({
        url: '/pages/content/content'
      })
    } else {
      self.setData({
        date_offset: show_date,
      })
    }

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function(){
    return {
      title:'九九消寒图',
      desc:'数着日子过冬天~',
      path:'pages/index/index'
    }
  }
})
