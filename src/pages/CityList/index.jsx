import React, { Component } from 'react'
// 导入axios
import axios from 'axios'
// 导入NavBar组件
import {NavBar} from 'antd-mobile-v2'
import './index.scss'
// 导入utils中获取当前定位城市的方法
import { getCurrentCity } from '../../utils'

// 数据格式化的方法
// list:[{},{}]
const formatCityData=list=>{
  const cityList={}
  // const cityIndex=[]
  // 1. 遍历list数组
  list.forEach(item=>{
    // 2. 获取每一个城市的首字母
    const first=item.short.substr(0,1)
    // console.log(first);
    // 3. 判断cityList中是否有该分类
    if (cityList[first]) {
      // 4. 有则，直接往分类里push数据
        // cityList[first]是啥意思？是[{},{},...,{}]
      cityList[first].push(item)
    }else{
      // 5. 没有则，先创建一个数组，再把当前城市信息添加到数组中
      cityList[first]=[item]
    }
  })
  
  // 获取索引数据
  const cityIndex=Object.keys(cityList).sort()

  return {
    cityList,
    cityIndex
  }
}

export default class CityList extends Component {
  componentDidMount(){
    this.getCityList()
  }

  // 获取城市列表数据的方法
  async getCityList(){
    const res=await axios.get('http://localhost:8080/area/city?level=1')
    // console.log('城市列表数据',res);
    // 获取所有城市的数据
    const {cityList,cityIndex}=formatCityData(res.data.body)
    // console.log(cityList,cityIndex);

    // 获取热门城市数据
    const hotRes=await axios.get('http://localhost:8080/area/hot')
    // console.log('热门城市数据：',hotRes);
    // 将热门城市数据作为一个键/分类，添加到cityList中
    cityList['hot']=hotRes.data.body
    // console.log(cityList,cityIndex);
    // 将索引添加到cityIndex中
    cityIndex.unshift('hot')
    // console.log(cityList,cityIndex);

    // console.log(111);
    // 获取当前定位城市
    const citySearch=await getCurrentCity()
    // console.log(citySearch,cityList,cityIndex);
    // console.log(222);
    cityList['#']=[citySearch]
    cityIndex.unshift('#')
    console.log(citySearch,cityList,cityIndex);
    // console.log(333);
  }
  render() {
    return (
      <div className="citylist">
        {/* 顶部导航栏 */}
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          城市选择
        </NavBar>
      </div>
    )
  }
}
