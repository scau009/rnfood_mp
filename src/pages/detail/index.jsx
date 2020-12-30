import React, { Component } from 'react'
import { View,Image,Swiper, SwiperItem,Text,RichText } from '@tarojs/components'
import { AtTag,AtIcon,AtButton } from 'taro-ui'
import Taro ,{ getCurrentInstance } from '@tarojs/taro'
import {connect} from "react-redux";
import './index.scss'
import Api from "../../apiClient/apiClient";
import {LOGIN} from "../../constants/auth";
import LoginBtn from "../compoment/login/loginBtn";

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
      isOpen:false,
      product: {
        soldCount: 0,
        quantity: 0,
        banners: [],
        tags: [],
        price: '',
        stores: [],
      }
    }
  }

  componentWillMount() {
    // console.log(getCurrentInstance().router.params);
    const id = getCurrentInstance().router.params.id;
    // const id = getCurrentInstance().router.params;
    // console.error(getCurrentInstance.router.params);
    Api.request('GET','/api/product/detail',{id: id}).then((res)=>{
      this.setState({
        product: {...res}
      })
    })
  }

  handleBuy() {
    console.log('handleBuy',this.props);
    Taro.setStorageSync('create_order', this.state.product);
    Taro.navigateTo({
      url: '/pages/trade/create/index'
    })
  }

  goToLogin() {
    Taro.switchTab({
      url: '/pages/user/index',
    })
  }

  handleGoHome() {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }

  render () {
    const {product} = {...this.state};

    console.error('product',product);
    return (<View className='detail_page'>
      <Swiper
        className='banner_block'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay>
        <SwiperItem className='banner_item_block'>
          <Image className='head_image' mode='aspectFill' src={product.headImage} />
        </SwiperItem>
        {
          product.banners && product.banners.map((banner) => {
            return (<SwiperItem className='banner_item_block'>
              <Image className='head_image' mode='aspectFill' src={banner} />
            </SwiperItem>);
          })
        }
      </Swiper>
      <View style={{paddingBottom:'100px'}}>
        <View className='content_block'>
          <View className='title'>{product.title}</View>
          <View className='mt-2 at-row text-mute text-small at-row__align-content--between'>
            <View className='at-col'>已售{product.soldCount}件</View>
            <View className='at-col text-right'>只剩{product.quantity - product.soldCount}件</View>
          </View>
          {
            product.tags ? <View className='mt-2'>
              {
                product.tags.map(tag => {
                  return (<AtTag size='small' className='mr-2'>{tag}</AtTag>)
                })
              }
            </View> : <View>
              <AtTag size='small' className='mr-2' type='primary' active>新品</AtTag>
              <AtTag size='small' className='mr-2' type='primary' active>通用</AtTag>
            </View>
          }
        </View>
        <View>
          <View className='border-main block_title mt-4'>适用门店</View>
          {
            product.stores.map(store=>{
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
              );
            })
          }

          <View className='border-main block_title mt-4'>购买须知</View>
          <View className='content_block mt-3'>
            <RichText nodes={product.notice} />
          </View>
        </View>

        <View className='border-main block_title mt-4'>商品详情</View>
        <View className='content_block mt-3'>
          <RichText style={{width:'100%',maxWidth:'100%'}} nodes={product.description} />
        </View>

        <View className='border-main block_title mt-4'>价格说明</View>
        <View className='content_block mt-3 text-small text-mute'>
          <View>划线价格</View>
          <View>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</View>
          <View>未划线价格</View>
          <View>商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算价格为准。</View>

        </View>


      </View>
      <View className='tab_bar'>
        <View className='at-row  at-row__align--center'>
          <View className='at-col at-col-2 tab_bar_item ' onClick={this.handleGoHome.bind(this)}>
            <AtIcon value='home' size='22' color='#ec5d11' />
            <View className='text-small text-mute'>首页</View>
          </View>
          <View className='at-col at-col-2 tab_bar_item'>
            <AtIcon value='share' size='22' color='#ec5d11' />
            <View className='text-small text-mute'>分享</View>
          </View>
          <View className='at-col at-col-2 tab_bar_item'>
            <AtIcon value='heart' size='22' color='#ec5d11' />
            <View className='text-small text-mute'>喜欢</View>
          </View>
          <View className='at-col at-col-6 '>
            {
              this.props.loginUpdater.isLogin ? <AtButton type='primary' className='mr-3' onClick={this.handleBuy.bind(this)}>
                <View><Text className='price'>￥{product.price}</Text> 立即抢购</View>
              </AtButton> : <LoginBtn btnText='登录抢购' />
            }
          </View>
        </View>
      </View>
    </View>);
  }
}

export default Index

