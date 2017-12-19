const app = getApp()

Page({
  data:{
    // 起源日
    origin_date:new Date(2017,11,22),
  },
  onLoad: function() {
    // 获取距离立冬首日的偏移量
    var date_now = new Date();
    var lidong = new Date(2017, 11, 19);
    var offset = (date_now.getTime() - lidong.getTime()) / 24 / 60 / 60 / 1000;
    var show_date = Math.floor(offset)
    console.log(show_date)
  }
})