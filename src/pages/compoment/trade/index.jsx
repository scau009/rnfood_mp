import React, { Component } from 'react'
import {AtButton} from "taro-ui";
import Taro from '@tarojs/taro'

import { View, Image } from '@tarojs/components'
import './index.scss'


export default class TradeItem extends Component {

  render () {

    const trade = this.props.trade;
    return (
      <View className='trade_item'>
        <View className='at-row'>
          <View className='at-col text-small text-mute'>
            订单号 {trade.tid}
          </View>
          <View className='at-col text-small color-main text-right'>
            {trade.statusLabel}
          </View>
        </View>
        {
          trade.orders.map(order=>{
            return <View>
              <View className='at-row mt-2'>
                <View className='at-col--auto product_image_block'>
                  <Image mode='aspectFill' className='product_image bg-default' src={order.product.headImage} />
                </View>
                <View className='at-col'>
                  <View className='at-row at-row__direction--column at-row__justify--between'>
                    <View className='product_title at-col--wrap'>{order.product.title}</View>
                    <View className='text-mute text-small text-right color-main'>￥{order.product.price}</View>
                  </View>
                </View>
              </View>
              <View className='text-mute text-small'>
                {trade.createDate}
              </View>
              <View className='at-row at-row__justify--end mt-2'>
                <View className='at-col at-col--auto text-right'>
                  {
                    trade.availableOperations.map(btn=>{
                      return (
                        <AtButton className='trade_btn' size='small' circle >{btn.label}</AtButton>
                      );
                    })
                  }
                </View>
              </View>
            </View>;
          })
        }

      </View>
    )
  }
}
