import React, { Component } from 'react'
import { Swiper, SwiperItem , View,Image } from '@tarojs/components'
import Taro from '@tarojs/taro'


import './index.scss'


export default class CouponItem extends Component {


  render () {
    const coupons = this.props.coupons;
    return (
      <View style={{padding:Taro.pxTransform(40),background:"#ffffff"}}>
        <Swiper indicatorColor='#999' indicatorActiveColor='#333' circular indicatorDots style={{height:Taro.pxTransform(300)}}>
          {
            coupons && coupons.map(coupon=>{
              return <SwiperItem style={{height:Taro.pxTransform(300)}}>
                <View className='text-center'>{coupon.couponNo}</View>
                <View className='text-center'>
                  <Image style={{height:Taro.pxTransform(200)}} mode='heightFix'  src={coupon.qrCode} />
                </View>
              </SwiperItem>
            })
          }
        </Swiper>
      </View>

    )
  }
}
