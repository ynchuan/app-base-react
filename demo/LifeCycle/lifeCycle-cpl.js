"use strict";

/**
 * Created by lenovo on 2016/5/11.
 */
var React = require("react");
var ReactDOM = require("react-dom");
var test = document.getElementById("test");
var count = 0;
var Lfcy = React.createClass({
    displayName: "Lfcy",

    getInitialState: function getInitialState() {
        console.log(" getInitialState");
        return {
            name: "wxx chear"
        };
    },
    childContextTypes: {
        // 设置上下文校验，才能在组件中使用
        name: React.PropTypes.string.isRequired,
        fruit: React.PropTypes.string.isRequired
    },

    getChildContext: function getChildContext() {
        //设置上下文
        return {
            name: "Jonas",
            fruit: "Banana"
        };
    },
    render: function render() {
        console.log("this.state.name:" + this.state.name);
        console.log("this.props.test:" + this.props.test);
        var cpt = React.createElement(Odd, null);
        if (this.state.name == "even") {
            cpt = React.createElement(Even, null, null); //进行组件unmount测试，当组件进行替换的时候会进行componentWillUnmount调用。
        }
        //出现并列组件时候，要执行完每个组件的render后再依次执行各自的didComponentMount
        //当使用children时，对于普通标签可以直接渲染，但是对于组件标签，需要组件手动在组件内部调用children，确定渲染位置
        //但是对于同级的组件组合，不需要引用
        //对于子组件的遍历加载是采用二叉树前向遍历的方式
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "parent", onClick: this.chgProp },
                "chgProp"
            ),
            React.createElement(
                "div",
                { className: "parent", onClick: this.chgState },
                "chgState"
            ),
            React.createElement(
                "div",
                { className: "parent" },
                "1、My name is: ",
                this.context.name,
                this.props.children
            ),
            React.createElement(
                Child,
                { test: this.state.name, change: this.chgState },
                React.createElement(PropChild, { change: this.chgState })
            ),
            cpt,
            cpt
        );

        //对于子组件，可以添加属性并通过children向组件内部传，参数可以被获取<PropChild change={this.chgState}/>
    },
    chgProp: function chgProp() {
        dom.setProps({ "test": "test3" }); //setProps已经被抛弃
    },
    chgState: function chgState() {
        count++;
        if (count % 2 == 1) {
            this.setState({ name: 'odd' });
        } else {
            this.setState({ name: 'even' });
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    },
    shouldComponentUpdate: function shouldComponentUpdate() {
        console.log("shouldComponentUpdate");
        return true;
    },
    componentWillMount: function componentWillMount() {
        console.log("componentWillMount");
    },
    componentDidMount: function componentDidMount() {
        console.log("componentDidMount");
    },
    componentWillUpdate: function componentWillUpdate() {
        console.log("componentWillUpdate");
    },
    componentDidUpdate: function componentDidUpdate() {
        console.log("componentDidUpdate");
    }

});
var Child = React.createClass({
    displayName: "Child",

    contextTypes: {
        name: React.PropTypes.string.isRequired,
        fruit: React.PropTypes.string.isRequired
    },
    getInitialState: function getInitialState() {
        console.log("Child getInitialState");
        return {};
    },
    render: function render() {
        console.log("this.state.name:" + this.state.name);
        console.log("this.props.test:" + this.props.test);
        return React.createElement(
            "div",
            { className: "child" },
            "1-2、123",
            React.createElement(
                "div",
                { className: "child", onClick: this.props.change },
                "My name is: ",
                this.context.name
            ),
            React.createElement(
                "div",
                { className: "child" },
                "My favor fruit is: ",
                this.context.fruit
            ),
            this.props.children
        );
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
        console.log("Child componentWillReceiveProps"); //父组件state变化时，会导致子组件的receiveProps函数执行。
    },
    shouldComponentUpdate: function shouldComponentUpdate() {
        console.log("Child shouldComponentUpdate");
        return true;
    },
    componentWillMount: function componentWillMount() {
        console.log("Child componentWillMount");
    },
    componentDidMount: function componentDidMount() {
        console.log("Child componentDidMount");
    },
    componentWillUpdate: function componentWillUpdate() {
        console.log("Child componentWillUpdate");
    },
    componentDidUpdate: function componentDidUpdate() {
        console.log("Child componentDidUpdate");
    }

});
var PropChild = React.createClass({
    displayName: "PropChild",

    contextTypes: {
        name: React.PropTypes.string.isRequired,
        fruit: React.PropTypes.string.isRequired
    },
    getInitialState: function getInitialState() {
        console.log("PropChild getInitialState");
        return {};
    },
    render: function render() {
        console.log("this.state.name:" + this.state.name);
        console.log("this.props.test:" + this.props.test);
        return React.createElement(
            "div",
            { className: "propChild", onClick: this.props.change },
            "1-1、 123",
            React.createElement(
                "div",
                { className: "propChild" },
                "My name is: ",
                this.context.name
            ),
            React.createElement(
                "div",
                { className: "propChild" },
                "My favor fruit is: ",
                this.context.fruit
            )
        );
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
        console.log("PropChild componentWillReceiveProps"); //父组件state变化时，会导致子组件的receiveProps函数执行。
    },
    shouldComponentUpdate: function shouldComponentUpdate() {
        console.log("PropChild shouldComponentUpdate");
        return true;
    },
    componentWillMount: function componentWillMount() {
        console.log("PropChild componentWillMount");
    },
    componentDidMount: function componentDidMount() {
        console.log("PropChild componentDidMount");
    },
    componentWillUpdate: function componentWillUpdate() {
        console.log("PropChild componentWillUpdate");
    },
    componentDidUpdate: function componentDidUpdate() {
        console.log("PropChild componentDidUpdate");
    }

});

var Even = React.createClass({
    displayName: "Even",

    getInitialState: function getInitialState() {
        console.log("even getInitialState");
        return {};
    },
    render: function render() {
        console.log("this is Even render!");
        return React.createElement(
            "p",
            { className: "p" },
            "even"
        );
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
        console.log("even componentWillReceiveProps"); //父组件state变化时，会导致子组件的receiveProps函数执行。
    },
    shouldComponentUpdate: function shouldComponentUpdate() {
        console.log("even shouldComponentUpdate");
        return true;
    },
    componentWillMount: function componentWillMount() {
        console.log("even componentWillMount");
    },
    componentDidMount: function componentDidMount() {
        console.log("even componentDidMount");
    },
    componentWillUpdate: function componentWillUpdate() {
        console.log("even componentWillUpdate");
    },
    componentDidUpdate: function componentDidUpdate() {
        console.log("even componentDidUpdate");
    },
    componentWillUnmount: function componentWillUnmount() {
        console.log("even componentWillUnmount");
    }

});
var Odd = React.createClass({
    displayName: "Odd",

    getInitialState: function getInitialState() {
        console.log("odd getInitialState");
        return {};
    },
    render: function render() {
        console.log("this is odd render!");
        return React.createElement(
            "p",
            { className: "p" },
            "odd"
        );
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
        console.log("odd componentWillReceiveProps"); //父组件state变化时，会导致子组件的receiveProps函数执行。
    },
    shouldComponentUpdate: function shouldComponentUpdate() {
        console.log("odd shouldComponentUpdate");
        return true;
    },
    componentWillMount: function componentWillMount() {
        console.log("odd componentWillMount");
    },
    componentDidMount: function componentDidMount() {
        console.log("odd componentDidMount");
    },
    componentWillUpdate: function componentWillUpdate() {
        console.log("odd componentWillUpdate");
    },
    componentDidUpdate: function componentDidUpdate() {
        console.log("odd componentDidUpdate");
    },
    componentWillUnmount: function componentWillUnmount() {
        console.log("odd componentWillUnmount");
    }

});
var dom = ReactDOM.render(React.createElement(
    Lfcy,
    null,
    React.createElement(PropChild, null)
), test);
