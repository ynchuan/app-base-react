/**
 * Created by lenovo on 2016/3/29.
 */

import React,{Component} from "react"
import * as actions from "../action/inputAction"//注意：绑定的action为object reduce为function
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'

class Input extends Component {
    render() {
        return (
            <div>
                <input type="text" onChange={this.handlerChange.bind(this)} value={this.props.dftValue}
                       ref="iptChg"/>{this.props.dftValue}
            </div>
        )
    }

    handlerChange() {
        let val = this.refs.iptChg.value.trim();
        this.props.change(val);
    }
}
function mapStateToProps(state) {
    return {
        dftValue: state.value
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}
/**
 * 通过props链接action和state
 */
export default connect(function (state) {
    return {
        dftValue: state.value
    }
}, actions)(Input);



