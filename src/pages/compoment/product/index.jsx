import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.scss'


export default class ProductItem extends Component {

  handleClick = (id) => {
    console.log("/pages/detail/index?id=" + id);
    Taro.navigateTo({
      url: "/pages/detail/index?id=" + id
    });
  };

  render () {

    const {id,headImage,title,price,priceWas,soldCount} = {...this.props.product};
    return (
      <View className='product_item' onClick={this.handleClick.bind(this,id)}>
        <View className='img_block'>
          <Image src={headImage} mode='aspectFill' />
        </View>
        <View className='content_block'>
          <View className='title'>{title}</View>
        </View>
        <View className='price_block'>
          <View className='at-row at-row__align--end'>
            <View className='at-col at-col-1 at-col--auto'>
              <View className='at-row at-row__align--end'>
                <View className='price color-main'>￥{price}</View>
                <View className='price_was'>门店价</View><View className='price_was line-through'>￥{priceWas}</View>
              </View>
            </View>
            <View className='at-col'>
              <View className='sale_count text-mute text-small'>{soldCount}人已买</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
