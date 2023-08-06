## Project Introduction
* To achieve the functionality of locating the current city and searching for houses based on the current location or manually selected city using React technology and the AMap JS API, you can follow these general steps.
## Project Goals
* Enable users to conveniently and quickly access real estate information in their current location.
## Main Contents
* 1. Locate the current city of the user.
* 2. Render the carousel, rental group data, and latest housing news on the homepage.
* 3. Click on the city name in the upper-left corner to navigate to the city list page. Render the national city list sorted by the first letter of each city. Display the current location city and popular cities at the top of the list.
* 4. Click on the map icon in the upper-right corner to display the map of the user's current city. On the map, use green circles and rectangular labels to show all the real estate data within that city.
## Technologies Used
* React
* react-router-dom
* antd-mobile-v2(Similar to antd-design, it is a component library that has been updated to version 5.x.)
* react-virtualized(The technique used to load and render only a portion of data on the page is called "Lazy Loading" or "Incremental Loading".)
* AMap JS API
## Summary
* 1. Writing the Index, Home, and CityList components went smoothly, as I first fetched or created the necessary data (images, city names, city initials, etc.) and then imported components from the antd-mobile component library, iterating over the data to display it on the page.
* 2. I faced the longest challenge with the Map component. At that time, I didn't fully understand how to use the parameters, methods, and functions after instantiating the map tool. Additionally, I encountered difficulties in deciding how to load the AMap JS API, which can be done in two ways: either through a script tag or using the AMapLoader.load({}) method. The first option is more convenient and concise, but I also had to learn how to use the second option since it was used to create the city query function.
## Difficulties and Key Points
* 1. When using APIs from different map platforms, special attention should be paid to their usage and naming conventions. When writing code, it is important to understand how to apply them correctly.
* 2. To retrieve data from the local storage (localStorage) or add data to localStorage, use the "key" and "value" approach, which involves getting or adding data using key-value pairs.
* 3. When obtaining the Request URL from Swagger UI, it is crucial to be mindful of how parameters are passed in the request.
## Impressions:
* 1. It is essential to flexibly utilize APIs from different map open platforms.
* 2. It is important to proficiently use MySQL to upload the real estate data provided by the agency and adeptly fetch relevant city housing data from the server.
## Start this project
* 1. Use MySQL to upload the nationwide real estate data.
* 2. To open the ```C:\Users\田园\Desktop\react-project\hkzf-mobile\hkzf_v1\db```, directory using the Command Prompt (cmd) and access the API at ```http://localhost:8080/```

## 项目介绍
* 使用React技术搭建脚手架，使用高德地图的JS API，实现定位当前城市，并根据当前定位城市或自主选择城市地图来找房的功能。
## 项目目标
* 使用户可以更便捷、快速地了解到当前所在城市的房源信息
## 主要内容
* 1. 定位当前用户所在城市
* 2. 渲染首页页面中的轮播图，租房小组数据和最新房屋新闻
* 3. 点击左上方城市名，跳转到城市列表页面，按照城市首字母，渲染全国城市列表，在列表最上方展示当前所在城市，热门城市
* 4. 点击右上方地图图标后，渲染用户所在城市的地图，在地图中，以绿色圆形和矩形标签来展示该城市内所有的房源数据
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
## 感受：
* 1. 需要灵活运用不同的地图开放平台的API
* 2. 需要熟练使用MySQL上传房屋中介提供的房屋数据，并灵活地从服务器获取有用的城市房屋数据
## 项目启动
* cmd 命令打开```C:\Users\田园\Desktop\react-project\hkzf-mobile\hkzf_v1\db```，接口地址为```http://localhost:8080/```。