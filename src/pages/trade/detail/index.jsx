import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {AtButton} from "taro-ui";

import './index.scss'
import Api from "../../../apiClient/apiClient";
import StoreItem from "../../compoment/storeItem";
import CouponItem from "../../compoment/couponItem";

class Index extends Component {

  constructor () {
    super(...arguments);
    this.state = {
      trade:{}
    }
  }

  componentWillMount() {
    const params = getCurrentInstance().router.params;
    console.log("params", params);
    if (params.tid) {
      this.getTradeInfo(params.tid);
    }
  }

  getTradeInfo(tid) {
    Api.request("GET","/api/trades/detail",{tid:tid}).then((res)=>{
      this.setState({
        trade: res
      })
    }).catch((err)=>{
      Taro.showToast({title:err.message})
    });
  }

  handlePay() {
    Api.request("POST","/api/trades/pay",{tid:this.state.trade.tid}).then(res=>{
      Taro.showLoading();
      Taro.requestPayment(res.wxOrder).then((rr)=>{
        console.log('支付成功', rr);
        this.getTradeInfo(this.state.trade.tid);
        Taro.hideLoading();
      }).catch((ee)=>{
        console.log('支付失败', ee);
        Taro.hideLoading();
      })
    })
  }

  render () {
    const trade = this.state.trade;
    return <View className='page'>
      <View style={{paddingBottom: '100px'}}>
        <View style={{paddingTop: Taro.pxTransform(40)}}>
          <View className='border-main block_title'>商品信息</View>
          {
            trade.orders && trade.orders.map(order => {
              return <View className='mt-4'>
                <View className='product_block'>
                  <View className='at-row'>
                    <View className='at-col--auto product_image_block'>
                      <Image mode='aspectFill' className='product_image' src={order.product.headImage}/>
                    </View>
                    <View className='at-col'>
                      <View className='at-row at-row__direction--column at-row__justify--between'>
                        <View className='product_title at-col--wrap'>{order.product.title}</View>
                        <View className='text-mute text-small text-right color-main'>￥{order.product.price}</View>
                      </View>
                    </View>
                  </View>
                  <View className='at-row'>
                    <View className='at-col text-mute'>数量：{order.num}</View>
                  </View>
                </View>

                <View className='border-main block_title mt-4'>适用门店</View>
                {
                  order.product.stores && order.product.stores.map((store) => {
                    return <StoreItem store={store} />
                  })
                }

                {
                  order.coupons && order.coupons.length > 0 ? <CouponItem coupons={order.coupons} /> : null
                }

              </View>;
            })
          }
        </View>

        <View className='border-main block_title mt-4'>订单信息</View>

        {trade.tid ? <View className='product_block mt-4 text-mute text-small'>
          <View>订单号：{trade.tid}</View>
          <View className='mt-1'>手机号码：{trade.buyer.mobile}</View>
          <View className='mt-1'>订单金额：{trade.payment.price}</View>
          <View className='mt-1'>创建时间：{trade.createDate}</View>
          <View className='mt-1'>状态：{trade.statusLabel}</View>
        </View> : null
        }
      </View>

      {
        trade.status === "wait_pay" ? <View className='tab_bar'>
          <AtButton type='primary' onClick={this.handlePay.bind(this)}>
            立即支付
          </AtButton>
        </View> : null
      }

    </View>;
  }
}

export default Index

