import React, { Component } from 'react'
// 导入样式
import './index.css'
// import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl'
// 引入amap-jsapi-loader
import AMapLoader from '@amap/amap-jsapi-loader';
// 导入NavHeader组件
import NavHeader from '../../components/NavHeader';

export default class Map extends Component {
    constructor(){
        super()
        this.map={}
    }

    // 创建map对象
    componentDidMount(){
        AMapLoader.load({
            key: '9c4e4dc233ce9bb35c0ff360b6fa9c61', // 申请好的Web端开发者Key，首次调用 load 时必填
            version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            // plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then(AMap => {
                this.map = new AMap.Map('container', {
                    // 设置地图容器id
                    // viewMode: '3D', // 是否为3D地图模式
                    zoom: 12, // 初始化地图级别
                    center: [116.404, 39.915], // 初始化地图中心点位置
                });

            })
            .catch(e => {
                console.log(e);
            });

    }
    render() {
        return (
        <div className='map'>
            <div className='test'>测试样式覆盖问题</div>
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
            <div id='container'>
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
