/**
 * Created by lenovo on 2016/4/5.
 */
import React from 'react';

class SearchBar extends React.Component{
    render(){
        return (
            <div className="searchBar">
                <h1 className="h1-t">Manage Items</h1>
                <input type="text" className="iptbar" onChange={this._change.bind(this)} placeholder="请输入查找的item" ref="ipt"/>
            </div>
        );
    }
    _change(){
        let val=this.refs.ipt.value;
        this.props.filter(val);
    }
}

export default SearchBar;
