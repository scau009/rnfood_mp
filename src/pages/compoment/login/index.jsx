import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'

import './index.scss'
import logo from "../../../asset/image/logo-rnfood.png";
import {AtButton} from "taro-ui";
import Api from "../../../apiClient/apiClient";
import {connect} from "react-redux";
import {LOGIN} from "../../../constants/auth";

@connect(({ loginUpdater }) => ({
  loginUpdater
}), (dispatch) => ({
  login (data) {
    dispatch({type:LOGIN,data})
  },
}))
export default class LoginPage extends Component {

  handleGetUserInfo(e) {

    const userInfo = e.detail.userInfo;
    const encryptedData = e.detail.encryptedData;
    const signature = e.detail.signature;
    const iv = e.detail.iv;
    console.log("userInfo",e);
    //弹出获取手机号的弹窗，授权手机号码
    Taro.login().then((res)=>{
      if (res.code) {
        // this.setState({'isOpened': true});
        Api.request('POST', '/api/auth/login', {
          userInfo:userInfo,
          encryptedData: encryptedData,
          signature: signature,
          iv: iv,
          code:res.code,
        }).then((response)=>{
          console.log(response);
          this.props.login({userInfo:{...userInfo}});
        }).catch();
      }
    });
  }

  render () {

    return (
      <View className='login_page page'>
        <View className='login_box'>
          <View className='mx-auto'>
            <Image src={logo} mode='widthFix' />
          </View>
          <View style={{width:'100%'}} className='mt-3'>
            <AtButton type='primary' circle onGetUserInfo={this.handleGetUserInfo.bind(this)} openType='getUserInfo'>微信登录</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
