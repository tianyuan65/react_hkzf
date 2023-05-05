## 一、项目准备
* 1.1 
* 1.2 项目搭建
    *  初始化项目
        * 1. 初始化项目：npx create-react-app hkzf-mobile
        * 2. 启动项目，在项目根目录执行命令:npm start
            * ```
                public/  公共资源
                    index.html 首页(必须有)
                    manifest.json PWA应用的元数据
                src/  项目源码，项目的功能代码
                    index.js  项目入口文件(必须有)
                    App.js  项目的根组件
                    App.test.js  App组件的测试文件
              ```
        * 3. 调整项目中src目录结构：
            * ```
                src/  项目源码，写项目功能代码
                    assets/   资源(图片、字体图标等)
                    compoennts/  公共组件
                    pages/  页面
                    utils/  工具
                    App.js  根组件(也就是常说的父组件，用来配置路由信息)
                    index.css  全局样式
                    index.js  项目入口文件(渲染根组件、导入组件库等)
              ```
* 1.3 组件库 antd-mobile
    * 介绍与使用
        * 一个基于Preact/React/React Native的UI组件库
            * https://ant.design/index-cn
        * 1. antd-mobile介绍：是Ant Design的移动规范的React实现，服务于蚂蚁及口碑无线业务
        * 2. 安装：npm i antd-mobile
        * 3. 在App.js父组件中导入要使用的组件
            * ```import {Button} from 'antd-mobile'```
        * 4. 渲染组件
            * ```<Button />```
        * 5. 在index.js中导入组件库样式
            * ```import 'antd-mobile/dist/antd-mobile.css```
* 1.4 配置基础路由
    * 步骤
        * 1. 安装：npm i react-router-dom
        * 2. 导入路由组件：Router/Route/Link
        * 3. 在pages文件夹中创建Home/index.jsx 和 CityList/index.jsx两个组件
        * 4. 使用Route组件配置首页和城市选择界面
* 1.5 外观和样式调整
    * 步骤
        * 1. 修改页面标题：在index.html中修改
        * 2. 基础样式调整：在index.css中修改

## 二、项目整体布局
* 2.1 两种布局页面
    * 1. 有TabBar的页面：首页、找房、咨询、我的
    * 2. 无TabBar的页面：城市选择等(简单，不需要额外处理)
    * 3. TabBar的菜单可以实现路由切换，也就是在路由内部切换路由(嵌套路由/多级路由)
* 2.2 嵌套路由
    * 步骤
        * 1. 在pages文件夹中创建News组件
        * 2. 在Home组件中，添加一个Route作为子路由的出口
        * 3. 设置嵌套路由的path，格式以父路由的path开头
* 2.3 实现TabBar
    * 2.3.1 基本使用
        * 1. 打开antd-mobile组件库中TabBar组件的文档(写的例子是https://antd-mobile-v2.surge.sh/components/tab-bar-cn/#components-tab-bar-demo-top-tabbar，最新的去官网换版本)
        * 2. 选择App型选项卡菜单，点击(</>)显示源码
        * 3. 拷贝核心代码到Home组件中
        * 4. 分析并调整代码，让其能够在项目中正常运行
    * 2.3.2修改TabBar外观样式
        * 1. 删除前面路由的演示代码。
        * 2. 修改TabBar菜单文字标题。修改每一个TabBar-Item的title属性的值
        * 3. 修改TabBar菜单文字标题颜色(选中与未选中)。选中就是TabBar标签里的tintColor属性的值，未选中就是unselectedTintColor默认值就可以了
        * 4. 使用字体图标，修改TabBar菜单的图标。设置每一个TabBar-Item的icon和selectedIcon的图标为同一个图标
        * 5. 修改TabBar菜单项的图标大小。在Home文件夹下创建样式文件，在样式文件中定义字体大小，提高权重
        * 6. 调整TabBar菜单的位置，让其固定在最底部。和固定TabBar图标在页面底部，提高权重。
    * 2.3.3 TabBar配合路由使用
        * 1. 根据TabBar组件文档，设置不渲染部分内容(只保留菜单项，不显示内容)。
        * 2. 给TabBar.Item绑定点击事件，来实现路由的切换。
        * 3. 在点击事件中调用history.push()实现路由切换。
        * 4. 创建TabBar组件菜单项对用的其他3个组件，并在Home组件中配置路由信息。
        * 5. 给菜单项添加selected属性，设置当前匹配的菜单项高亮
    * 2.3.4 TabBar.Item代码重构
        * 1. 提供菜单数据(包含菜单项的特有信息，title、icon、path)。
        * 2. 使用map方法，遍历数据，渲染TabBar.Item。

## 三、首页模块
* 3.1 首页路由处理
    * 1. 修改首页路由规则为：/home(去掉/index)，并添加精准匹配的属性exact
    * 2. 配合默认路由，实现默认跳转到/home。就是重定向(router5用Redirect，router6用Navigate)
    * 3. render属性，是一个函数props，用于指定要渲染的内容。我在App里直接用了Navigate标签来重定向了
* 3.2 轮播图
    * 3.2.1 基本使用
        * 1. 打开antd-mobile组件库的Carousel组件。
        * 2. 选择基本，点击(</>)并显示源码。
        * 3. 拷贝核心代码到index组件中。
        * 4. 分析并调整代码，让其能够在项目中正常运行。
    * 3.2.2 获取轮播图数据
        * 1. 安装axios：npm i axios
        * 2. 在Index组件中导入axios
        * 3. 在state中添加轮播图数据：swipers
        * 4. 新建一个方法getSwipers，来获取轮播图数据，并更新swipers状态
        * 5. 在componentDidMount钩子中调用该方法
        * 6. 使用获取到的数据渲染轮播图
        * **轮播图存在的两个问题：** 在Index组件发生
            * 1. 不会自动播放
            * 2. 从其他路由返回的时候，高度不够
            * 原因：轮播图数据是动态加载的，加载完成前后轮播图数量不一致
            * 解决方法：
                * 1. 在state中添加表示轮播图加载完成的数据
                * 2. 在轮播图数据加载完成时，修改该数据状态值为true
                * 3. 只有在轮播图数据加载完成的情况下，才渲染轮播图组件
    * 3.2.3 导航菜单
        * 1. 打开Flex布局组件。
        * 2. 使用Flex布局，创建导航菜单结构。
            * **问题：点击首页导航菜单，导航到找房列表页面时，找房菜单没有高亮** 在Index组件中写，但在Home组件中写componentDidUpdate钩子
            * 原因：原来我们实现该功能的时候，只考虑了点击以及第一次加载Home组件的情况。但是，没有考虑不重新加载Home组件时的路由切换，因为这种情况下，目前写的代码没有覆盖到
            * 解决方法：
            *  思路：在路由切换时，也执行菜单高亮的逻辑代码
            *  1. 添加componentDidUpdate钩子
            *  2. 在钩子函数中判断路由地址是否切换(因为路由的信息是通过props传递给组件的，所以，通过比较更新前后的两个props)
            *  3. 在路由地址切换时，让菜单(TabBar.Item)高亮