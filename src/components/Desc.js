import React from "react";
import 'antd-mobile/dist/antd-mobile.css';
import Snav from "./desc/Snav";


class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="desc">
                    <Snav/>
            </div>

        );
    }
}

export default City;