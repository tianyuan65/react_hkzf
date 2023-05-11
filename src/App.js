import React from 'react'
// import {Button} from 'antd-mobile-v2'
import {Switch,Route,Redirect} from 'react-router-dom'
// 导入首页和选择城市界面
import Home from './pages/Home'
// import Index from './pages/Index'
import CityList from './pages/CityList'
// import News from './pages/News'
import Profile from './pages/Profile'
// import routes from './routes'
import Map from './pages/Map'

export default function App() {
  return (
    <div className="App">
      <Switch>
        {/* 配置路由 */}
        <Route path="/home" component={Home }>
          {/* <Route path="index" component = {Index}/> */}
          {/* <Route path="news" component = {News}/> */}
        </Route>
        <Route path="/list" component={CityList}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/map" component={Map}/>
        {/* 默认路由匹配时，跳转到/home，实现路由重定向到首页 */}
        <Redirect to="/home" component={Home}/>
      </Switch>

    </div>
  );
}


