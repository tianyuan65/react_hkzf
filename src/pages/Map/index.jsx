import React, { Component } from 'react'
import axios from 'axios'
// 导入样式
// import './index.scss'
// import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl'
import {Link} from 'react-router-dom'
import {Toast} from 'antd-mobile-v2'
// 导入NavHeader组件
import NavHeader from '../../components/NavHeader';
// 导入CSS Modules样式
import styles from './index.module.css'
// import { log } from 'debug/src/browser';
// console.log(styles);  //{test: 'Map_test__6VjwN'}

// 解决脚手架中全局变量访问的问题
const AMap=window.AMap
export default class Map extends Component {
    state={
        // 小区下的房源列表
        housesList:[],
        // 表示是否展示房屋列表，默认不展示
        isShowList:false
    }

    componentDidMount(){
        // 调用初始化地图的函数
        this.initMap()
    }

    // 初始化地图
    initMap(){
        // 1. 获取当前定位城市，从本地存储中使用getItems的方法来获取key为hkzf_city的value的值(也就是城市名和value的值)，并调用JSON的parse方法，将获取到的字符串类型的结果转化为对象类型，最后用解构赋值的方式得到城市名和value的值
        const {label,value}=JSON.parse(localStorage.getItem('hkzf_city'))
        console.log('当前定位城市 '+label,value);
        console.log('localStoage',localStorage.getItem('hkzf_city')[0]);
        console.log('localStoage',localStorage.getItem('hkzf_city')[1]);


        // 创建地图，并实例化
        const map=new AMap.Map('container',{
            zoom:10,
            center:[121.498586, 31.239637],
            resizeEnable: true
        })
        // 作用：能够在其他函数/方法中通过this来获取地图对象
        this.map=map
        // 实例化点标识
        const marker=new AMap.Marker()
        // 添加地址解析器的插件并实例化地址解析器
        const geocoder=new AMap.Geocoder();
        
        // 调用地址解析器的getLocation方法，传入获取到的当前城市名和回调函数
        geocoder.getLocation(label,
            // 函数的参数为想法服务器发送请求后，得到的成功的响应的status和result
            (status,result)=>{
                // 函数中判断是否成功从服务器得到成功的响应和关于获取到的城市的具体信息的结果
                if (status==='complete'&&result.geocodes.length) {
                    // 两个都成功则进入判断，从获取到的城市的结果中获取城市市中心的坐标，并赋值给变量lnglat
                    const lnglat=result.geocodes[0].location
                    // 给点标识设置位置
                    marker.setPosition(lnglat)
                    // 将点标识添加到地图中，下面的两个方法任选其一
                    map.add(marker)
                    // marker.setMap(map)
                    
                    // 添加需要的控件，目前只用平移和比例尺
                    AMap.plugin(['AMap.ToolBar','AMap.Scale'],function () {
                        // 集成了缩放、平移、定位等功能按钮在内的组合控件
                        const toolBar=new AMap.ToolBar()
                        map.addControl(toolBar)
                        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                        const scale=new AMap.Scale()
                        map.addControl(scale)
                    })
                    console.log('zoom getLocation '+this.map.getZoom());
                    // 调用renderOverlays方法，并传入value作为
                    console.log('value')
                    console.log(`${value}`)
                    this.renderOverlays(value)
                    // 获取房源数据
                    // const res=await axios.get(`http://localhost:8080/area/map?id=${value}`)
                    // console.log('房源数据',res);
                    // res.data.body.forEach(item=>{
                    //     // return console.log(item)
                    //     // 为每一条数据创建覆盖物
                    //     const {
                    //         // 获取房源数据中各区的经纬度信息
                    //         coord:{longitude,latitude},
                    //         // 获取各区的区名，房源数量，房源信息的value值
                    //         label:areaName,count,value
                    //     }=item
                    //     const LngLat=new AMap.LngLat(longitude,latitude,true)
                    //     // console.log(lnglat);
                    //     // console.log(point);
                    //     // 实例化覆盖物
                    //     const labelMarker=new AMap.Marker({
                    //         position:LngLat,
                    //     })
                    //     // 给覆盖物修改文本内容
                    //     labelMarker.setLabel({content:`
                    //         <div class="${styles.bubble}">
                    //             <p class="${styles.name}">${areaName}</p>
                    //             <p>${count}套</p>
                    //         </div>
                    //     `})
                    //     // 给覆盖物添加样式
                    //     // labelMarker.setIcon(labelStyle)
                    //     // 给labelMarker对象添加一个唯一标识value，是为了点击的覆盖物后，能够获取到点击的那一项覆盖物的area信息
                    //     labelMarker.id=value
                    //     const areaPoint=[longitude,latitude]
                    //     // 给覆盖物添加单击事件
                    //     labelMarker.on('click',()=>{
                    //         console.log('房源覆盖物被点击了',labelMarker.id);
                    //         // 点击某一个覆盖物，放大地图，以当前点击的覆盖物为中心放大
                    //         map.setZoomAndCenter(13,areaPoint)
                    //         // 并清除现有的覆盖物，创建新的覆盖物，并展示该区内所有的小区的房源数据
                    //         setTimeout(() => {
                    //             // 清除当前覆盖物信息
                    //             map.clearMap()
                    //         }, 0);
                    //     // 将覆盖物标识添加到地图中
                    //     map.add(labelMarker)
                    //     })
                    // })
                    
                }else{
                    console.warn('根据地质查询位置失败');
                }
        })

        console.log('zoom '+this.map.getZoom());
        // 给地图绑定移动事件
        map.on('movestart',()=>{
            // console.log('movestart,动了');
            if (this.state.isShowList) {
                this.setState({
                    isShowList:false
                })
            }
        })
    }

    // 渲染覆盖物入口，传入id，可以在函数里获取房源数据的时候，根据指定的id获取
    // id=value
    async renderOverlays(id){
        // console.log('id')
        console.log(`${id}`)
        // 开启loading
        Toast.loading('数据加载中...',0,null,false)
        // console.log(this);
        // 根据当前指定的id，获取房源数据
        const res=await axios.get(`http://localhost:8080/area/map?id=${id}`)
        // console.log('renderOverlays',res);
        console.log('zoom renderoverlays'+this.map.getZoom());
        // 关闭loading
        Toast.hide()
        const data=res.data.body
        
        // 调用getTypeAndZoom函数，获取地图缩放级别与类型
        const {nextZoom,type}=this.getTypeAndZoom()
        // 遍历房源数据
        data.forEach(item=>{
            // 调用创建覆盖物的函数
            this.createOverlays(item,nextZoom,type)
        })
    }

    // 计算要绘制的覆盖物类型和下一个缩放级别
    getTypeAndZoom(){
        // 调用地图的getZoom方法，来获取当前缩放级别
        const zoom=this.map.getZoom()
        console.log('getTypeAndZoom '+zoom);  //10.03
        
        // 声明下一个缩放级别变量nextZoom和当前类型变量type
        let nextZoom,type
        if (zoom>=10 && zoom<12) {
            // 区
            // 下一个缩放级别，也就是区里的显示区内各个小区的房源的那个级别
            nextZoom=13
            // 绘制圆形覆盖物
            type='circle'
        }else if (zoom>=12 && zoom<14) {
            // 镇
            nextZoom=15
            type='circle'
        }else if (zoom>=14 && zoom<16) {
            // 小区就不再需要缩放级别了，点击小区里的覆盖物之后就可以从下面弹出房源信息列表了
            // 绘制矩形覆盖物
            type='rect'
        }
        return {
            nextZoom,type
        }
    }

    // 创建新的覆盖物，将获取到的房源数据的遍历结果作为参数传进去，并把下一级的缩放级别和覆盖物展示的图形类型也作为参数传递进去
    createOverlays(data,zoom,type){
        // 获取房源数据
        const {
            // 获取房源数据中各区的经纬度信息
            coord:{longitude,latitude},
            // 获取各区的区名，房源数量，房源信息的value值
            label:areaName,count,value
        }=data
        // 创建坐标对象
        const areaPoint=[longitude,latitude]
        // 判断type类型为圆形或是矩形
        if(type==='circle'){
            // 区或镇中需要传递几个参数，当前点的坐标，当前的区域名，当前区的房源数量，当前区域的id值，当前区的缩放级别
            this.createCircle(areaPoint,areaName,count,value,zoom)
        }else if(type==='rect'){
            // 小区，当前小区的点的坐标，当前的小区名，当前小区的房源数量，当前小区的id值，当前小区的缩放级别
            this.createRect(areaPoint,areaName,count,value)
        }
    }

    // 创建圆形覆盖物函数
    createCircle(point,name,count,id,zoom){
        // 实例化圆形覆盖物
        const circle=new AMap.Marker({position:point})
        circle.id=id
        // 给覆盖物修改文本内容
        circle.setLabel({content:`
             <div class="${styles.bubble}">
                <p class="${styles.name}">${name}</p>
                <p>${count}套</p>
            </div>
        `})
        // 添加单击事件
        circle.on('click',()=>{
            // 调用renderOverlays方法，获取该区域下的房源数据
            this.renderOverlays(id)
            // 放大地图，以当前点击的覆盖物的中心为准，放大
            this.map.setZoomAndCenter(zoom,point)
            // 并清除现有的覆盖物，创建新的覆盖物，并展示该区内所有的小区的房源数据
            setTimeout(() => {
                // 清除当前覆盖物信息
                this.map.clearMap()
            }, 0);
        })
        // 将覆盖物标识添加到地图中
        this.map.add(circle)
    }
    // 创建矩形覆盖物函数
    createRect(point,name,count,id){
        // 实例化矩形覆盖物
        const rect=new AMap.Marker({
            position:point,
            offset:new AMap.Pixel(-50,-28)
        })
        rect.id=id
        // 给覆盖物修改文本内容
        rect.setLabel({content:`
            <div class="${styles.rect}">
                <span class="${styles.housename}">${name}</span>
                <span class="${styles.housenum}">${count}套</span>
                <i class="${styles.arrow}"></i>
            </div>
        `})
        // 添加单击事件
        rect.on('click',(event)=>{
            this.getHouseList(id)
            console.log('矩形被点了');

            // console.log(event);
            // 获取当前点击项
            const target=event.originEvent.changedTouches[0]
            // console.log(target);
            this.map.panBy(
                window.innerWidth/2-target.clientX,
                (window.innerHeight-330)/2-target.clientY
            )
        })
        // 将覆盖物标识添加到地图中
        this.map.add(rect)
    }

    // 获取小区房源数据
    async getHouseList(id){
        // 开启loading
        Toast.loading('数据加载中...',0,null,false)
        const res=await axios.get(`http://localhost:8080/houses?cityId=${id}`)
        console.log('小区房源数据',res);
        // 关闭loading
        Toast.hide()
        this.setState({
            housesList:res.data.body.list,
            // 展示房源列表
            isShowList:true
        })
    }

    // 封装渲染房屋列表的方法
    renderHousesList(){
        return this.state.housesList.map(item=> 
            <div className={styles.house} key={item.houseCode}>
                {/* 房屋图片 */}
                <div className={styles.imgWrap}>
                    <img 
                        className={styles.img} 
                        src={`http://localhost:8080${item.houseImg}`} 
                        alt="" />
                </div>
                {/* 房屋信息内容 */}
                <div className={styles.content}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <div className={styles.desc}>{item.desc}</div>
                    <div>
                        {item.tags.map((tag,index)=>{
                            const tagClass='tag'+(index+1)
                            return (
                                <span className={[styles.tag,styles[tagClass]].join(' ')} key={tag}>
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                    <div className={styles.price}>
                        <span className={styles.priceNum}>{item.price}</span>元/月
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className={styles.map}>
                {/* <div className={styles.test}>测试样式覆盖问题</div> */}
                {/* 顶部导航栏 */}
                <NavHeader 
                    // onLeftClick={()=>{
                    //     // this.props.history.go(-1)
                    //     console.log('退退退');
                    // }}
                >
                    地图找房
                </NavHeader>
                {/* 地图容器 */}
                <div id='container' className={styles.container}>
                    {/* <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">
                        <Marker position={{lng: 116.402544, lat: 39.928216}} />
                        <NavigationControl /> 
                        <InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
                    </Map> */}
                </div>

                {/* 房屋列表 */}
                {/* 添加styles.show展示房屋列表 */}
                <div className={[
                    styles.houseList,
                    // 三元表达式：判断isShowList的布尔值的状态，如果是初始化设置的false，意思就是矩形覆盖物没被点击，状态在点击事件中没有被改变，就不弹出houseList，执行第二个表达式；
                        // 否则执行第一个表达式
                    this.state.isShowList ? styles.show : ''
                    // 将houseList里的数据和isShowList的值打包成数组，再调用数组的join方法，方法中传入空的字符串，用于将的houseList的数据和isShowList打包进去，并展示在房屋列表中
                    ].join(' ')}>
                {/* <div className={[styles.houseListstyles.show].join(' ')}> */}
                    {/* 标题 */}
                    <div className={styles.titleWrap}>
                        <h1 className={styles.listTitle}>房屋列表</h1>
                        <Link className={styles.titleMore} to="home/list">更多房源</Link>
                    </div>

                    {/* 房屋信息 */}
                    <div className={styles.houseItems}>
                        {this.renderHousesList()}
                    </div>
                </div>
            </div>
        )
    }
}
    
