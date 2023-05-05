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

export default class Home extends Component{
  state = {
      // 设置状态，表示默认选中的TabBar菜单项
      selectedTab:this.props.location.pathname
  }

  // 在此更新状态，但更新状态的操作必须放在一个逻辑判断中，判断路由地址是否发生了变化
    // 钩子中传递prevProps作为参数，来获取最近的前一个props数据，也就是上一个路由信息
  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname){
      // 判断成立就说明路由发生切换了，就更新状态，让当前切换到的路由地址对应的TabBar.Item高亮
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
          selectedIcon={<i className={`iconfont ${item.icon}`} />}
          selected={this.state.selectedTab === item.path}
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
