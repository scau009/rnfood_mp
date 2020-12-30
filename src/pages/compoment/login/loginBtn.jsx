import React, { Component } from 'react'
import Taro from '@tarojs/taro'

import './index.scss'
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
export default class LoginBtn extends Component {

  handleGetUserInfo(e) {
    console.error("handleGetUserInfo", e);
    if (e.detail.userInfo) {
      const userInfo = e.detail.userInfo;
      const encryptedData = e.detail.encryptedData;
      const signature = e.detail.signature;
      const iv = e.detail.iv;
      Taro.login().then((res) => {
        if (res.code) {
          // this.setState({'isOpened': true});
          Api.request('POST', '/api/auth/login', {
            userInfo: userInfo,
            encryptedData: encryptedData,
            signature: signature,
            iv: iv,
            code: res.code,
          }).then((response) => {
            console.log(response);
            this.props.login({userInfo: {...userInfo}});
          }).catch(err => {
            console.error("拒绝登录", err)
          });
        }
      });
    }

  }

  render () {
    return (
      <AtButton type='primary' circle={this.props.circle} onGetUserInfo={this.handleGetUserInfo.bind(this)} openType='getUserInfo'>{this.props.btnText ? this.props.btnText : '微信登录' }</AtButton>
    )
  }
}
