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
* 3.3 导航菜单
    * 1. 打开Flex布局组件。
    * 2. 使用Flex布局，创建导航菜单结构。
        * **问题：点击首页导航菜单，导航到找房列表页面时，找房菜单没有高亮** 在Index组件中写，但在Home组件中写componentDidUpdate钩子
        * 原因：原来我们实现该功能的时候，只考虑了点击以及第一次加载Home组件的情况。但是，没有考虑不重新加载Home组件时的路由切换，因为这种情况下，目前写的代码没有覆盖到
        * 解决方法：
        *  思路：在路由切换时，也执行菜单高亮的逻辑代码
        *  1. 添加componentDidUpdate钩子
        *  2. 在钩子函数中判断路由地址是否切换(因为路由的信息是通过props传递给组件的，所以，通过比较更新前后的两个props)
        *  3. 在路由地址切换时，让菜单(TabBar.Item)高亮
* 3.4 在脚手架中使用Sass
    * 1. 打开脚手架的文档，找到添加Sass样式
    * 2. 安装Sass：npm install sass
    * 3. 创建后缀名称为 .scss或 .sass的样式文件
    * 4. 在组件中导入Sass样式文件
* 3.5 租房小组
    * 3.5.1 业务介绍
        * 1. 需求：根据当前地理位置展示不同小组信息
        * 2. 需要后台接口很具用户找房数据，推荐用户最感兴趣的内容，核心业务在后端
    * 3.5.2 数据获取
        * 1. 在state中添加租房小组数据：groups
        * 2. 新建一个方法getGroups用来获取数据，并更新groups的状态
        * 3. 在componentDidMount钩子函数中调用该方法
        * 4. 使用获取到的数据渲染租房小组数据
    * 3.5.3 结构与样式
        * 1. 实现标题的结构与样式
        * 2. 打开Grid宫格组件文档
        * 3. 选择基本菜单，点击(</>)显示源码
        * 4. 拷贝核心代码到Index组件中
        * 5. 分析并调整代码，让其能够在项目中正常运行
* 3.6 顶部导航
    * 1. 实现结构和样式
    * 2. 添加城市选择、搜索、地图找房页面的路由跳转
* 3.7 H5中的地理位置API
    * 场景：根据当前地理位置，获取当前所在城市的房源信息
    * 作用：在Web应用程序中获取地理位置
    * 说明：地理位置API通过navigator.geolocation对象提供，通过getCurrentPosition方法获取
    * 注意：获取到的地理位置跟GPS、IP地址、WiFi和蓝牙的MAC地址、GSM/CDMS(手机卡)的ID有关
    * 如：收集优先使用GPS定位，笔记本等最准确的定位是WiFi
* 3.8 百度/高德地图API(百度地图不给力，换成高德地图了，为了百度的面子不换名字只加上高德)
    * 3.8.1 介绍
        * H5的地理位置API只能获取到经纬度信息
        * 实际开发中，通过百度/高德地图API来完成地理位置的相关功能
        * 租房项目中，通过百度地图API实现地理定位和找房功能
        * 百度/高德地图文档(首页->开发者文档->JavaScript API)
        * 注意：使用前需要先申请百度账号和ak(密钥)，获取到的ak
    * 3.8.2 申请百度账号和密钥
        * 1. 注册百度账号，登录百度/高德地图开放平台
        * 2. 点击创建应用
        * 3. 获取到密钥(ak)
    * 3.8.3 使用步骤
        * 1. 引入百度/高德地图的API的js文件，，替换自己申请好的密钥，选择一种方法即可，整多了还给我打印错误信息了
            * 方法1：```<script src = 'https://webapi.amap.com/maps?v=2.0&key=9c4e4dc233ce9bb35c0ff360b6fa9c61&plugin=AMap.Adaptor' type="text/javascript" > </script>```
            * 方法2：
                * ``` AMapLoader.load({
                        key: '9c4e4dc233ce9bb35c0ff360b6fa9c61', // 申请好的Web端开发者Key，首次调用 load 时必填
                        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                        plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                    })
                        .then(AMap => {
                            this.map = new AMap.Map('container', {
                            // 设置地图容器id
                            // viewMode: '3D', // 是否为3D地图模式
                            zoom: 5, // 初始化地图级别
                            center: [116.404, 39.915], // 初始化地图中心点位置
                            });
                        })
                        .catch(e => {
                            console.log(e);
                        });
                  ```
        * 2. 在index.css中设置全局样式
        * 3. 创建Map组件，配置路由，并在Map组件中，创建地图容器元素，并设置样式
        * 4. 创建地图实例(4-6位百度地图的例子，目前无法实现，但不删了，高德地图的方式到3为止)
            * ```const map=new window.BMap.Map('container')```
        * 5. 设置中心点坐标
            * ```const point=new window.BMap.Point(116.404, 39.915)```
        * 6. 初始化地图，同时设置展示级别
            * ```map.centerAndZoom(point, 15); ```
    * 3.8.4 获取顶部导航城市信息
        * 1. 打开高德地图JSAPI定位文档
        * 2. 通过IP定位获取到当前城市名称
        * 3. 调用我们服务器的接口，获取项目中城市信息(有房源的城市的名称和id)
        * 4. 将接口返回的城市信息展示在顶部导航栏中

## 四、城市选择模块
* 4.1 功能分析
    * 业务：切换城市，查看该城市下的房源信息
    * 功能：1. 顶部导航栏 2. 城市列表展示 3. 使用索引快速切换城市 4. 点击城市名称切换城市
    * 第三方组件：react-virtualized长列表，用来实现长列表的性能优化
    难点：数据格式的处理；react-virtualized组件在项目中的使用
* 4.2 顶部导航栏
    * 1. 打开antd-mobile组件库的NavBar导航栏组件文档
    * 2. 从文档中拷贝组件实例代码到项目中，让其正常运行
    * 3. 修改导航栏样式和结构
* 4.3 获取并处理城市列表数据
    * 1. 页面加载时，根据接口获取城市列表数据
    * 2. 分析当前数据格式以及该功能需要的数据格式
    * 3. 转化当前数据格式为所需数据格式
    * 4. 获取热门城市数据，并添加到现有数据列表中(顺序)
        * 获取热门城市数据
        * 将数据添加到cityList中
        * 将索引添加到cityIndex中
    * 5. 获取当前定位城市数据，并添加到现有数据列表中
        * 当前定位城市数据
            * 问题：首页模块中，需要获取定位城市，城市列表模块中也需要获取定位城市，该如何处理？
            * 方法：封装成函数，哪个页面要获取定位城市，直接调用该方法即可
            * 1. 在utils目录中，新建index.js，在该文件中封装辅助性的工具函数
            * 2. 创建并导出获取定位城市的函数 getCurrentCity
            * 3. 判断localStorage中是否有定位城市
            * 4. 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
            * 5. 如果有，直接返回本地存储中的城市数据
* 4.4 长列表性能优化
    * 4.4.1 概述
        * 场景：展示大型列表和表格数据(比如：城市列表、通讯录、微博等)，会导致页面卡顿、滚动不流畅等性能问题
        * 产生性能问题的原因：大量DOM节点的重绘和重排
        * 其他原因：设备老旧
        * 其他问题：移动端设备耗电快，影响移动设备电池寿命
        * 优化方案：1. 懒渲染(懒加载)；2. 可视区域渲染
    * 4.4.2 懒渲染说明(就是懒加载)
        * 常见的长列表优化方案，常见于移动端
        * 原理：每次只渲染一部分(比如先渲染10条数据)，等渲染的数据即将滚动完时，再渲染下面部分
        * 优点：每次只渲染一部分内容，速度快
        * 缺陷：数据量大时，页面中依然存在大量DOM节点，占用内存过多、降低浏览器渲染性能，导致页面卡顿
        * 使用场景：数据量不大的情况(如1000条，具体还要看每条数据的复杂程度)
    * 4.4.3 可视区域渲染(react-virtualized)
        * 原理：只渲染页面可视区域的列表项，非可视区域的数据“完全不渲染”，在滚动列表时动态更新几条列表项
        * 使用场景：一次性展示大量数据的情况(比如：大表格、微博、聊天应用等)
* 4.5 react-virtualized
    * 4.5.1 概述
        * 1. 在项目中的应用：实现城市选择列表页面的渲染
        * 2. react-virtualized是React组件，用来高效渲染大型列表和表格数据
        * 3. GitHub地址：https://github.com/bvaughn/react-virtualized
    * 4.5.2 基本使用
        * 1. 安装：npm i react -virtualized --legacy-peer-deps
        * 2. 在项目入口文件index.js中导入样式文件(只导入一次即可)
        * 3. 打开文档，点击List组件，进入List的文档中
        * 4. 翻到文档最底部，将示例代码拷贝到项目中
        * 5. 分析示例代码
* 4.6 渲染城市列表
    * 4.6.1 让List组件占满屏幕
        * 1. 打开AutoSizer高阶组件的文档
        * 2. 导入AutoSizer组件
        * 3. 通过render-props模式，获取到AutoSizer组件暴露的width和height属性
        * 4. 设置List组件的width和height属性
        * 5. 设置城市选择页面根元素高度为100%，让List组件占满整个页面
        * 6. 调整样式，让页面不要出现全局滚动条，避免顶部导航栏滚动。在整个页面的顶部设置padding-top为45px，空出位置，再在顶部导航部分设置margin-top为-45px，占用空出来的位置。就可以把顶部导航固定在顶部，不会跟着下面每一行选项的滚动而跟着滚动甚至消失
    * 4.6.2 使用List组件渲染城市列表
        * 1. 将获取到的城市数据(cityList&cityIndex)添加为组件的状态数据
        * 2. 修改List组件的rowCount为cityIndex数组的长度
        * 3. 将rowRenderer函数添加到组件中，以便在函数中获取到状态数据cityList和cityIndex
        * 4. 修改List组件的rowRenderer为组件中的rowRenderer方法
        * 5. 修改rowRenderer方法中渲染的每行的结构和样式
        * 6. 修改List组件的rowHeight为函数，动态计算每一行的高度(因为每一行高度都不相同)
* 4.7 城市索引列表
    * 4.7.1 渲染城市索引列表
        * 1. 封装renderCityIndex方法，用来渲染页面右侧的城市索引列表
        * 2. 在方法中，获取索引数组cityIndex，并对其进行遍历，渲染索引列表
        * 3. 将索引后退替换为热
        * 4. 在state中添加状态activeIndex，来指定当前高亮的索引
        * 5. 在遍历cityIndex是，添加当前字母索引是否符合高亮的条件
    * 4.7.2 滚动城市列表让对应索引高亮
        * 1. 给List组件添加onRowRendered配置项，用于获取当前列表渲染的行信息
        * 2. 通过参数startIndex获取到，起始行索引(也就是城市列表可视区最顶部一行的索引号)
        * 3. 判断startIndex和activeIndex是否相同(判断的目的是为了提升性能，避免不必要的state更新)
        * 4. 当startIndex和activeIndex不同时，更新状态activeIndex为startIndex的值
    * 4.7.3 点击索引置顶该索引城市
        * 1. 给索引列表项绑定点击事件
        * 2. 在点击事件中，通过index获取到当前项索引号
        * 3. 调用List组件中的scrollToRow方法，让List组件滚动到指定行
            * 3.1 在constructor中，调用React.createRef()创建ref对象
            * 3.2 将创建好的ref对象，添加为List组件的ref属性
            * 3.3 通过ref的current属性，获取到组件实例，再调用组件的scrollToRow方法
        * 4. 设置List组件的scrollToAlignment配置项值为start，保证被点击行出现在页面顶部
        * 5. 对于点击索引无法正确定位的问题，调用List组件的measureAllRows方法，提前计算高度来解决。什么时候调用该方法？组件刚刚挂载的时候，也就是在componentDidMount钩子中调用
* 4.8 切换城市
    * 1. 给城市列表绑定单击事件
    * 2. 判断当前城市是否有房源数据(只有北/上/广/深四个城市有数据)
    * 3. 如果有房源数据，则保存当前城市数据到本地缓存中，并返回上一页
    * 4. 如果没有房源数据，则提示用户；该城市暂无房源数据，不执行任何操作

## 五、地图找房模块
* 5.1 功能分析
    * 业务：使用高德地图API实现司徒找房
    * 功能：
        * 1. 展示当前定位城市
        * 2. 真实该城市所有区的房源数据
        * 3. 展示某区下所有真的房源数据
        * 4. 展示某镇下所有小区的房源数据
        * 5. 展示某小区下的房源数据列表
    * 难点：高德地图标注、缩放级别、缩放时间等的使用
* 5.2 顶部导航栏
    * 5.2.1 步骤
        * 1. 封装NavHeader组件实现城市选择、地图找房页面的复用
        * 2. 在components目录中创建NavHeader组件
        * 3. 在该组件中封装antd-mobile组件库的NavBar组件
        * 4. 在地图找房页面使用封装好的NavHeader组件实现顶部导航栏功能
        * 5. 使用NavHeader组件，替换城市选择页面的NavBar组件
        * **注：默认情况下，只有路由Route直接渲染的组件才能够获取到路由信息(比如：hostory.go()等)**
            * 方法：如果需要在其他组件中获取到路由信息可以通过withRouter高阶函数来获取
            * 1. 从react-router-dom中导入withRouter高阶组件
            * 2. 使用withRouter高阶组件包装NavHeader组件
                * 目的：包装后，就可以在组件中获取到当前路由信息了
            * 3. 从props中解构出history对象
            * 4. 调用hostory.go()实现返回上一页的功能
            * 5. 从props中解构出onLeftClick函数，实现自定义 < 按钮的点击事件
    * 5.2.2 添加props校验
        * 1. 安装：npm i prop-types
        * 2. 导入PropTypes
        * 3. 给NavHeader组件的children(必选项，且必为字符串类型)和onLeftClick(可选项，类型必为函数类型)属性添加props校验
* 5.3 组件间样式覆盖问题
    * 5.3.1 概述
        * 1. 问题：CityList组件的样式，会影响Map组件的样式
        * 2. 原因：在配置路由时，CityList和Map组件都被导入到项目中，那么组件的样式也就被导入到项目中了。如果组件之间样式名称相同，那么一个组件中的样式就会在另一个组件中也生效，从而造成组件之间样式相互覆盖的问题。
        * 3. 结论：默认，只要导入了组件，不管组件有没有显示在页面中，组件的样式就会生效
        * 4. 解决方法：
            * 手动处理(起不同的类名)
            * CSS IN JS
    * 5.3.2 CSS IN JS
        * CSS IN JS：是使用JavaScript编写CSS的统称，用来解决CSS样式冲突、覆盖等问题
        * CSS IN JS的具体实现有50多种， 比如：CSS Modules、styled-components等
        * 推荐使用：CSS Modules(React脚手架已集成，可直接使用)
    * 5.3.3 CSS Modules的说明
        * CSS Modules通过对CSS类名重命名，保证每个类名的唯一性，从而避免样式冲突的问题
        * 换句话说：所有类名具有“局部作用域”，只在当前组件内部生效
        * 实现方式：webpack的css-loader插件(https://github.com/css-modules/css-modules)
        * 命名采用：BEM(Block块、Element元素、Modifier三部分组成)命名规范，比如：.list_item_active
        * 在React脚手架中演化成：文件名(filename)、类名(classname)、hash(随机)三部分，只需要指定**类名**即可，如：[filename]_[classname]_[hash]
    * 5.3.4 CSS Modules在项目中的使用
        * 1. 创建名为[name].modules.css的样式文件(React脚手架中的约定，与不同CSS作区分)
            * ```
                //在CityList组件中创建的样式文件名称
                index.module.css
              ```
        * 2. 组件中导入该样式文件(注意语法)
            * ```
                //在CityList组件中导入样式文件
                import styles from './index.module.css'
              ```
        * 3. 通过styles对象访问对象中的样式名来设置样式
            * ```<div className={styles.test}></div>```
    * 5.3.5 使用CSS Modules修改NavHeader组件的样式
        * 1. 在NavHeader目录中创建名为index.module.css的样式文件
        * 2. 在样式文件中修改当前组建的样式(使用单个类名设置样式，不使用嵌套样式)
        * 3. 对于组件库中已经有的全局样式(比如：.am-navbar-title)需要使用:global()来指定
            * ```:global(.am-navbar-title){color:#333}```/```.root :global(.am-navbar-title){}s```
* 5.4 根据定位展示当前城市
    * 1. 获取当前定位城市
    * 2. 使用地址解析器解析当前城市坐标
    * 3. 调用setZoom()方法在地图中展示当前城市，并设置缩放级别为11
    * 4. 在地图中添加比例尺和平移缩放控件
* 5.5 创建文本覆盖物
    * 5.5.1 步骤
        * 1. 打开高德地图地图JS API 参考手册 覆盖物
        * 2. 创建labelMarker实例对象
        * 3. 创建icon实例对象，在labelMarker中设施属性icon为创建的实例对象icon，并调用setIcon()方法设置样式
        * 4. 在map对象上调用add(labelMarker)方法，将文本覆盖物添加到地图中
    * 5.5.2 绘制房源覆盖物
        * 1. 调用marker的setLabel()方法，传入HTML结构，修改HTML内容的样式
            * ```setLabel(html:String|htmlDOM)```,```this.marker.setLabel(`<div class="${style.bubble}">...内容</div>`)```
        * 2. 调用setStyle()修改覆盖物的样式
            * ```labelMarker.setIcon(labelStyle)```
        * 3. 给文本覆盖物添加单击事件
            * ```labelMarker.on('click',fn=>{})```
* 5.6 地图找房
    * 5.6.1 功能分析
        * 1. 获取房源数据，用于渲染覆盖物
        * 2. 单击覆盖物后：1. 放大地图；2. 获取数据，渲染下一级覆盖物(重复第一步)
        * 3. 区、镇：单击事件中，清除现有的覆盖物，创建新的覆盖物
        * 4. 小区：不清除覆盖物，移动地图，在房源列表中展示该小区下面所有的房屋数据
    * 5.6.2 渲染所有区的房源覆盖物
        * 1. 获取房源信息
        * 2. 遍历数据，创建覆盖物，给每个覆盖物添加唯一标识(是为了在后面点击区覆盖物的时候，能够获取点击的那一项)
        * 3. 给覆盖物添加单击事件
        * 4. 在单击事件中，获取到当前单击项的唯一标识
        * 5. 放大地图(级别为13)，调用clearMap()方法清除当前覆盖物
    * 5.6.3 封装流程
        * 1. renderOverlays()作为入口：(1)接收区域id参数，获取该区域下的房源数据；(2)获取覆盖物类型以及下级地图缩放级别
        * 2. createOverlays()方法：根据传入的类型，调用对应方法，创建覆盖物
        * 3. createCircle()方法：根据传入的数据创建覆盖物，绑定事件(放大地图、清除覆盖物、渲染下一级房源数据)
        * 4. createRect()方法：根据传入的数据创建覆盖物，绑定事件(移动地图，渲染房源列表)
    * 5.6.4 地图找房
        * 1. 接收区域id参数，获取指定区域下房源数据
        * 2. 调用getTypeAndZoom函数，这个函数需要我自己封装，在函数内调用getZoom方法，来获取地图缩放级别、覆盖物类别(根据缩放级别来得到)
    * 5.6.5 createOverlays()
        * 根据传入的类型等数据，调用相应的创建覆盖物，并提供参数
    * 5.6.6 createCircle()
        * 1. 复用之前创建覆盖物的代码逻辑
        * 2. 在覆盖物的单击事件中，调用renderOverlays(id)方法，重新渲染该区域的房屋数据
    * 5.6.7 createRect()
        * 1. 创建Marker、设置样式、设置HTML内容，绑定单击事件
        * 2. 单击事件中，获取该小区的房源数据
        * 3. 展示房源列表
        * 4. 渲染获取到的房源数据
        * 5. 调用地图panBy()方法，移动地图到中间位置
            * 公式：
                * 垂直平移：(window.innerHeight-330)/2-target.clientY
                * 水平平移：window.innerWidth/2-target.clientX
        * 6. 监听地图movestart事件，在地图移动时隐藏房源列表