import React, { Component } from 'react'
import { View, Image} from '@tarojs/components'
import {AtButton} from "taro-ui";

import {connect} from "react-redux";
import Taro from "@tarojs/taro";
import './index.scss'
import {LOGIN} from "../../constants/auth";
import LoginPage from "../compoment/login";
import coupons from "../../asset/image/coupons.png";
import orders from "../../asset/image/orders.png";


@connect(({ loginUpdater }) => ({
  loginUpdater
}), (dispatch) => ({
  login () {
    dispatch({type:LOGIN})
  },
}))
class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentWillMount() {
    if (this.props.loginUpdater.isLogin) {

    }
  }

  componentWillUnmount () { }

  handleGoToTrades() {
    Taro.navigateTo({
      url: "/pages/trade/index"
    })
  }


  render () {
    const {avatarUrl,nickName,mobile} = {...this.props.loginUpdater.userInfo};
    return (
      <View className='bg-default vh-100'>
        {
          this.props.loginUpdater.isLogin ? <View>
            <View  className='user_info_block'>
              <View className='at-row'>
                <View className='at-col--auto'>
                  <Image className='avatar_image' mode='widthFix' src={avatarUrl} />
                </View>
                <View>
                  <View className='user_name'>{nickName}</View>
                  <View className='mobile'>{mobile ? mobile : "绑定手机号码"}</View>
                </View>
              </View>
            </View>

            <View className='content'>
              <View className='trade_block'>
                <View className='at-row at-row__align-content--center'>
                  <View className='at-col text-center'>
                    <View>
                      <Image src={coupons} className='user_icon' />
                    </View>
                    <View className='text-mute text-small'>优惠券</View>
                  </View>
                  <View className='at-col text-center' onClick={this.handleGoToTrades.bind(this)}>
                    <View>
                      <Image src={orders} className='user_icon' />
                    </View>
                    <View className='text-mute text-small'>全部订单</View>
                  </View>
                </View>
              </View>
            </View>
          </View> : <LoginPage />
        }
      </View>
    );
  }
}

export default Index

