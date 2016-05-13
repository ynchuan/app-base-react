/**
 * Created by lenovo on 2016/4/5.
 */
import React from "react";

class Operate extends React.Component{
    render(){
        return (
            <div className="d-ft">
                <button className="btn btn-add" onClick={this.props.add}>add</button>
                <button className="btn btn-del" onClick={this.props.delA}>delete all</button>
            </div>
        );
    }
}

export default Operate;
