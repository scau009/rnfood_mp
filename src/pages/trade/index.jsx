import React, { Component } from 'react'
import { View,Image,Button } from '@tarojs/components'
import {connect} from "react-redux";
import { AtTabs, AtTabsPane, AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import Taro from '@tarojs/taro'
import logo from "../../asset/image/logo-rnfood.png";

import './index.scss'
import Api from "../../apiClient/apiClient";
import {LOGIN} from "../../constants/auth";
import LoginPage from "../compoment/login";

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
      current: 0,
      tabList: [{title: '全部'}, {title: '待支付'}, {title: '已完成'}],
      allTradeList: []
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentWillMount() {
    Api.request("GET","/api/trades/list",{}).then((res)=>{
      this.setState({
        allTradeList: res
      })
    })
  }

  render () {
    const {tabList,allTradeList} = {...this.state};
    return (<View>
      {this.props.loginUpdater.isLogin ? <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View className='bg-default list_page' >
            {
              allTradeList.map((trade)=>{
                return <View className='trade_item'>
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
                              <AtButton className='trade_btn' size='small' circle >支付</AtButton>
                            </View>
                          </View>
                        </View>;
                      })
                    }

                </View>;
              })
            }

          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View className='bg-default'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View className='bg-default'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs> : <LoginPage />}
    </View>);
  }
}

export default Index

