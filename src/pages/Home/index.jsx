import React,{Component} from 'react'
import { TabBar } from 'antd-mobile-v2'
import {Switch,Route} from 'react-router-dom'
// import { DemoBlock } from 'demos'
import Index from '../Index'
import CityList from '../CityList'
import News from '../News'
import Profile from '../Profile'
import '../../assets/fonts/iconfont.css'
import './index.css'

const tabs=[
  {
    key:'index',
    title: '首页',
    path: '/home/index',
    icon: 'icon-ind',
  },
  {
    key:'list',
    title: '资讯',
    path: '/home/list',
    icon: 'icon-findHouse',
  },
  {
    key:'news',
    title: '消息',
    path: '/home/news',
    icon: 'icon-infom',
  },
  {
    key:'profile',
    title: '我的',
    path: '/home/profile',
    icon: 'icon-my',
  },
]

/*
 * 问题：点击首页导航菜单，导航到找房列表页面时，找房菜单没有高亮
 * 原因：原来我们实现该功能的时候，只考虑了点击以及第一次加载Home组件的情况。但是，没有考虑不重新加载Home组件时的路由切换，因为这种情况下，目前写的代码没有覆盖到
 * 解决方法：
 *  思路：在路由切换时，也执行菜单高亮的逻辑代码
 *  1. 添加componentDiiUpdate钩子
 *  2. 在钩子函数中判断路由地址是否切换(因为路由的信息是通过props传递给组件的，所以，通过比较更新前后的两个props)
 *  3. 在路由地址切换时，让菜单高亮
 */
export default class Home extends Component{
  state = {
      // 默认选中的TabBar菜单项
      selectedTab:this.props.location.pathname
  }

  componentDidUpdate(prevProps){
    console.log('上一次的路由信息');
    console.log(this.props.location);
    if(prevProps.location.pathname !== this.props.location.pathname){
      // 判断成立就说明路由发生切换了
      this.setState({selectedTab:this.props.location.pathname})
    }
  }

  // 渲染TabBar.Item
  renderTabBarItem(){
    return tabs.map(item=>(
        <TabBar.Item
          key={item.key}
          title={item.title}
          path={item.path}
          icon={<i className={`iconfont ${item.icon}`} />}
          onPress={()=>{
            this.setState({
              selectedTab:item.path
            })
          }}
        >
        </TabBar.Item>
    ))
  }

  render(){
    console.log(this.props);
    return (
      <div className='home'>
          <TabBar>
            {this.renderTabBarItem()}
          </TabBar>
        
        <Switch>
          <Route exact path='/home' component={Index}/>
          <Route path='/home/list' component={CityList}/>
          <Route path='/home/news' component={News}/>
          <Route path='/home/profile' component={Profile}/>
        </Switch>
      </div>
    )
  }
}
