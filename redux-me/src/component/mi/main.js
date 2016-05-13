/**
 * Created by lenovo on 2016/4/5.
 */
import React from 'react';
import ItemList from "./itemList";
import Operate from "./operate";
import SearchBar from './searchBar';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as acts from "../../action/miAction";

class Main extends React.Component{
    render(){
        const actions=this.props.actions;
        return (
            <div className="d-main">
                <SearchBar filter={actions.filter} />
                <ItemList items={this.props.items} filter={this.props.filter} delI={actions.delI}/>
                <Operate add={actions.add} delA={actions.delA}/>
            </div>
        )
    }
}
/**
 * 链接
 */
export default connect((state)=>{
    return {
        items:state.items,
        filter:state.filter
    }
},function(dispatch){
    return {
        actions:bindActionCreators(acts,dispatch)
    }
})(Main);
