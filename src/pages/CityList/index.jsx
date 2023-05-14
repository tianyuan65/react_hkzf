import React, { Component } from 'react'
// 导入axios
import axios from 'axios'
// 导入NavBar组件
import {NavBar,Toast} from 'antd-mobile-v2'
import './index.scss'
// 导入utils中获取当前定位城市的方法
import { getCurrentCity } from '../../utils'
// 导入List组件
import {List,AutoSizer} from 'react-virtualized'

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

// 列表数据的数据源
// const list = Array(111).fill('react-virtualized')

// function rowRenderer({
//   key, // Unique key within array of rows
//   index, // 索引号
//   isScrolling, // 当前项是否正在滚动中
//   isVisible, // 当前项在List中是可见的
//   style, // 重点属性，一定要给每一个数据添加该样式，作用：指定每一行的位置
// }) {
//   // 函数内的返回值就是渲染在页面中的内容
//   return (
//     <div key={key} style={style}>
//       1-{list[index]} {index} {isScrolling}
//     </div>
//   );
// }

// 索引(A、B等)的高度
const TITLE_HEIGHT=36
// 每个城市名称的高度
const NAME_HEIGHT=50
// 封装处理字母索引的方法
const formatCityIndex=(letter)=>{
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

// 有房源的城市
const HOUSE_CITY=['北京','上海','广州','深圳']

export default class CityList extends Component {
  constructor(props){
    super(props)

    this.state={
      cityList:{},
      cityIndex:[],
      // 初始化当前高亮的索引号
      activeIndex:0
    }

    // 创建ref对象
    this.cityListComponent=React.createRef()
  }
 
  async componentDidMount(){
    await this.getCityList()
    // 调用measureAllRows方法，提前计算List中每一行的高度，实现scrollToRow的精准跳转
    // 注意：调用该方法的时候，需要保证List组件中已经有数据了。如果List组件中的数据为空，就会导致调用方法报错
    // 解决：只要保证这个方法是在获取到数据之后调用的即可，所以给获取城市数据的方法添加await，等待this.getCityList这个异步操作执行完成，再调用measureAllRows方法
    this.cityListComponent.current.measureAllRows()
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

    this.setState({
      cityList,
      cityIndex
    })
  }

  // 点击跳转到home并显示点击的城市
  changeCity({label,value}){
    if (HOUSE_CITY.indexOf(label)>-1) {
      // 有房源信息，则保存当前城市数据到本地缓存中，并返回上一页
      localStorage.setItem(`hkzf_city`,JSON.stringify({label,value}))
      this.props.history.go(-1)
    }else{
      // 没有房源信息，则提示用户：该城市暂无房源数据，不执行任何操作
      Toast.info('该城市暂无房源数据',1,null,false);
    }
  }

  // List组件渲染每一行数据的函数
  rowRenderer=({
    key, // Unique key within array of rows
    index, // 索引号
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在List中是可见的
    style, // 重点属性，一定要给每一个数据添加该样式，作用：指定每一行的位置
  }) => {
    // 获取每一行的字母索引
    const {cityIndex,cityList}=this.state
    const letter=cityIndex[index]
    // console.log(letter);
    // 获取指定字母索引下的城市列表
    // console.log(cityList[letter]);
    // 函数内的返回值就是渲染在页面中的内容
    return (
      // 修改rowRenderer方法中渲染的每行的结构和样式
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {
          cityList[letter].map(item=>(
          <div className="name" key={item.value} onClick={()=>this.changeCity(item)}>
            {item.label}
          </div>))
        }
      </div>
    );
  }

  // 创建动态计算每一行高度的函数
  getRowHeight=({index})=>{
    // console.log(index);
    // 索引标题高度 + 城市数量 * 城市名称的高度
    // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    // console.log(this);
    const {cityList,cityIndex}=this.state
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    // return 100
  }

  // 封装渲染右侧索引列表的函数
  renderCityIndex(){
    const {activeIndex,cityIndex}=this.state
    // 获取cityIndex，对其进行遍历，并返回得到的结果，实现渲染
    return cityIndex.map((item,index)=>
      <li className="city-index-item" key={item} onClick={()=>{
        // console.log('当前索引号：',index);
        this.cityListComponent.current.scrollToRow(index)
      }}>
        <span className={activeIndex===index ? "index-active" : ''}>
          {item==='hot'?'热':item.toUpperCase()}
        </span>
      </li>)
  }

  // 用于获取list组件中渲染行的信息
  onRowsRendered=({startIndex})=>{
    // console.log('startIndex',startIndex);
    // 判断activeIndex值是否与startIndex值相同，不同则进入判断进行更新
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex:startIndex
      })
    }
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

        {/* 城市列表 */}
        <AutoSizer>
          {({width,height}) => (
            <List
              ref={this.cityListComponent}
              width={width}
              height={height}
              // 列表一共多少行，原先是list.length，现在改成this.state.cityIndex.length
              rowCount={this.state.cityIndex.length}
              // 每一行的高度
              rowHeight={this.getRowHeight}
              // 渲染页面的函数
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        {/* 右侧索引列表 */}
        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
      </div>
    )
  }
}
