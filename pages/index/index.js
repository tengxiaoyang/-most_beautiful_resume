const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_icon: "https://hbimg.huabanimg.com/bc4a96cf3ea27046c3f587cc1882943f666d4e7536db-JZTJN6_fw658/format/webp",
    username: "新用户",
    job_intention: "前端工程师",
    have_user_info: false,

    name: "滕晓阳",
    gender: "男",
    year_of_birth: "1997",
    
    I_liked: "0" + "/100",
    have_been_collected: "0/20",
    jokes_have_told: "0/5",

    jokes_data: [],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    

    if (app.globalData.userInfo) {
      this.setData({
        user_icon: app.globalData.userInfo.avatarUrl,
        username: app.globalData.userInfo.nickName,
        have_user_info: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          user_icon: app.globalData.userInfo.avatarUrl,
          username: app.globalData.userInfo.nickName,
          have_user_info: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            user_icon: app.globalData.userInfo.avatarUrl,
            username: app.globalData.userInfo.nickName,
            have_user_info: true
          })
        }
      })
    }
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