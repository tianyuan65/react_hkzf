import React, { Component } from 'react'
import axios from 'axios'
// 导入样式
// import './index.scss'
// import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl'
// 引入amap-jsapi-loader
import AMapLoader from '@amap/amap-jsapi-loader';
// 导入NavHeader组件
import NavHeader from '../../components/NavHeader';
// 导入CSS Modules样式
import styles from './index.module.css'
// console.log(styles);  //{test: 'Map_test__6VjwN'}

// 解决脚手架中全局变量访问的问题
// const AMap=window.AMap
// 覆盖物样式
const labelStyle={
    cursor:'pointer',
    border:'0px solid rgb(255,0,0)',
    padding:'0px',
    whiteSpace:'nowrap',
    fontSize:'12px',
    color:'rgb(255,255,255)',
    textAlign:'center'
}
export default class Map extends Component {
    constructor(){
        super()
        this.map={}
    }

    // 创建map对象
    componentDidMount(){
        this.initMap()
    }

    // 初始化地图
    initMap(){
        // 1. 获取当前定位城市
        const {label,value}=JSON.parse(localStorage.getItem('hkzf_city'))
        // console.log(label,value);

        AMapLoader.load({
            key: '9c4e4dc233ce9bb35c0ff360b6fa9c61', // 申请好的Web端开发者Key，首次调用 load 时必填
            version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            plugins: ['AMap.Geocoder','AMap.ToolBar','AMap.Scale','AMap.OverView','AMap.MapType','AMap.Geolocation']
        })
            .then(AMap => {
                this.map = new AMap.Map('container', {
                    // 设置地图容器id
                    // viewMode: '3D', // 是否为3D地图模式
                    // zoom: 12, // 初始化地图级别
                    // center: [121.473, 31.230], // 初始化地图中心点位置
                    // showLabel: false,
                    resizeEnable:true
                });
                // 2. 使用地址解析器解析当前城市坐标
                    // 创建地址解析器实例
                this.geocoder=new AMap.Geocoder();
                // 实例化坐标点 
                this.marker=new AMap.Marker({
                    // position:[121.473, 31.230],
                    icon:'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                    content:''
                });
                console.log(this.marker);

                // var layer = new AMap.LabelsLayer({
                //     zooms: [3, 20],
                //     zIndex: 1000,
                //     // 开启标注避让，默认为开启，v1.4.15 新增属性
                //     collision: true,
                //     // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
                //     animation: true,
                //     visible:true
                // })

                // this.map.add(layer);

                // console.log(222);
                // 将获取的定位城市，转换为坐标
                // console.log(333);
                this.markers =[];
                this.geocoder.getLocation(label,
                    // 得到定位城市后，向服务器发送请求，并会得到响应，status代表成功发送请求并得到响应；result代表服务器发送了很多关于定位城市的数据结果，其结果里就包含城市中心坐标
                    async (status ,result)=> {
                    // 判断坐标定位的是否是获取的城市的坐标
                        if (status ==='complete'&&result.geocodes.length) {
                            // console.log(111);
                            // 是则返回其坐标值
                            const point=result.geocodes[0].location
                            console.log(point);
                            const LngLat=new AMap.LngLat(121.473, 31.230)
                            // console.log(LngLat);
                            // 设置地图缩放级别，并设置AMap.LngLat为展示在地图的
                            this.map.setZoomAndCenter(11,LngLat)
                            // 给点标识设置坐标
                            this.marker.setPosition(LngLat)
                            // 给点标识指定目标显示地图
                            // this.marker.setMap(this.map)
                                
                            // 集成了缩放、平移、定位等功能按钮在内的组合控件
                            this.map.addControl(new AMap.ToolBar());
                            // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                            this.map.addControl(new AMap.Scale());
                            
                            // 获取房源数据
                            const res=await axios.get(`http://localhost:8080/area/map?id=${value}`)
                            console.log('房源数据',res);
                            
                            res.data.body.forEach(item=>
                           // const item = res.data.body[0];
                                {
                                // 为每一条数据创建覆盖物
                                const {
                                    coord:{latitude,longitude},
                                    label:areaName,count,value
                                }=item
                                // console.log(latitude,longitude);
                                this.markers.push(item);
                                const areaPoint=[longitude,latitude]
                                console.log(areaPoint);

                                // // const icon=new AMap.Icon({size:(30,30)})
                                // // 设置文本覆盖物
                                // const pos = AMap.LngLat(longitude,latitude,false);
                                // const marker2=new AMap.Marker({
                                //     position:pos,
                                //     content:'111',
                                //     icon:'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
                                // })
                                // marker2.setMap(this.map)
                                
                            
                                // 创建覆盖物
                                // 给labelMarker对象添加一个唯一标识
                                // labelMarker.id=value
                                // 设置房源覆盖物
                                // labelMarker.setLabel({content:`
                                //     <div class="${styles.bubble}">
                                //         <p class="${styles.name}">${areaName}</p>
                                //         <p>${count}套</p>
                                //     </div>
                                // `})
                                 
                                    
                                // 设置坐标点的样式
                                // labelMarker.setIcon(labelStyle)
                                // 添加单击事件
                                // labelMarker.on('click',()=>{
                                //     // 单击事件中，获取当前点击项的唯一标识
                                //     console.log('房源覆盖物被点击了',labelMarker.id);

                                //     // 放大地图，以当前点击的覆盖物为中心放大地图
                                //     this.map.setZoomAndCenter(13,areaPoint)
                                //     setTimeout(() => {
                                //         // 清除当前覆盖物信息
                                //         this.map.clearOverlays()
                                //     }, 0);
                                // })
                                
                               
                            }
                            )

                            
                        }
                    },label)
                    // this.map.add(this.marker)
                    //this.map.add(this.markers)
                    
                    // 给地图里添加坐标点覆盖物
                    // this.map.setFitView();

                    
       
            .catch(e => {
                console.log(e);
            });


            this.markers.forEach(item=>{
            
                // const icon=new AMap.Icon({size:(30,30)})
                                    // 设置文本覆盖物
    
                                    const {
                                        coord:{latitude,longitude},
                                        label:areaName,count,value
                                    }=item
    
    
                                    const pos =new  AMap.LngLat(longitude,latitude,false);
                                    const marker2=new AMap.Marker({
                                        position:pos,
                                        content:'111',
                                        icon:'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
                                    })
                                    marker2.setMap(this.map)
                })
                
        })
        
                                
                            
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
        </div>
        )
    }
}
    
