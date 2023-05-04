import Home from "../pages/Home";
import CityList from "../pages/CityList";
import News from "../pages/News";

const routes=[
    {
        path:'cityList',
        element:<CityList/>
    },
    {
        path:'home',
        element:<Home/>,
        children:[
            {
                path:'news',
                element:<News/>
            }


        ]
    }
]

export default routes