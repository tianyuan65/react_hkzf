import React from 'react'
// import {Button} from 'antd-mobile-v2'
import {Routes,Route,Navigate} from 'react-router-dom'
// 导入首页和选择城市界面
import Home from './pages/Home'
import Index from './pages/Index'
import CityList from './pages/CityList'
import News from './pages/News'
import Profile from './pages/Profile'
// import routes from './routes'

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* 配置路由 */}
        <Route path="/home" element={<Home />}>
          <Route path="index" element = {<Index/>}/>
          <Route path="news" element = {<News/>}/>
        </Route>
        <Route path="/list" element={<CityList/>}/>
        <Route path="/profile" element={<Profile/>}/>
        {/* 默认路由匹配时，跳转到/home，实现路由重定向到首页 */}
        <Route path='/' element={<Navigate to="/home"/>}/>
      </Routes>

      
    </div>
  );
}


