/**
 * Created by lenovo on 2016/5/11.
 */
var React=require("react");
var ReactDOM=require("react-dom");
var test=document.getElementById("test");
var Lfcy=React.createClass({
    getInitialState:function(){
        return {
            name:"wxx"
        }
    },
    render:function(){
        console.log("this.state.name:"+this.state.name);
        console.log("this.props.test:"+this.props.test);
        return (
            <div>
                <div onClick={this.chgProp}>chgProp</div>
                <div onClick={this.chgState}>chgState</div>
                <Child/>
            </div>
            );
    },
    chgProp:function(){
        dom.setProps({"test":"test3"});
    },
    chgState:function(){
        this.setState({name:'test'});
    },
    componentWillReceiveProps:function(){
        console.log("componentWillReceiveProps");
    },
    shouldComponentUpdate:function(){
        console.log("shouldComponentUpdate");
        return true;
    },
    componentWillUpdate:function(){
        console.log("componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("componentDidUpdate");
    },
    componentWillMount: function() {
        console.log("componentWillMount");
    },
    componentDidMount: function() {
        console.log("componentDidMount");
    }

});
var Child=React.createClass({
    getInitialState:function(){
        console.log("Child getInitialState");

    },
    render:function(){
        console.log("this.state.name:"+this.state.name);
        console.log("this.props.test:"+this.props.test);
        return (
            <div>
               123
            </div>
        );
    },
    componentWillReceiveProps:function(){
        console.log("Child componentWillReceiveProps");
    },
    shouldComponentUpdate:function(){
        console.log("Child shouldComponentUpdate");
        return true;
    },
    componentWillUpdate:function(){
        console.log("Child componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("Child componentDidUpdate");
    },
    componentWillMount: function() {
        console.log("Child componentWillMount");
    },
    componentDidMount: function() {
        console.log("Child componentDidMount");
    }

});
var dom=ReactDOM.render(<Lfcy/>,test);

