/**
 * Created by admin on 2019/8/28.
 */
import React from "react";
import Select from "../common/Select";
import {DatePicker, Icon, List} from 'antd-mobile';
const Item = List.Item;
const { Option } = Select;
class Desc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            list: [],
            supAreaId: [],
            // stationNo: "",
            element :[],
            datatime :[],
            stationName:"",
            aaaa:"",
            isCheckAll: false,
            element_nav : '当前温度℃',
            _date:"",

        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleElementChange = this.handleElementChange.bind(this);
        this.handleDataTimeChange = this.handleDataTimeChange.bind(this);
    }

    componentDidMount() {
        // fetch("http://www.dev.com/city/cus?sub_domain=" + window.subDomain).then((res) => res.json())
        fetch("http://www.test.com//details/get").then((res) => res.json())
            .then((result) => {
                // console.log(result.data)
                this.setState({
                    supAreaId: result.data
                });
            }).catch((e) => {
            console.log(e);
        })
    }


    render() {
        const {supAreaId,stationName,element_nav,_date} = this.state;
        //要素选择
        const element = [
            {
                name:'平均气温',
                value:'avgTemp'
            },
            {
                name:'累计雨量',
                value:'totalRainfall'
            },
            {
                name:'最高气温',
                value:'maxTemp'
            },
            {
                name:'最低气温',
                value:'minTemp'
            },
            {
                name:'极大风速',
                value:'instMaxWd'
            },
        ]
        //数据时间
        const dataTime = [
            {
                name:'当前整点',
                value: '1'
            },
            {
                name:'近3小时',
                value: '3'
            },
            {
                name:'近6小时',
                value: '6'
            },
            {
                name:'近12小时',
                value: '12'
            },
            {
                name:'近24小时',
                value: '24'
            },
            {
                name:'近48小时',
                value: '48'
            },
        ]
        // console.log(stationName)
        return (
            <div>
                <div className="select-sel">
                    <div className="select1">
                        <Select data={supAreaId} onChange={this.handleSelectChange}/>
                    </div>
                    <div className="select2">
                        <Select data={element} onChange={this.handleElementChange}/>
                    </div>
                    <div className="select3">
                        <Select data={dataTime} onChange={this.handleDataTimeChange}/>
                    </div>
                </div>
                <div  className="nav-s">
                    <div className="nav-index nav-color">
                        <div className="nav1">
                            站点
                        </div>
                        <div className="nav">
                            {element_nav}
                        </div>
                        <div className="nav3 nav4">
                            {_date}
                        </div>
                    </div>

                    {this.state.list.map((item, index) => (
                        <div className="nav-index"  key={index}>
                            <div className="area-content-item nav-station">
                                {item.station_name}
                            </div>
                            <div className="nav2">
                                {item.pageData}
                            </div>
                            <div className="nav3">
                                {item._date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        );
    }

    submitForm() {
        const {regionNo, utcDate} = this.state;
        if (!utcDate) {
            window.alert("请选择推送时间");
            return false;
        }
        const date_value = utcDate.getHours() + ':' + utcDate.getMinutes();
        let data = new FormData();
        console.log(window.openId);
        data.append("openId", window.openId);
        data.append("regionNo", regionNo);
        data.append("pushTime", date_value);
        // fetch(window.weather.host + "/city/rule/add?sub_domain=" + window.subDomain, {
        let url = "http://www.dev.com/city/rule/add?sub_domain=" + window.subDomain;
        fetch(url, {
            method: "POST",
            body: data
        }).then((res) => res.json()).then((result) => {
            if (result.code === 0) {
                window.alert(result.msg);
                window.location.reload();
            } else if (result.code === 1) {
                window.alert(result.msg);
                window.location.reload();
            } else {
                window.alert(result.msg);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    //站点选择
    handleSelectChange(value) {
        // console.log('s',value)
            this.setState({
                stationName: value,
            }, ()=> {
                this.init()
                // console.log(value); // true
            });

    }
    //要素选择
    handleElementChange(value) {
        // console.log('e',value)
            this.setState({
                element: value,
            },()=>{
                console.log('1',value)
                const {element_nav} = this.state;
                if(value == 'avgTemp'){
                  this.setState({
                      element_nav:"当前温度℃",
                      _date :" "
                  })
                }else if(value == 'totalRainfall'){
                    this.setState({
                        element_nav:"降雨量mm",
                        _date :" "
                    })
                }else if(value == 'maxTemp'){
                    this.setState({
                        element_nav:"最大温度℃",
                        _date :"最大温度出现时间"
                    })
                }else if(value == 'minTemp'){
                    this.setState({
                        element_nav:"最低温度℃",
                        _date:"最低温度出现时间"
                    })
                }else if(value == 'instMaxWd'){
                    this.setState({
                        element_nav:"风速m/s",
                        _date:"极大风速出现时间"
                    })
                }
                this.init()
            });

    }
    //时间段选择
    handleDataTimeChange(value) {
        // console.log('d',value)
            this.setState({
                datatime: value
            },()=>{
                this.init()
            });
    }
    //查询
    init(){
        const {stationName,element,datatime} = this.state;
        const url = "http://www.test.com/query/stat?stat=" +stationName  +"&element=" +element  + "&datatime=" + datatime;
        console.log(url)
        fetch(url).then((res) => res.json()).then((result) => {
            // console.log('ssss',result.data);
        this.setState({
            list: result.data,
        });

        }).catch((e) => {
            console.log(e);
        });
    }

}

export default Desc;