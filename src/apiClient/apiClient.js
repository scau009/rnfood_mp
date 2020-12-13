import Taro from '@tarojs/taro'
import config from '../config.js';

const Api = {
  request(method,url,data){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const dispatch = useDispatch();

    return new Promise(async (resolve,reject)=>{
      Taro.request({
        method: method,
        url: config.apiBaseUrl+url,
        data: data,
        header: {
          'Authorization': 'Bearer ' + Taro.getStorageSync('jwt')
        },
        complete: (res)=>{
          console.log('request callback',res);
          if (res.data.token) {
            Taro.setStorageSync('jwt', res.data.token);
            //更新登录状态
            // const dispatch = useDispatch();
            // dispatch({
            //   type:LOGIN
            // });
          }
        },
        fail: (err)=>{
          reject(err.data);
        },
        success:(res)=>{
          resolve(res.data);
        }
      });
    })
  }
}


export default Api;
