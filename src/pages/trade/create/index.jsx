import React, { Component } from 'react'
import {View, Image } from '@tarojs/components'
import Taro  from '@tarojs/taro'
import {AtButton, AtInputNumber,AtInput} from "taro-ui";

import {connect} from "react-redux";
import './index.scss'
import {LOGIN} from "../../../constants/auth";
import Api from "../../../apiClient/apiClient";
import StoreItem from "../../compoment/storeItem";

@connect(({ loginUpdater }) => ({
  loginUpdater
}), (dispatch) => ({
  login () {
    dispatch({type:LOGIN})
  },
}))
class Index extends Component {

  constructor () {
    super(...arguments);
    this.state = {
      product: {},
      number: 1,
      name: '',
      mobile: ''
    }
  }

  componentDidMount() {
    this.setState({
      product: Taro.getStorageSync('create_order')
    })
  }

  handleCreate() {
    if (!this.state.mobile)
    {
      Taro.showToast({
        title: "请输入手机号码",
        icon: "none"
      })
    }

    const postData = {
      productId: this.state.product.id,
      mobile: this.state.mobile,
      number: this.state.number
    };

    Taro.showLoading();
    Api.request("POST","/api/trades/create",postData).then((res)=>{
      //跳转到
      console.log(res);
      Taro.hideLoading();
      if (res.wxOrder) {
        const tid = res.trade.tid;
        Taro.requestPayment(res.wxOrder).then(()=>{
          Taro.showToast({title: "支付成功！",duration:2});
        }).catch((ee)=>{
          console.log('支付失败', ee);
        }).finally(()=>{
          Taro.navigateTo({
            url: "/pages/trade/detail?tid=" + tid
          })
        })
      }

    })
  }

  handleChangeNumber(e) {
    this.setState({
      number: e
    });
    return e;
  }

  setMobile(e) {
    this.setState({
      mobile: e
    });
  }

  render () {

    const {product,number} = {...this.state};

    return (<View className='page'>
      <View style={{paddingTop:Taro.pxTransform(40)}}>
        <View className='product_block'>
          {
            product ?  <View className='at-row'>
              <View className='at-col--auto product_image_block'>
                <Image mode='aspectFill' className='product_image' src={product.headImage} />
              </View>
              <View className='at-col'>
                <View className='at-row at-row__direction--column at-row__justify--between'>
                  <View className='product_title at-col--wrap'>{product.title}</View>
                  <View className='text-mute text-small text-right color-main'>￥{product.price}</View>
                </View>
              </View>
            </View> : null
          }
        </View>
      </View>

      <View className='mt-3 num_block'>
        <View className='at-row'>
          <View className='at-col text-mute'>数量</View>
          <View className='at-col text-right text-mute'>
            <AtInputNumber
              min={1}
              max={10}
              step={1}
              value={number}
              onChange={this.handleChangeNumber.bind(this)}
            />
          </View>
        </View>
      </View>

      <View className='border-main block_title mt-4'>适用门店</View>
      {
        product.stores && product.stores.map(store=>{
          return <StoreItem store={store} />
        })
      }

      <View className='mt-3 num_block'>
        <AtInput clear type='number' className='text-mute' maxLength='11' value={this.state.mobile} onChange={this.setMobile.bind(this)} placeholder='请输入手机号码' >
          <AtButton size='small' circle className='btn_get_mobile' openType='getPhoneNumber' >获取手机号码</AtButton>
        </AtInput>
      </View>
      <View className='tab_bar'>
        <AtButton type='primary' onClick={this.handleCreate.bind(this)}>立即支付</AtButton>
      </View>
    </View>);
  }
}

export default Index

