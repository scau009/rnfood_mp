import React, { Component } from 'react'
import Taro from "@tarojs/taro";
import { Provider } from 'react-redux'
import 'taro-ui/dist/style/index.scss'
import configStore from './store'
import './app.scss'
import './custom-theme.scss'
import {LOGIN} from "./constants/auth";
import Api from "./apiClient/apiClient";

const store = configStore()

class App extends Component {

  componentWillMount() {
    const jwt = Taro.getStorageSync('jwt');
    if (jwt) {
      Api.request("GET", '/api/clients/userInfo').then((res)=>{
        store.dispatch({type: LOGIN,data:{userInfo:{avatarUrl:res.avatar,nickName:res.username}}});
      });
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}



  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App

