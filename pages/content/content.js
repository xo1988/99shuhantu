const app = getApp()

Page({
  data:{
    ori_poem:[
      "一九冬至一阳生万物资始渐沟萌莫道隆冬无好景山川草木玉妆成",
      "二九七日是小寒田间休息掩柴关室家共享盈宁福预计来年春不闲",
      "三九严寒春结冰罢钩归来蓑笠翁虽无双鲤换新酒且喜床头樽不空",
      "四九雪铺满地平朔风凛冽起新晴朱堤公子休嫌冷山有樵夫赤足行",
      "五九元旦一岁周茗香椒酒答神麻太平天子朝元日万国衣冠拜冕梳",
      "六九上苑佳景多满城灯火映星河寻常巷陌皆车马到处笙歌表太和",
      "七九之数六十三堤边杨柳欲含烟红梅几点传春讯不待东风二月天",
      "八九风和日迟迟名花先发向阳枝即今河畔冰开日又是渔翁垂钓时",
      "九九莺啼上苑东青青草色含烟蒙老农教子宜耕早二月中天起卧龙"
    ],
    poem:[],
    poem_sentences:"",
    poem_row_num:7,                 // 诗每行多少个字
    poem_class:[],                  // css样式class
    page_height: 0,
    page_width:0,
    num_map: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
  },
  onLoad: function() {
    var self = this;
    // 获取屏幕大小，根据屏幕高度设置页面大小
    self.setData({
      page_height: app.globalData.system_info.windowHeight,
      page_width: app.globalData.system_info.windowWidth
    })
    // 画canvas背景
    const ctx = wx.createCanvasContext('front_window')
    ctx.drawImage('../../images/canvas_bg.jpg', 0, 0, app.globalData.system_info.windowWidth, app.globalData.system_info.windowHeight)
    ctx.draw()
    // 获取距离立冬首日的偏移量
    var date_now = new Date();
    var lidong = new Date(2017, 11, 22);
    var offset = (date_now.getTime() - lidong.getTime()) / 24 / 60 / 60 / 1000;
    var total_date = Math.floor(offset);
    var round_date = Math.floor(total_date/9);
    var offset_date = total_date%9;
    wx.setNavigationBarTitle({
      title: self.data.num_map[round_date] + '九第' + self.data.num_map[offset_date]+'天'
    })
    // 设置要显示的诗句
    for (var i = 0; i < self.data.ori_poem.length; i++) {
      self.data.poem.push([]);
      for ( var j = 0; j < self.data.ori_poem[i].length; j++) {
        if (j % self.data.poem_row_num == 0) {
          self.data.poem[i].push([]);
        }
        self.data.poem[i][Math.floor(j / self.data.poem_row_num)].push(self.data.ori_poem[i].substring(j, j + 1));
      }
    }
    // 设置样式
    for ( var i = 0; i < 4; i++) {
      self.data.poem_class.push([]);
      for (var j = 0; j < self.data.poem_row_num; j++) {
        self.data.poem_class[i].push(0);
      }
    }
    console.log(self.data.poem[round_date])
    console.log(self.data.poem_class)
    self.setData({
      poem_sentences:self.data.poem[round_date],
      poem_class: self.data.poem_class
    })
    // 设置动态变化
    var turn = function (i,j) {
      setTimeout(function () {
        self.data.poem_class[i][j] = 1;
        self.setData({
          poem_class: self.data.poem_class
        })
      }, 200 * (i * self.data.poem_row_num + j))
    }
    var addClass = function (){
      for(var i = 0; i< 4; i++) {
        for (var j = 0; j < self.data.poem_row_num; j++) {
          turn(i, j)
        }
      }
    }
    addClass()
  },
  onShareAppMessage: function () {
    return {
      title: '九九消寒图',
      desc: '数着日子过冬天~',
      path: 'pages/index/index'
    }
  }
})