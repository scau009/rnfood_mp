import React, { Component } from 'react'
import VirtualList from '@tarojs/components/virtual-list';
import { View} from '@tarojs/components'
import Taro from "@tarojs/taro";

import ProductItem from '../compoment/product/index';


import './index.scss'
import Api from "../../apiClient/apiClient";


class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      height: 1000
    };
  }


  componentWillMount() {
    const height = Taro.getSystemInfoSync().windowHeight;
    this.setState({
      height: height
    });
    Api.request('GET', '/api/product/list').then((res)=>{
      this.setState({
        productList:res
      })
    });
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }


  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  row = React.memo(({index, style, data}) => {
    return (
      <ProductItem product={data[index]} />
    );
  });

  render () {
    const {productList,height} = {...this.state};
    const productCount = productList.length;
    return (
      <VirtualList height={height} className='bg-default' width='100%' itemCount={productCount} itemData={productList} itemSize={300}>
        {this.row}
      </VirtualList>
    );
  }
}

export default Index

