/**
 * Created by lenovo on 2016/5/11.
 */
var React=require("react");
var ReactDOM=require("react-dom");
var test=document.getElementById("test");
var count=0;
var Lfcy=React.createClass({
    getInitialState:function(){
        console.log(" getInitialState");
        return {
            name:"wxx chear"
        }
    },
    //和访问context 的属性是需要通过 contextTypes 指定可访问的 元素一样。getChildContext 指定的传递给子组件的属性需要先通过 childContextTypes 来指定，不然会产生错误。
    childContextTypes: {
        // 设置上下文校验，才能在组件中使用
        name: React.PropTypes.string.isRequired,
        fruit: React.PropTypes.string.isRequired
    },

    getChildContext: function() {
        //设置上下文
        return {
            name: "Jonas",
            fruit: "Banana"
        };
    },
    render:function(){
        console.log("this.state.name:"+this.state.name);
        console.log("this.props.test:"+this.props.test);
        var cpt=<Odd/>;
        if(this.state.name=="even"){
            cpt=React.createElement(Even,null,null);//进行组件unmount测试，当组件进行替换的时候会进行componentWillUnmount调用。
        }
        //出现并列组件时候，要执行完每个组件的render后再依次执行各自的didComponentMount
        //当使用children时，对于普通标签可以直接渲染，但是对于组件标签，需要组件手动在组件内部调用children，确定渲染位置
        //但是对于同级的组件组合，不需要引用
        //对于子组件的遍历加载是采用二叉树两次遍历(will+render一组，前向遍历；did一组，从第一分支根子节点后向遍历）
        return (
            <div>
                <div className="parent" onClick={this.chgProp}>chgProp</div>
                <div className="parent" onClick={this.chgState}>chgState</div>
                <div className="parent" >1、My name is: {this.context.name}{this.props.children}</div>
                <Child  test={this.state.name} change={this.chgState}><PropChild change={this.chgState}/></Child>
                {cpt}
                {cpt}
            </div>
            );

        //对于子组件，可以添加属性并通过children向组件内部传，参数可以被获取<PropChild change={this.chgState}/>
    },
    chgProp:function(){
        dom.setProps({"test":"test3"});//setProps已经被抛弃
    },
    chgState:function(){
        count++;
        if(count%2==1){
            this.setState({name:'odd'});
        }else{
            this.setState({name:'even'});
        }
    },
    componentWillReceiveProps:function(){
        console.log("componentWillReceiveProps");
    },
    shouldComponentUpdate:function(){
        console.log("shouldComponentUpdate");
        return true;
    },
    componentWillMount: function() {
        console.log("componentWillMount");
    },
    componentDidMount: function() {
        console.log("componentDidMount");
    },
    componentWillUpdate:function(){
        console.log("componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("componentDidUpdate");
    }

});
var Child=React.createClass({
    contextTypes: {
        name: React.PropTypes.string.isRequired,
        fruit: React.PropTypes.string.isRequired
    },
    getInitialState:function(){
        console.log("Child getInitialState");
        return {};
    },
    render:function(){
        console.log("this.state.name:"+this.state.name);
        console.log("this.props.test:"+this.props.test);
        return (
            <div className="child" >
               1-2、123
                <div className="child" onClick={this.props.change}>My name is: {this.context.name}</div>
                <div className="child" >My favor fruit is: {this.context.fruit}</div>
                {this.props.children}
            </div>
        );
    },
    componentWillReceiveProps:function(){
        console.log("Child componentWillReceiveProps");//父组件state变化时，会导致子组件的receiveProps函数执行。
    },
    shouldComponentUpdate:function(){
        console.log("Child shouldComponentUpdate");
        return true;
    },
    componentWillMount: function() {
        console.log("Child componentWillMount");
    },
    componentDidMount: function() {
        console.log("Child componentDidMount");
    },
    componentWillUpdate:function(){
        console.log("Child componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("Child componentDidUpdate");
    }

});
var PropChild=React.createClass({
    contextTypes: {
        name: React.PropTypes.string.isRequired,
        fruit: React.PropTypes.string.isRequired
    },
    getInitialState:function(){
        console.log("PropChild getInitialState");
        return {};
    },
    render:function(){
        console.log("this.state.name:"+this.state.name);
        console.log("this.props.test:"+this.props.test);
        return (
            <div className="propChild" onClick={this.props.change}>
               1-1、 123
                <div className="propChild" >My name is: {this.context.name}</div>
                <div className="propChild" >My favor fruit is: {this.context.fruit}</div>
            </div>
        );
    },
    componentWillReceiveProps:function(){
        console.log("PropChild componentWillReceiveProps");//父组件state变化时，会导致子组件的receiveProps函数执行。
    },
    shouldComponentUpdate:function(){
        console.log("PropChild shouldComponentUpdate");
        return true;
    },
    componentWillMount: function() {
        console.log("PropChild componentWillMount");
    },
    componentDidMount: function() {
        console.log("PropChild componentDidMount");
    },
    componentWillUpdate:function(){
        console.log("PropChild componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("PropChild componentDidUpdate");
    }

});

var Even=React.createClass({
    getInitialState:function(){
        console.log("even getInitialState");
        return {};
    },
    render:function(){
        console.log("this is Even render!");
        return (
            <p className="p">
                even
            </p>
        );
    },
    componentWillReceiveProps:function(){
        console.log("even componentWillReceiveProps");//父组件state变化时，会导致子组件的receiveProps函数执行。
    },
    shouldComponentUpdate:function(){
        console.log("even shouldComponentUpdate");
        return true;
    },
    componentWillMount: function() {
        console.log("even componentWillMount");
    },
    componentDidMount: function() {
        console.log("even componentDidMount");
    },
    componentWillUpdate:function(){
        console.log("even componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("even componentDidUpdate");
    },
    componentWillUnmount:function(){
        console.log("even componentWillUnmount");
    }

});
var Odd=React.createClass({
    getInitialState:function(){
        console.log("odd getInitialState");
        return {};
    },
    render:function(){
        console.log("this is odd render!");
        return (
            <p className="p">
                odd
            </p>
        );
    },
    componentWillReceiveProps:function(){
        console.log("odd componentWillReceiveProps");//父组件state变化时，会导致子组件的receiveProps函数执行。
    },
    shouldComponentUpdate:function(){
        console.log("odd shouldComponentUpdate");
        return true;
    },
    componentWillMount: function() {
        console.log("odd componentWillMount");
    },
    componentDidMount: function() {
        console.log("odd componentDidMount");
    },
    componentWillUpdate:function(){
        console.log("odd componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("odd componentDidUpdate");
    },
    componentWillUnmount:function(){
        console.log("odd componentWillUnmount");
    }

});
var dom=ReactDOM.render(<Lfcy><PropChild/></Lfcy>,test);

