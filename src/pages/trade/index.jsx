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
import TradeItem from "../compoment/trade";

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
      tabList: [{title: '全部'}, {title: '待支付'}, {title: '已支付'},{title:'已完成'},{title:'已取消'}],

      allTradeList: [],
      page_all: 1,
      end_all: false,

      waitPayTradeList: [],
      page_wait_pay: 1,
      end_wait_pay: false,

      paidTradeList: [],
      page_paid: 1,
      end_paid: false,

      finishedTradeList: [],
      page_finished: 1,
      end_finished: false,

      canceledTradeList: [],
      page_cancel: 1,
      end_cancel: false,
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentWillMount() {
    this.getList(this.state.current)
  }

  onReachBottom() {
    this.getList(this.state.current)
  }

  getStatusAndPage() {
    let status = '';
    let page = this.state.page_all;
    let end = false;
    switch (this.state.current) {
      case 0:
        status = '';
        page = this.state.page_all;
        end = this.state.end_all;
        break;
      case 1:
        status = 'wait_pay';
        page = this.state.page_wait_pay;
        end = this.state.end_wait_pay;

        break;
      case 2:
        status = 'paid';
        page = this.state.page_paid;
        end = this.state.end_paid;

        break;
      case 3:
        status = 'finished';
        page = this.state.page_finished;
        end = this.state.end_finished;

        break;
      case 4:
        status = 'canceled';
        page = this.state.page_cancel;
        end = this.state.end_cancel;

        break;
      default:
        status = '';
    }
    return {status:status,page:page,end:end};
  }

  getList(index) {
    const {status, page, end} = {...this.getStatusAndPage()};
    if (end) {
      return;
    }
    console.log("getList");
    Api.request("GET", "/api/trades/list", {page: page, status: status}).then((res) => {
      switch (index) {
        case 0:
          this.setState({
            allTradeList: this.state.allTradeList.concat(res.list),
            page_all: res.paginate.hasNext ? res.paginate.page + 1 : res.paginate.page,
            end_all: !res.paginate.hasNext
          });
          break;
        case 1:
          this.setState({
            waitPayTradeList: this.state.waitPayTradeList.concat(res.list),
            page_wait_pay: res.paginate.hasNext ? res.paginate.page + 1 : res.paginate.page,
            end_wait_pay: !res.paginate.hasNext
          });
          break;
        case 2:
          this.setState({
            paidTradeList: this.state.paidTradeList.concat(res.list),
            page_paid: res.paginate.hasNext ? res.paginate.page + 1 : res.paginate.page,
            end_paid: !res.paginate.hasNext
          });
          break;
        case 3:
          this.setState({
            finishedTradeList: this.state.finishedTradeList.concat(res.list),
            page_finished: res.paginate.hasNext ? res.paginate.page + 1 : res.paginate.page,
            end_finished: !res.paginate.hasNext
          });
          break;
        case 4:
          this.setState({
            canceledTradeList: this.state.canceledTradeList.concat(res.list),
            page_cancel: res.paginate.hasNext ? res.paginate.page + 1 : res.paginate.page,
            end_cancel: !res.paginate.hasNext
          });
          break;
        default:

      }

    });
  }

  render () {
    const {tabList,allTradeList} = {...this.state};
    console.log('allTradeList',allTradeList);
    return (<View>
      {this.props.loginUpdater.isLogin ? <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View className='bg-default list_page' >
            {
              allTradeList.length>0 && allTradeList.map((trade)=>{
                return <TradeItem trade={trade} />;
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

