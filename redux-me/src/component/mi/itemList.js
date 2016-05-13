/**
 * Created by lenovo on 2016/4/5.
 */
import React from "react";

class ItemList extends React.Component {
    render() {
        return (
            <ul className="ul-content">
                {this.props.items.map((v)=> {
                    return (
                        <Item key={v} filter={this.props.filter}></Item>
                    )
                })}
            </ul>
        )
    }

}

class Item extends React.Component {
    render() {
        let filter= this.props.filter?"hide":"",
            cls="li-item"+filter;
        return (
            <li className={cls}>
                <span className="sp-i">{this.props.key}</span>
                <button className="btn-i" onClick={this.props.delI}>delete</button>
            </li>
        )
    }
}


export default ItemList;
