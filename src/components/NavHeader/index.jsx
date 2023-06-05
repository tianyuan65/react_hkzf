import React from 'react'
import {NavBar} from 'antd-mobile-v2'
// 导入withRouter高阶函数
import {withRouter} from 'react-router-dom'
// 导入props校验的包
import PropTypes from 'prop-types'
import './index.scss'
import styles from './index.module.css'

// 从props中解构出history对象
function NavHeader({children,history,onLeftClick}) {
    // 默认点击行为
    const defaultHandler=() => history.go(-1)
    return (
        <div>
            {/* 顶部导航栏 */}
            <NavBar
                className={styles.navBar}
                mode="light"
                icon={<i className="iconfont icon-back" />}
                // 调用hostory.go()实现返回上一页的功能
                // 从props中解构出onLeftClick函数，实现自定义 < 按钮的点击事件
                onLeftClick={onLeftClick || defaultHandler}
            >
                {children}
            </NavBar>
        </div>
    )
}

// 给组件添加props校验
NavHeader.propTypes={
    children:PropTypes.string.isRequired,
    onLeftClick:PropTypes.func
}

// withRouter(NavHeader) 函数的返回值也是一个组件
export default withRouter(NavHeader)