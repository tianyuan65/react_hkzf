## 项目介绍
* 使用React技术搭建脚手架，使用高德地图的JS API，实现定位当前城市，并根据当前定位城市或自主选择城市地图来找房的的功能。
## 用到的技术
* React
* react-router-dom
* antd-mobile-v2(类似于antd-design，是个组件库，目前已更新到5x版本)
* react-virtualized(用于只加载部分数据，并渲染在页面上的技术)
* AMap JS API(重点加我的难点)
## 总结
* 1. 在编写Index组件、Home组件及CityList组件时，比较顺利，基本都是先获取或创建需要的数据(图片，城市名，城市首字母等)，再从antd-mobile组件库中，引入组件，并将数据进行遍历，以便展示在页面中。
* 2. 卡在Map组件上的时间最长，当时没有理解地图工具实例化后，参数和方法/函数到底如何运用。在这当中，也有AMap的JS API的loader以什么样的方式引入(有两种，一种是script标签引入；另外一种是AMapLoader.load({})来引入，显然第一种更方便简洁，但是第二种也得会，创建城市查询函数用的就是第二个)。
## 难点与重点
* 1. 不同地图平台的API，需要在其用法与名称上格外注意，编写代码时，注意如何应用
* 2. 从本地存储(localStorage)获取数据，或将数据添加到localStorage，使用"key":"","value":""，也就是键值方式获取或添加
* 3. 从Swagger UI中获取Request URL时，需要注意参数以何种方法传递。
    * 'http://localhost:8080/home/group',{
      params:{
        // 暂时用服务器提供的，后续城市位置变化时再把对应城市的地址当做URL参数传递进去即可
        area:'AREA%7C88cff55c-aaa4-e2e0'
      }
    } 还是
    * 'http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
* 