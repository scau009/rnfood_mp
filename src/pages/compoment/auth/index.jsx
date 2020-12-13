import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {View, Image, Button} from '@tarojs/components'

import {AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";

import './index.scss'

export default class AuthDialog extends Component {

  handleHideModal() {
    console.log('点击了handleHideModal');
  }

  handleGetPhoneNumber() {
    console.log('点击了handleGetPhoneNumber');
  }

  render () {

    return (
      <AtModal isOpened={this.props.isOpened}>
        <AtModalHeader>惠食生活圈申请</AtModalHeader>
        <AtModalContent>
          <View>获取您的基本信息，我们</View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={this.handleHideModal.bind(this)}>拒绝</Button>
          <Button openType='getPhoneNumber' onGetPhoneNumber={this.handleGetPhoneNumber.bind(this)}>确定</Button>
        </AtModalAction>
      </AtModal>
    )
  }
}
