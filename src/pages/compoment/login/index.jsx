import React, { Component } from 'react'
import {View, Image} from '@tarojs/components'

import './index.scss'
import logo from "../../../asset/image/logo-rnfood.png";
import LoginBtn from "./loginBtn";

export default class LoginPage extends Component {

  render () {
    return (
      <View className='login_page page'>
        <View className='login_box'>
          <View className='mx-auto'>
            <Image src={logo} mode='widthFix' />
          </View>
          <View style={{width:'100%'}} className='mt-3'>
            <LoginBtn circle />
          </View>
        </View>
      </View>
    )
  }
}
