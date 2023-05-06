import React, { Component } from 'react'
// 导入关于轮播图的组件
import { Carousel,Flex,Grid  } from 'antd-mobile-v2';
// 导入axios
import axios from 'axios'
// 导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import './index.scss'

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

export default class Index extends Component {
  state = {
    // 初始化轮播图状态数据
    swipers:[],
    // 添加一个状态，表示轮播图数据是否加载完成，等数据加载完成时，把状态值改为true(```isSwiperLoaded:true```)
    isSwiperLoaded:false,
    // 租房小组数据
    groups:[]
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
    const res=await axios.get('http://localhost:8080/home/groups',{
      params:{
        // 暂时用服务器提供的，后续城市位置变化时再把对应城市的地址当做URL参数传递进去即可
        area:'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    console.log(res);
    // 在setState方法中修改并更新所在城市的数据
    this.setState({
      groups:res.data.body
    })
  }

  componentDidMount() {
    // 调用获取轮播图数据的函数，使之能正常渲染轮播图
    this.getSwipers()
    this.getGroups()
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
                </Carousel>):('')  //若没有加载完成，就渲染空的内容
            }
        </div>
        
        {/* 导航菜单 */}
        <Flex className="nav">{this.renderNavs()}</Flex>

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
        </div>
        
      </div>
    );
  }
}
