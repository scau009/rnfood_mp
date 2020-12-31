import React, { Component } from 'react'
import {AtIcon} from "taro-ui";
import Taro from '@tarojs/taro'

import { View } from '@tarojs/components'
import './index.scss'


export default class StoreItem extends Component {


  render () {
    const store = this.props.store;
    return (
      <View className='content_block mt-3'>
        <View className='title'>{store.company.title}（{store.title}）</View>
        <View className='at-row'>
          <View className='at-col at-col-11'>
            <View className='text-small text-mute mt-2'>营业时间：{store.dayBegin} {store.timeBegin}-{store.dayEnd} {store.timeEnd}</View>
            <View className='text-small text-mute'>商家电话：{store.mobile}</View>
            <View className='text-small text-mute'>{store.province}{store.city}{store.area}{store.route}</View>
          </View>
          <View className='at-col at-col-1'>
            <View className='at-row at-row__direction--column at-row__justify--center'>
              <AtIcon value='phone' size='22' color='#ec5d11' />
              <AtIcon value='map-pin' className='mt-2' size='22' color='#ec5d11' />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
