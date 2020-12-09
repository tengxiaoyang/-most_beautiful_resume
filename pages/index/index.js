const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_icon: "/images/user_icon.jpg",
    username: "滕晓阳",
    job_intention: "前端工程师",
    have_user_info: false,

    name: "滕晓阳",
    gender: "男",
    year_of_birth: "1997",

    educational_history: "本科",
    school: "西北工业大学明德学院",
    mail_box: "656877449@qq.com",
    github: "https://github.com/tengxiaoyang",
    expected_position: "web前端",

    basics: "熟悉HTML、CSS、JS等web开发技术，熟悉页面布局",
    framework: "熟悉vue等主流框架开发",
    other_skills: "有一定的数据结构和算法等计算机基础",

    list:[
      {
        listName:'微信小程序 看段子 已上线',
        item:[
          {
            introduce:'看段子的小程序，已在微信上线。具有点赞、收藏、登录等功能。添加了积分商城、个人信息等页面。',
            tech:'wxml、wxss、js、使用缓存存储数据',
            github:'https://github.com/tengxiaoyang/ReadJokes',
            name: "看段子"
          }
        ]
      }, 
      {
        listName:'仿美团移动端 使用了vue-vuex',
        item:[
          {
            introduce:'仿美团移动端的项目。具有首页、选择城市、团购详情、提交订单等页面。',
            tech:'HTML、CSS、js、vue2、vue-router、组件化、vuex、webpack',
            github:'https://github.com/tengxiaoyang/online-store'
          }
        ]
      }, 
      {
        listName:'仿腾讯视频移动端 使用vue实践了组件化',
        item:[
          {
            introduce:'仿腾讯视频移动端的项目。具有首页、搜索页、视频详情页等页面。',
            tech:'HTML、CSS、js、vue2、vue-router、组件化、vuex、webpack',
            github:'https://github.com/tengxiaoyang/video'
          }
        ]
      }, 
      {
        listName:'仿今日头条移动端 使用了vue',
        item:[
          {
            introduce:'仿今日头条移动端的项目。具有首页、新闻搜索页、新闻详情页等页面。',
            tech:'HTML、CSS、js、vue2、vue-router、webpack',
            github:'https://github.com/tengxiaoyang/news'
          }
        ]
      }, 
      {
        listName:'仿拉勾PC端 使用了HTML、CSS',
        item:[
          {
            introduce:'仿拉勾PC端的项目。具有首页、搜索结果页等页面。',
            tech:'HTML、CSS',
            github:'https://github.com/tengxiaoyang/lagou'
          }
        ]
      }, 
    ]
    

  },
  get_user_info: function(e) {
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        // user_info: e.detail.userInfo,
        user_icon: e.detail.userInfo.avatarUrl,
        username: e.detail.userInfo.nickName,
        have_user_info: true
      })
    }
  },
  navigateToMiniProgram(){
    wx.navigateToMiniProgram({
      appId: 'wx1fa8a5689b3ffd69',
      extraData: {
        
      },
      envVersion: 'develop',
      success(res) {
        
      }
    })
  },

    //点击最外层列表展开收起
    listTap(e){
      console.log('触发了最外层');
      let Index = e.currentTarget.dataset.parentindex,//获取点击的下标值
          list=this.data.list;
      list[Index].show = !list[Index].show || false;//变换其打开、关闭的状态
      if (list[Index].show){//如果点击后是展开状态，则让其他已经展开的列表变为收起状态
        this.packUp(list,Index);
      }
  
      this.setData({
        list
      });
    },
    //点击里面的子列表展开收起
    listItemTap(e){
      let parentindex = e.currentTarget.dataset.parentindex,//点击的内层所在的最外层列表下标
          Index=e.currentTarget.dataset.index,//点击的内层下标
          list=this.data.list;
      console.log(list[parentindex].item,Index);
      list[parentindex].item[Index].show = !list[parentindex].item[Index].show||false;//变换其打开、关闭的状态
      if (list[parentindex].item[Index].show){//如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
        for (let i = 0, len = list[parentindex].item.length;i<len;i++ ){
          if(i!=Index){
            list[parentindex].item[i].show=false;
          }
  
        }
      }
      this.setData({list});
    },
    //让所有的展开项，都变为收起
    packUp(data,index){
      for (let i = 0, len = data.length; i < len; i++) {//其他最外层列表变为关闭状态
        if(index!=i){
          data[i].show = false;
          for (let j=0;j<data[i].item.length;j++){//其他所有内层也为关闭状态
              data[i].item[j].show=false;
          }
        }
      }
    },
    

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     user_icon: app.globalData.userInfo.avatarUrl,
    //     username: app.globalData.userInfo.nickName,
    //     have_user_info: true
    //   })
    // } else if (this.data.canIUse){
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       user_icon: app.globalData.userInfo.avatarUrl,
    //       username: app.globalData.userInfo.nickName,
    //       have_user_info: true
    //     })
    //   }
    // } else {
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         user_icon: app.globalData.userInfo.avatarUrl,
    //         username: app.globalData.userInfo.nickName,
    //         have_user_info: true
    //       })
    //     }
    //   })
    // }
  },

  previewImage: function(e) {
    console.log(e);
    let now_index = e.currentTarget.dataset.index;
    let current = e.currentTarget.dataset.src
    console.log(current)
    wx.previewImage({
      current,
      urls: [this.data.jokes_data[now_index].photo]
    })
  },
  
  set_number_of_my_likes() {
    wx.getStorage({
      key: "like_key",
      success: (res) => {
        console.log(res.data)
        let storage_string = res.data;
        let storage_arr = JSON.parse(storage_string);
        console.log(storage_arr);

        let number_of_my_likes = storage_arr.length;        
        this.setData({
          I_liked: number_of_my_likes + "/100"
        })
      }
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
    let pages = getCurrentPages(); 
    let beforePage = pages[pages.length - 2];
    wx.switchTab({
        url: '/' + beforePage.route,
        success: function() {
            if (beforePage.route === "pages/mine/mine"){
                beforePage.onLoad()
            }
        }
    })
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