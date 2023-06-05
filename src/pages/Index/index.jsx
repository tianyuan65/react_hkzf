import React, { Component } from 'react'
// 导入关于轮播图的组件
import { Carousel,Flex,Grid,WingBlank  } from 'antd-mobile-v2';
// 导入axios
import axios from 'axios'
// 导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import './index.scss'
// import AMapLoader from '@amap/amap-jsapi-loader';
// 导入utils中获取定位城市的方法
import {getCurrentCity} from '../../utils'


// 导航菜单数据
const navs=[
    {
        id:1,
        img:Nav1,
        title:'整租',
        path:'/home/list'
    },
    {
        id:2,
        img:Nav2,
        title:'合租',
        path:'/home/list'
    },
    {
        id:3,
        img:Nav3,
        title:'地图找房',
        path:'/home/list'
    },
    {
        id:4,
        img:Nav4,
        title:'去出租',
        path:'/home/list'
    }
]

// 获取地理位置信息
// navigator.geolocation.getCurrentPosition(position=>{
//   console.log('当前位置信息：',position);
// })

export default class Index extends Component {
  state = {
    // 初始化轮播图状态数据
    swipers:[],
    // 添加一个状态，表示轮播图数据是否加载完成，等数据加载完成时，把状态值改为true(```isSwiperLoaded:true```)
    isSwiperLoaded:false,
    // 租房小组数据
    groups:[],
    // 最新资讯的数据
    news:[],
    // 当前城市名称
    cityName:'上海'
  }
  // 获取轮播图数据的方法
  async getSwipers(){
    const res=await axios.get('http://localhost:8080/home/swiper')
    this.setState({
        swipers:res.data.body,
        // 只有数据加载完成，状态值为true，才会渲染轮播图
        isSwiperLoaded:true
    })
  }

  // 获取租房小组数据的方法
  async getGroups(){
    const res=await axios.get('http://localhost:8080/home/group',{
      params:{
        // 暂时用服务器提供的，后续城市位置变化时再把对应城市的地址当做URL参数传递进去即可
        area:'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    // console.log(res);
    // 在setState方法中修改并更新所在城市的数据
    this.setState({
      groups:res.data.body
    })
  }
  async getNews(){
    const res=await axios.get('http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
    this.setState({
      news:res.data.body
    })
  }

  async componentDidMount() {
    // 调用获取轮播图数据的函数，使之能正常渲染轮播图
    this.getSwipers()
    this.getGroups()
    this.getNews()

    // 2. 通过IP定位获取到当前城市名称
    // AMapLoader.load({
    //   key: '9c4e4dc233ce9bb35c0ff360b6fa9c61', // 申请好的Web端开发者Key，首次调用 load 时必填
    //   version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    //   plugins: ['AMap.CitySearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    // })
    //   .then(AMap => {
    //       this.map = new AMap.Map('container', {
    //           // 设置地图容器id
    //           // viewMode: '3D', // 是否为3D地图模式
    //           zoom: 5, // 初始化地图级别
    //           center: [116.404, 39.915], // 初始化地图中心点位置
    //       });
          // 获取用户所在城市信息
            // 实例化城市查询类
            // const citySearch=new AMap.CitySearch()
            // // 自动获取用户IP，返回当前城市
            // // console.log(111);
            // citySearch.getLocalCity(async res=>{
            //   const result=await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
            //   console.log(result);
            //   this.setState({
            //     cityName:result.data.body.label
            //   })
            // })
            // console.log(222);
      // })
      // .catch(e => {
      //     console.log(e);
      // });
    const citySearch=await getCurrentCity()
    console.log(citySearch);
    this.setState({
      citySearchName:citySearch.label
    })
  }
  //渲染轮播图结构   
  renderSwipers(){
    return this.state.swipers.map(item => (
        <a
          key={item.id}
          href="http://itcast.cn"
          style={{ display: 'inline-block', width: '100%', height:212}}
        >
          <img
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
          />
        </a>
      ))
  }
  // 渲染导航菜单
  renderNavs(){
    return navs.map(item=><Flex.Item 
          key={item.id} 
          onClick={()=>this.props.history.push(item.path)}>
          <img src={item.img} alt=""/>
          <h2>{item.title}</h2>
        </Flex.Item>)
  }
  // 渲染最新资讯
  renderNews(){
    return this.state.news.map(item=>
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img" 
            src={`http://localhost:8080${item.imgSrc}`}
            alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.form}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    )
  }
  render() {
    return (
      <div className='index'>
        <div className="swiper">
            {
              // 判断isSwiperLoaded的值是否为true，状态值为true，才渲染轮播图
              this.state.isSwiperLoaded?(
                <Carousel
                    autoplay  // 轮播图是否自动播放 
                    infinite  // 是否循环播放
                    autoplayInterval={5000}  // 自动切换的时间间隔
                    >
                    {this.renderSwipers()}
                </Carousel>):(' ')  //若没有加载完成，就渲染空的内容
            }

            {/* 搜索框 */}
            <Flex className="search-box">
              {/* 左侧白色区域 */}
              <Flex className="search">
                {/* 位置 */}
                <div id="container"></div>
                <div className="location" onClick={()=>{this.props.history.push('/list')}}>
                  {/* 位置信息不可写死，需要根据地理位置相关的API，动态地获取当前所在的位置，并把当前所在的位置信息展示在标签中 */}
                  <span className="name">{this.state.cityName}</span>
                  <i className="iconfont icon-arrow"/>
                </div>
                {/* 搜索菜单 */}
                <div className='form' onClick={()=>{this.props.history.push('/search')}}>
                  <i className="iconfont icon-search"/>
                  <span className="text">请输入小区或地址</span>
                </div>
              </Flex>
              {/* 右侧地图图标 */}
              <i className="iconfont icon-map" onClick={()=>{this.props.history.push('/map')}}/>
            </Flex>
        </div>
        
        {/* 导航菜单 */}
        <Flex className="nav">{this.renderNavs()}</Flex>

        {/* 租房小组 */}
        <div className='group'>
          <h3 className='group-title'>
            租房小组 <span className='more'>更多</span>
          </h3>
          {/* 宫格组件 */}
          <Grid data={this.state.groups} columnNum={2} square={false} hasLine={false}
            renderItem={(item)=>{
              <Flex className='group-item' justify='around' key={item.id}>
                <div className='desc'>
                  <p className='title'>{item.title}</p>
                  <span className='info'>{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </Flex>
            }}/>

            {/* 最新资讯 */}
          <div className='news'>
            <h3 className='group-title'>最新资讯</h3>
            <WingBlank size="md">{this.renderNews()}</WingBlank>
          </div>
        </div>
        
      </div>
    );
  }
}
