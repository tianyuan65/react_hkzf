import axios from "axios"
import AMapLoader from '@amap/amap-jsapi-loader';

// 1. 在utils目录中，新建index.js，在该文件中封装辅助性的工具函数
// 2. 创建并导出获取定位城市的函数 getCurrentCity
export const getCurrentCity=()=>{
    // 3. 判断localStorage中是否有定位城市
    const localCity=JSON.parse(localStorage.getItem(`hkzf_city`))
    if (!localCity) {
        // 4. 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
       return new Promise((resolve,reject)=>{
        AMapLoader.load({
            key: '9c4e4dc233ce9bb35c0ff360b6fa9c61', // 申请好的Web端开发者Key，首次调用 load 时必填
            version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.CitySearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          })
            .then(AMap => {
                const map = new AMap.Map('container', {
                    // 设置地图容器id
                    // viewMode: '3D', // 是否为3D地图模式
                    zoom: 5, // 初始化地图级别
                    center: [116.404, 39.915], // 初始化地图中心点位置
                });
                console.log(map);
                // 实例化城市查询类
                const citySearch=new AMap.CitySearch()
                // 自动获取用户IP，返回当前城市
                citySearch.getLocalCity(async res=>{
                   try {
                    const result=await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
                    // result.data.body=>{label: '上海', value: ''}
                    // console.log(result);

                    // 存储到本地存储中
                    localStorage.setItem(`hkzf_city`,JSON.stringify(result.data.body))
                    // 并返回该城市数据，暴露成功的结果
                    resolve(result.data.body)
                   } catch (error) {
                    // 获取定位城市失败，暴露失败的结果
                    reject(error)
                   }
                })
            })
            .catch(e => {
                console.log(e);
            });
       })
    }
    // 5. 如果有，直接返回本地存储中的城市数据
    // 注意：因为为了处理上面的localStorage中没有有定位城市的异步操作，使用了Promise，因此为了该函数返回值的统一，此处也使用Promise
        // 且因为此处的Promise不会失败，所以只返回成功的Promise
    // const p=new Promise()
    // return p.resolve(localCity)
    return new Promise(resolve=>{
        resolve(localCity)
    })
}
