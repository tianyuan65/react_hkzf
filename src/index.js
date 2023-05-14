import React from 'react';
import ReactDOM from 'react-dom';
// 导入路由组件
import {BrowserRouter} from 'react-router-dom'
import App from './App';
// import 'antd/dist/reset.css'
import 'antd-mobile'
// 注意：自定义写的全局样式要放在导入的组件库后面导入，样式才会生效
import './index.css';
// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'
// 导入react-virtualized组件的样式
import 'react-virtualized/styles.css'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
document.getElementById('root'));


