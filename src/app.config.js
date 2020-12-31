export default {
  pages: [
    'pages/index/index',
    'pages/user/index',
    'pages/trade/index',
    'pages/detail/index',
    'pages/trade/create/index',
    'pages/trade/detail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ec5d11',
    navigationBarTitleText: '惠食生活圈',
    navigationBarTextStyle: 'white',
  },
  tabBar: {
    "selectedColor": '#ec5d11',
    "list": [{
      "pagePath": "pages/index/index",
      "text": "美食",
      "iconPath": "asset/image/home_off.png",
      "selectedIconPath": "asset/image/home_active.png",
    }, {
      "pagePath": "pages/user/index",
      "text": "我的",
      "iconPath": "asset/image/order_off.png",
      "selectedIconPath": "asset/image/order_active.png",
    }]
  },
  networkTimeout: {
    "request": 10000,
    "downloadFile": 10000
  }
}


//AppSecret = c584cce43601f1d05ca15d8690f7fdda
//AppID = wx857daea9c9c24bfc
