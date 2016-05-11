/**
 * Created by wangxunxun on 2016/4/18.
 */
import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router';
import { createHistory, createHashHistory, useBasename } from 'history';

window.blogData = [
    {
        title: "Immutable 详解及 React 中实践",
    },
    {
        title: "React 源码剖析系列 － 生命周期的管理艺术",
    },
    {
        title: "React 源码剖析系列 － 解密 setState",
    },
    {
        title: "React 源码剖析系列 － 不可思议的 react diff",
    },
    {
        title: "Architecting Android with RxJava  程序亦非猿的Android旅程",
    },
    {
        title: "学习 React Native for Android：React 基础  Android&iOS工程师之路",
    },
    {
        title: "MVVM_Android-CleanArchitecture  Rocko",
    },
    {
        title: "使用 Go 开发一个 Slack 运维机器人  Java程序员",
    }
];

const history = useBasename(createHashHistory)({
    queryKey: '_key',
    basename: '/blog-app',
});
var BlogApp = React.createClass({
    render: function () {
        var pathname = this.props.location.pathname;
        return (
            <div className="blog-app">
                <ul>
                    <li><Link activeClassName="active" to="/archives">Archives</Link></li>
                    <li><Link activeClassName="active" to="/about">About</Link></li>
                    <li><Link activeClassName="active" to="/signIn">Sign in</Link></li>
                    <li><Link activeClassName="active" to="/signOut">Sign out</Link></li>
                </ul>
                {React.cloneElement(this.props.children || <div/>, {key: pathname})}
            </div>
        )
    }
})

var About = React.createClass({
    render: function () {
        return (
            <div className="about">
                <h1>About author</h1>
            </div>
        )
    }
})

var Archives = React.createClass({
    componentWillMount:function(){
        console.log("Archives componentWillMount");

    },
    render: function () {
        return (
            <div>
                原创：<br/>
                {this.props.original}
                转载：<br/>
                {this.props.reproduce}
            </div>
        )
    },
    shouldComponentUpdate:function(){
        console.log("Archives shouldComponentUpdate");
        return true;
    }
});

var Original = React.createClass({
    render: function () {
        return (
            <div className="archives">
                <ul>
                    {window.blogData.slice(0, 4).map(function (item, index) {
                        return <li key={index}>
                            <Link
                                to={`/article/${index}`}
                                query={{type: 'Original'}}
                                state={{title: item.title}}
                                >
                                {item.title}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
});

var Reproduce = React.createClass({
    render: function () {
        return (
            <div className="archives">
                <ul>
                    {window.blogData.slice(4, 8).map(function (item, index) {
                        return <li key={index}>
                            <Link
                                to={`/article/${index}`}
                                query={{type: 'Reproduce'}}
                                state={{title: item.title}}
                                hash='#hash'
                                >
                                {item.title}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
        )
    },
    shouldComponentUpdate:function(){
        console.log("Reproduce shouldComponentUpdate");
        return true;
    }
});

var Article = React.createClass({
    render: function () {
        var id = this.props.params.id
        var location = this.props.location
        return (
            <div className="article">
                <h2>{location.state.title}</h2>
                <br/><br/>
                这是文档归档 {location.query.type} 类目下的第 {++id} 篇文章，欢迎你的访问！
            </div>
        )
    }
});

var SignIn = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var email = findDOMNode(this.refs.name).value
        var pass = findDOMNode(this.refs.pass).value
        if (pass !== 'password') {
            return;
        }
        localStorage.setItem('login', 'true')

        var location = this.props.location;

        if (location.state && location.state.nextPathname) {
            this.props.history.replaceState(null, location.state.nextPathname)
        } else {
            this.props.history.replaceState(null, '/about')
        }
    },

    render: function () {
        if (hasLogin()) {
            return <p>你已经登录系统！<Link to="/signOut">点此退出</Link></p>
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <label><input ref="name"/></label><br/>
                <label><input ref="pass"/></label> (password)<br />
                <button type="submit">登录</button>
            </form>
        )
    }
})
var SignOut = React.createClass({
    componentDidMount: function () {
        localStorage.setItem('login', 'false')
    },

    render: function () {
        return <p>已经退出！</p>
    }
})

function hasLogin() {
    return localStorage.getItem('login') === 'true';
}

function requireAuth(nextState, replaceState) {
    if (!hasLogin()) {
        replaceState({nextPathname: nextState.location.pathname}, '/signIn')
    }
}

render((
    <Router history={history}>
        <Route path="/" component={BlogApp}>
            <IndexRoute component={SignIn}/>
            <Route path="signIn" component={SignIn}/>
            <Route path="signOut" component={SignOut}/>
            <Redirect from="/archives" to="/archives/posts"/>
            <Route onEnter={requireAuth} path="/archives" component={Archives}>
                <Route path="posts" components={{
                  original: Original,
                  reproduce: Reproduce,
                }}/>
            </Route>
            <Route path="article/:id" component={Article}/>
            <Route path="about" component={About}/>
        </Route>
    </Router>
), document.getElementById('example'))


var Child= React.createClass({
    getInitialState: function() {
        console.log("Child geyInitialState");
        return {};
    },

    componentWillMount: function() {
        console.log("Child componentWillMount");
    },

    render: function() {
        console.log("Child render");
        return (
            <div onClick={this.props.aa}>hello <strong>{this.props.name}</strong></div>
        );
    },

    componentDidMount: function() {
        console.log("Child componentDidMount");
    },

    componentWillReceiveProps: function() {
        console.log("Child componentWillReceiveProps");
    },
    componentWillUpdate: function() {
        console.log("Child componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("Child componentDidUpdate");
    }

});

var Parent= React.createClass({
    getInitialState: function() {
        console.log("Parent geyInitialState");
        return {};
    },

    componentWillMount: function() {
        console.log("Parent componentWillMount");
    },

    render: function() {
        console.log("Parent render");
        return (
            <Child name='bbb' aa={this.jk}></Child>
        );
    },

    componentDidMount: function() {
        console.log("Parent componentDidMount");
    },
    jk:function(){
        this.setState({});
    },
    componentWillReceiveProps: function() {
        console.log("Parent componentWillReceiveProps");
    },
    componentWillUpdate: function() {
        console.log("Parent componentWillUpdate");
    },
    componentDidUpdate: function() {
        console.log("Parent componentDidUpdate");
    }

});
render(
    <Parent/>,
    document.getElementById("example1")
);
