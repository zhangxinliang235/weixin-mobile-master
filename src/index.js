import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
// import {HashRouter as Router, Route} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Loading from "./components/loading";
import AlarmDetails from "./components/alarm/AlarmDetails";
import WeaCus from "./components/WeaCus";
import Desc from "./components/Desc";
const Test = lazy(() => import("./components/Test"));
const Cloud = lazy(() => import("./components/Cloud"));
const ArticleList = lazy(() => import("./components/ArticleList"));
const Alarm = lazy(() => import("./components/Alarm"));
const AlarmMap = lazy(() => import("./components/alarm/AlarmMap"));
const AlarmList = lazy(() => import("./components/alarm/AlarmList"));
const Tour = lazy(() => import("./components/Tour"));
const Forecast = lazy(() => import("./components/Forecast"));
const AreaSet = lazy(() => import("./components/AreaSet"));
const Feedback = lazy(() => import("./components/Feedback"));
const FeedbackForm = lazy(() => import("./components/feedback/FeedbackForm"));
const FeedbackList = lazy(() => import("./components/feedback/FeedbackList"));
const Realtime = lazy(() => import("./components/Realtime"));
const Radar = lazy(() => import("./components/Radar"));
const RealScene = lazy(() => import("./components/RealScene"));
const About = lazy(() => import("./components/About"));
const Traffic = lazy(() => import("./components/Traffic"));
const School = lazy(() => import("./components/School"));
const DisasterForm = lazy(() => import("./components/DisasterForm"));
const Rain = lazy(() => import("./components/effect/Rain"));
const RealtimeTable = lazy(() => import("./components/realtime/RealtimeTable"));
const WorkForm = lazy(() => import("./components/party/WorkForm"));
const Party = lazy(() => import("./components/Party"));
const PartyArticleList = lazy(() => import("./components/party/PartyArticleList"));
const Media = lazy(() => import("./components/Media"));
const InsureForm = lazy(() => import("./components/InsureForm"));
const CustomAlarm = lazy(() => import("./components/custom/CustomAlarm"));
const MinuteRain = lazy(() => import("./components/MinuteRain"));
const Pay = lazy(() => import("./components/Pay"));
const CustomCity = lazy(() => import("./components/custom/CustomCity"));
const CustomType = lazy(() => import("./components/custom/CustomType"));

const isTest = true;
const projectPath = isTest ? "/build" : "/pages";
let baseUrl = isTest ? "http://shihuan.fengyun4.cn" : "http://" + window.location.host;

function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return null;
}

let subDomain = getUrlParam("sub_domain");
let openId = getUrlParam("open_id");

window.weather = {
    resource: baseUrl + projectPath,
    wxUrl: encodeURIComponent(window.location.href),
    host: baseUrl,
    color: "#3482ca",
    defaultImg: "/images/default.svg",
    // color: "#ff0000",
};
window.subDomain = subDomain;
window.openId = openId;

window.onBack = () => {
    let state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "#");
    window.addEventListener("popstate", (e) => {
        window.confirm("确认关闭当前页面吗");
        window.WeixinJSBridge.call("closeWindow");
    }, false);
};
// alert(window.weather.wxUrl);
fetch(window.weather.host + "/wechat_portal/weather_api/index?sub_domain=" + window.subDomain + "&url=" + window.weather.wxUrl)
    .then((res) => res.json()).then((result) => {
    let wechat = JSON.parse(result.data);
    window.wx.config({
        // debug: isTest,
        debug: false,
        appId: wechat.appId,
        timestamp: wechat.timestamp,
        nonceStr: wechat.nonceStr,
        signature: wechat.signature,
        jsApiList: wechat.jsApiList
    });
    window.wx.ready(() => {
        if (!isTest) {
            window.wx.hideOptionMenu();
        }
    });
    window.wx.error(() => {
        console.log("微信jssdk错误")
    })

}).catch((e) => {
    console.log(e);
});

const setTitle = (title, com) => {
    document.title = title;
    return com;
};

const index = (
    <Suspense fallback={<Loading/>}>
        <Router basename={projectPath}>
            {/* 天气预报 */}
            <Route exact path="/forecast" component={Forecast} /*render={() => setTitle("天气预报", <Forecast/>)}*//>
            {/* 天气预报区域选择 */}
            <Route exact path="/area/:type" component={AreaSet}/>
            {/* 卫星云图 */}
            <Route path="/cloud" render={() => setTitle("卫星云图", <Cloud/>)}/>
            {/* 雷达图 */}
            <Route path="/radar" render={() => setTitle("雷达监测", <Radar/>)}/>
            {/* 预警导航 */}
            <Route path="/alarm" component={Alarm}/>
            {/* 预警地图 */}
            <Route path="/alarm/map" render={() => setTitle("全国预警", <AlarmMap/>)}/>
            {/* 预警列表 */}
            <Route path="/alarm/list" render={() => setTitle("当前预警", <AlarmList/>)}/>
            {/* 预警详情 */}
            <Route exact path="/alarm/details" component={AlarmDetails}/>
            {/* 实况 */}
            <Route path="/realtime/map/:type" component={Realtime}/>
            {/* 实况表格 */}
            <Route path="/realtime/table" component={RealtimeTable}/>
            {/* 旅游天气 */}
            <Route path="/tour" component={Tour}/>
            {/* 农场天气 */}
            <Route path="/farm" component={Test}/>
            {/* 工业园区天气 */}
            <Route path="/industry" component={Test}/>
            {/* 交通枢纽天气 */}
            <Route path="/traffic" component={Traffic}/>
            {/* 高速天气 */}
            <Route path="/expy" component={Test}/>
            {/* 简介 */}
            <Route path="/about" component={About}/>
            {/* 天气情报 */}
            <Route path="/article/list" component={ArticleList}/>
            {/* 反馈 */}
            <Route path="/feedback" component={Feedback}/>
            {/* 意见反馈表单*/}
            <Route path="/feedback/form" component={FeedbackForm}/>
            {/* 意见反馈列表*/}
            <Route path="/feedback/list" component={FeedbackList}/>
            {/* 天气实景 */}
            <Route path="/scene" component={RealScene}/>
            {/* 家校通天气定制 */}
            <Route path="/school" component={School}/>
            {/* 灾情反馈 */}
            <Route path="/disaster" render={() => setTitle("灾情直报", <DisasterForm/>)}/>
            {/* 测试页面 */}
            <Route path="/test" component={Rain}/>
            {/* 党建 */}
            <Route path="/party" component={Party}/>
            {/* 党建文章列表 */}
            <Route path="/party/list" render={() => setTitle("党建管理", <PartyArticleList/>)}/>
            {/* 党建课业提交 */}
            <Route path="/party/work" render={() => setTitle("党建管理", <WorkForm/>)}/>
            {/* 新媒体 */}
            <Route path="/media" render={() => setTitle("新媒体", <Media/>)}/>
            {/* 气象凭证 */}
            <Route path="/insure" render={() => setTitle("气象凭证", <InsureForm/>)}/>
            {/* 预警定制 */}
            <Route path="/custom/alarm" render={() => setTitle("预警定制", <CustomAlarm/>)}/>
            {/* 短时临近 */}
            <Route path="/minute/rain" render={() => setTitle("短时临近", <MinuteRain/>)}/>
            {/* 微信支付测试 */}
            <Route path="/pay" render={() => setTitle("微信支付", <Pay/>)}/>
            {/* Loading 效果测试 */}
            <Route path="/loading" render={() => setTitle("Loading", <Loading/>)}/>
            {/* 预报定制 */}
            <Route path="/weacus" component={WeaCus}/>
            {/* 预警定制city */}
            <Route path="/custom/city" render={() => setTitle("预警城市", <CustomCity/>)}/>
            {/* 预警定制type */}
            <Route path="/custom/type" render={() => setTitle("预警类型", <CustomType/>)}/>
            {/* 实况统计 */}
            <Route path="/desc" component={Desc}/>
        </Router>
    </Suspense>
);

ReactDOM.render(index, document.getElementById("root"));

serviceWorker.unregister();
